const User = require("../models/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler")

module.exports.addToLibrary = asyncHandler(async (req,res) => {
  const { gameId } = req.body;
  
  if(!gameId){
    throw new AppError("Please provide game id",400);
  }

  const user = req.user;
  const gameExists = user.library.find((game) => game.gameId === Number(gameId));

  if(gameExists){
    throw new AppError("Game already exists in library",400)
  }
  
  user.library.push({
    gameId
  });
  
  await user.save();
  res.status(201).json({ message: "Game added to library successfully" })
})