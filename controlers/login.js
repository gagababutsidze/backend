import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const found = await User.findOne({ username: username });
    if (!found) {
      return res.status(401).json({ error: "invalid username or " });
    }

    const passwordCorrect = await bcrypt.compare(password, found.passwordHash);

    if (!passwordCorrect) {
      return res.status(401).json({ error: "invalid username or password" });
    }

    // Define what to return. For example, an object with the username and id.
    const userToReturn = {
      username: found.username,
      id: found._id,
    };

    res.json(userToReturn);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

export { loginRouter };
