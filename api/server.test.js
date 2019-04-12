const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

const videogame1 = {
  title: "Megaman",
  genre: "platformer"
};
const videogame2 = {
  title: "Super Mario Sunshine",
  genre: "platformer"
};
const videogame3 = {
  title: "The Legend of Zelda: Breath of the Wild",
  genre: "RPG"
};

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
  describe("POST /api/games", () => {
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

    it("should return status code 422 if title missing", async () => {
      const vgMissingTitle = {
        genre: "Arcade",
        releaseYear: 1980
      };
      const response = await request(server)
        .post("/api/games")
        .send(vgMissingTitle);
      expect(response.status).toBe(422);
    });

    it("should return status code 422 if genre missing", async () => {
      const vgMissingGenre = {
        title: "Pacman",
        releaseYear: 1980
      };
      const response = await request(server)
        .post("/api/games")
        .send(vgMissingGenre);
      expect(response.status).toBe(422);
    });
  });

  describe("GET /api/games", () => {
    it("should return array of games", async () => {
      let response = await request(server).get("/api/games");

      expect(response.body).toHaveLength(0);

      await request(server)
        .post("/api/games")
        .send(videogame1);

      response = await request(server).get("/api/games");

      expect(response.body).toHaveLength(1);
    });

    it("should return status code 200", async () => {
      await request(server)
        .post("/api/games")
        .send(videogame1);

      const response = await request(server).get("/api/games");

      expect(response.status).toBe(200);
    });

    it("should always return an array even if no videogames stored", async () => {
      const response = await request(server).get("/api/games");

      expect(response.body).toEqual([]);
    });
  });
});
