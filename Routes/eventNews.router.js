const express = require("express");
const router = express.Router();
const EventNews = require("../Models/eventNews");
router.get("/", (req, res) => {
  EventNews.find({})
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/:id", async (req, res) => {
  EventNews.find({ _id: req.params.id })
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/", async (req, res) => {
  const reqData = {
    title: req.body.title,
    thumnailUrl: req.body.thumnailUrl,
    content: "",
  };
  try {
    const storeData = await EventNews.insertMany(reqData);
  } catch (error) {
    res.status(400).send(error);
  }
  EventNews.find({})
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.patch("/:id", async (req, res) => {
  const reqId = req.params.id;
  try {
    const post = await EventNews.findById(reqId);
    if (req.body.title) {
      post.title = req.body.title;
    }
    if (req.body.thumnailUrl) {
      post.thumnailUrl = req.body.thumnailUrl;
    }
    if (req.body.content) {
      post.content = req.body.content;
    }
    await EventNews.updateOne({ _id: post._id }, { $set: post });
    res.jsonp(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  try {
    const delData = await EventNews.deleteOne({ _id: reqId });
    EventNews.find({})
      .then((data) => {
        res.jsonp(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
