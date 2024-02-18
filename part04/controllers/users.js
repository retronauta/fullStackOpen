const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const User = require('../models/user');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;

  if (password.length <= 3) {
    res.status(400).json({ error: 'too short password' });
  } else {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  }
});

module.exports = userRouter;
