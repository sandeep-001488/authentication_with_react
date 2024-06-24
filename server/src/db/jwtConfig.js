require('dotenv').config();
const crypto = require("crypto");

const secretKey = process.env.SECRET_KEY || crypto.randomBytes(32).toString("hex");
console.log(`Secret key from jwtconfig: ${secretKey}`);

module.exports = { secretKey };
