const db = require("../data/dbConfig");

module.exports = {
  insert
};

async function insert(videogame) {
  const [id] = await db("videogames").insert(videogame);

  return db("videogame")
    .where({ id })
    .first();
}
