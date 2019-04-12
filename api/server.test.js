const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

describe("server.js", () => {
  afterEach(async () => {
    await db("videogames").truncate();
  });

  describe("sanity check", () => {
    it("should return status 200", async () => {
      const response = await request(server).get("/");
      expect(response.status).toBe(200);
    });
    it("should return a message", async () => {
      const response = await request(server).get("/");
      expect(response.body).toEqual({
        message:
          "Now, witness the power of this fully operational battle station."
      });
    });
  });
  describe("POST /games", () => {
    it("should respond with status code 201 on success", async () => {
      const videogame = {
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      };
      const response = await request(server)
        .post("/api/games")
        .send(videogame);
      expect(response.body).toEqual({
        title: "Pacman",
        genre: "Arcade",
        releaseYear: 1980
      });
    });
  });
});
