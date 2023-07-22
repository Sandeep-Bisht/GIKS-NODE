const mysql = require("mysql")
const dotenv = require('dotenv')
dotenv.config();

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'giks_react_website'
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
  });

  module.exports = db;
