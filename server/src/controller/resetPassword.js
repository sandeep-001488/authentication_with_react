const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwtUtil");

async function resetUserPassword(req, res) {
  try {
    const { email, password } = req.body; // Extract password from the request body
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const newHashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = newHashedPassword; 
    await existingUser.save(); 

    const token = generateToken(existingUser);
    return res.status(201).json({ message: "Password reset successfully", token });
  } catch (error) {
    console.error(`error from reset-password ${error}`); 
    res.status(500).json({ message: "Unable to reset password" });
  }
}

module.exports = { resetUserPassword };
