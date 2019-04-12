const db = require("../data/dbConfig");

module.exports = {
  insert,
  get,
  getById
};

async function insert(videogame) {
  const [id] = await db("videogames").insert(videogame);

  return db("videogames")
    .where({ id })
    .first();
}

async function get() {
  return await db("videogames");
}

function getById(id) {}
