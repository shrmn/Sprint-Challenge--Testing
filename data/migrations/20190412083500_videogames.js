exports.up = function(knex, Promise) {
  return knex.schema.createTable("videgames", tbl => {
    tbl.increments();
    tbl
      .string("title", 255)
      .notNullable()
      .unique();
    tbl.string("genre", 255).notNullable();
    tbl.integer("releaseYear").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("videogames");
};
