import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const getGames = async (search = "",genre = "",platform = "",category = "",page = 1) => {
  const params = {
    key: API_KEY,
    page_size: 20,
    search_precise: true,
    page,
  };

  if (search) params.search = search;

  if (genre) params.genres = genre;

  if (platform) params.parent_platforms = platform;

  switch (category) {
    case "popular": {
      const year = new Date().getFullYear() - 3;
      params.ordering = "-added";
      params.dates = `${year}-01-01,2030-01-01`;
      break;
    }

    case "top": {
      params.ordering = "-rating";
      params.dates = "2022-01-01,2030-01-01";
      params.page_size = 50;
      break;
    }

    case "upcoming": {
      const today = new Date().toISOString().split("T")[0];

      const future = new Date();
      future.setFullYear(future.getFullYear() + 2);

      params.dates = `${today},${future
        .toISOString()
        .split("T")[0]}`;

      params.ordering = "-added";
      break;
    }

    default: break;
  }

  const response = await axios.get(
    "https://api.rawg.io/api/games",
    { params }
  );

  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get(
    "https://api.rawg.io/api/genres",
    {
      params: {
        key: API_KEY,
      },
    }
  );

  return response.data.results;
};

export const getGameDetails = async (id) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games/${id}`,
    {
      params: {
        key: API_KEY,
      },
    }
  )

  return response.data;
}

export const getScreenshots = async (id) => {
  const response = await axios.get(
    `https://api.rawg.io/api/games/${id}/screenshots`,
    {
      params: {
        key: API_KEY
      },
    }
  )
  return response.data.results;
}

export const getStores = async (id) => {
  const response = await axios.get( 
    `https://api.rawg.io/api/games/${id}/stores`,
    {
      params: {
        key: API_KEY,
      },
    }
  )

  return response.data.results;
}

// Searches YouTube Data API v3 for an official game trailer.
// Returns a YouTube video ID string, or null if unavailable / no key set.
export const searchYouTubeTrailer = async (gameName) => {
  const ytKey = import.meta.env.VITE_YOUTUBE_API_KEY;
  if (!ytKey) return null;

  // return "nq1M_Wc4FIc";
  try {
    const q = encodeURIComponent(`${gameName} official game trailer`);
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&maxResults=1&key=${ytKey}`
    );
    const items = response.data.items;
    return items?.length > 0 ? items[0].id.videoId : null;
  } catch {
    return null;
  }
};


