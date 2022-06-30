const express = require("express");
const mongoose = require("mongoose");

async function main() {
  const app = express();
  app.use(express.json());

  await mongoose.connect("mongodb://localhost:27017/github-gist-clone");

  const UserSchema = new mongoose.Schema({
    userId: Number,
    email: String,
    password: String,
  });

  const MemoSchema = new mongoose.Schema({
    userId: Number,
    note: String,
    isPrivate: Boolean,
  });

  const User = mongoose.model("User", UserSchema);
  const Memo = mongoose.model("Memo", MemoSchema);

  app.post("/login", async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    }).exec();

    if (user) {
      res.json(user);
    }
  });

  app.post("/register", (req, res) => {
    const newUser = new User({
      // auto increment
      userId: 2,
      email: req.body.email,
      password: req.body.password,
    });

    newUser.save();
    res.json(newUser);
  });

  app.get("/notes/:userId", (req, res) => {
    const query = Memo.find();
    query.setOptions({ lean: true });
    query.collection(Memo.collection);
    query
      .or([
        {
          userId: req.params.userId,
        },
        { isPrivate: false },
      ])
      .exec((err, result) => {
        if (!err) {
          res.json({ result });
        }
      });
  });

  app.post("/note", async (req, res) => {
    const newNote = new Memo({
      userId: req.body.userId,
      note: req.body.note,
      isPrivate: req.body.checked,
    });

    newNote.save();

    res.json(newNote);
  });

  app.listen(8000);
  console.log("Express started on port 8000");
}

main().catch((err) => console.log(err));
