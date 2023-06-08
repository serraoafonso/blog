require('dotenv').config()
const mysql = require('mysql2/promise');//importante nao esquecero promise

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

module.exports = connection