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

      const videogames = await db("videogames");
      expect(videogames).toHaveLength(1);
    });
  });

  describe("get", async () => {
    it("should return all rows on success", async () => {
      const response = await vgModel.get();
      expect(response).toEqual([]);
    });
  });
});
