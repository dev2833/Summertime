const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "Summertime",
    connectTimeout: 60000,
    multipleStatements: true
  },
  listPerPage: 10
};
module.exports = config;
