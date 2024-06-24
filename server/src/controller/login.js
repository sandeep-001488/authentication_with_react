const bcrypt = require("bcrypt");
const User = require('../models/user');
const { generateToken } = require("../utils/jwtUtil");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    const token = generateToken(existingUser);
    return res.status(201).json({ message: "Login successfully", token, User: existingUser });
    
  } catch (error) {
    
    return res.status(401).json({ message: "Invalid credentials" });
  }
}

async function refreshToken(req, res) {
  try {
    const { oldToken } = req.body;
    const decodedToken = verifyToken(oldToken);
    const existingUser = await User.findById(decodedToken.id);
    
    if (!existingUser) {
      throw new Error("User not found");
    }
    
    const newToken = generateFreshToken(existingUser);
    return res.status(201).json({ message: "Refresh token generated successfully", token: newToken, User: existingUser });
    
  } catch (error) {
    console.error("Error in refreshToken:", error);
    return res.status(401).json({ message: "Invalid token, cannot generate new token" });
  }
}

module.exports = { login, refreshToken };
