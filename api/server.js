const express = require("express");

const vgModel = require("../helpers/videogamesModel");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res.status(200).json({
    message: "Now, witness the power of this fully operational battle station."
  });
});

server.post("/api/games", async (req, res) => {
  const videogame = req.body;
  const { title, genre } = videogame;
  // if (!title || !genre) {
  //   return res
  //     .status(422)
  //     .json({ message: "Both a name and a genre are required" });
  // }
  try {
    const newVideogame = await vgModel.insert(videogame);
    res.status(201).json(videogame);
  } catch (error) {
    res.status(500).json({
      error: `Adding new video game failed because ${error}`
    });
  }
});

module.exports = server;
