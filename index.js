import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Post from "./schema/dbPosts.js";
import Comment from "./schema/dbComments.js";
import dotenv from "dotenv";

// App Config
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const url = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.okgtz.mongodb.net/postDb?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(Cors());
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

// DB Config
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Endpoints

app.get("/api", (req, res) => res.send("Hello"));

app.post("/api/posts", (req, res) => {
  const dbPost = req.body;

  Post.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/api/posts", (req, res) =>
  Post.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
);

app.post("/api/posts/:postId/comments", (req, res) => {
  const dbComment = req.body;

  Comment.create(dbComment, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/api/posts/:id", (req, res) =>
  Post.find({ id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
);

app.get("/api/posts/:postId/comments", (req, res) =>
  Comment.find({ postId: req.params.postId }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
);

// Listner
app.listen(port, () => console.log(`listening to port ${port}`));
