import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user.js";

const usersRouter = express.Router();
usersRouter.get("/api", async (req, res) => {
  console.log("yeah baby");
  const find = await User.find({});
  res.send(find);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const found = await User.findOne({ username });
  if (found) {
    response
      .status(400)
      .json({ error: `იუზერი სახელით ${username} უკვე არსებობს` });
  } else {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    console.log(passwordHash);
    response.status(201).json(savedUser);
  }
});

export { usersRouter };
