const express = require("express");
const router = express.Router();
const Family = require("../Models/family");
router.get("/", (req, res) => {
  Family.find({})
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.get("/:id", async (req, res) => {
  Family.find({ _id: req.params.id })
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/", async (req, res) => {
  const reqData = {
    name: req.body.name,
    speed: req.body.speed,
    price: req.body.price,
    halfYear: req.body.halfYear,
    fullYear: req.body.fullYear,
  };
  try {
    const storeData = await Family.insertMany(reqData);
  } catch (error) {
    res.status(400).send(error);
  }
  Family.find({})
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
    const post = await Family.findById(reqId);

    if (req.body.name) {
      post.name = req.body.name;
    }
    if (req.body.price) {
      post.price = req.body.price;
    }
    if (req.body.speed) {
      post.speed = req.body.speed;
    }
    if  (req.body.halfYear || req.body.halfYear===0) {
      post.halfYear = req.body.halfYear;
    }
    if (req.body.raderFullYear || req.body.raderFullYear ===0) {
      post.fullYear = req.body.fullYear;
    }
    await Family.updateOne({ _id: post._id }, { $set: post });
    res.jsonp(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  try {
    const delData = await Family.deleteOne({ _id: reqId });
    Family.find({})
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
