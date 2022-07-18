import knex from 'knex';

const db = (knex)({
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST,
    user: 'root',
    password: '1234',
    database: 'rick_and_morty',
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_NAME,
  },
  pool: { min: 0, max: 10 }, // Hilos en paralelo que pueden correr
});

export default db;
