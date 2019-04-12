const db = require("../data/dbConfig");
const vgModel = require("./videogamesModel");

describe("video games model", () => {
  afterEach(async () => {
    await db("videogames").truncate();
  });

  describe("insert", () => {
    it("should insert the provided video game", async () => {
      await vgModel.insert({
        title: "Pacman", // required
        genre: "Arcade", // required
        releaseYear: 1980 // not required
      });
    });
  });
});
