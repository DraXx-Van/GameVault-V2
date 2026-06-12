import Logo from "../shared/Logo";
import SearchBar from "../shared/SearchBar";
import SidebarButton from "../shared/SidebarButtons";
import UserProfile from "../shared/UserProfile";
import "remixicon/fonts/remixicon.css";

const Sidebar = () => {
  return (
    <div className="bg-[#0c0c0e] w-60 p-4 rounded-3xl flex flex-col overflow-hidden">

      <Logo />

      <div className="mt-8 px-2">
        <SearchBar />
      </div>

      <div className="flex flex-1 flex-col gap-1 px-2 mt-6">
        <nav>

          <SidebarButton
            navitem="Home"
            logo="ri-home-3-fill"
            to="/"
          />

          <SidebarButton
            navitem="Discover"
            logo="ri-store-3-line"
            to="/discover"
          />

          <SidebarButton
            navitem="Library"
            logo="ri-book-shelf-line"
            to="/library"
          />

          <SidebarButton
            navitem="Wishlist"
            logo="ri-heart-line"
            to="/wishlist"
          />

        </nav>
      </div>

      <div className="pt-5">
        <UserProfile />
      </div>

    </div>
  );
};

export default Sidebar;