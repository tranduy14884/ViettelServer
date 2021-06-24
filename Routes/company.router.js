const express = require("express");
const router = express.Router();
const Company = require("../Models/company");
router.get("/", (req, res) => {
  Company.find({})
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/:id", async (req, res) => {
  Company.find({ _id: req.params.id })
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
    price: parseInt(req.body.price),
    halfYear: parseInt(req.body.halfYear),
    fullYear: parseInt(req.body.fullYear),
    Ip: parseInt(req.body.Ip),
    IpL: parseInt(req.body.IpL),
    raderFullYear: parseInt(req.body.raderFullYear),
  };
  try {
    const storeData = await Company.insertMany(reqData);
  } catch (error) {
    res.status(400).send(err);
  }
  Company.find({})
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
    const post = await Company.findById(reqId);

    if (req.body.name) {
      post.name = req.body.name;
    }
    if (req.body.price) {
      post.price = req.body.price;
    }
    if (req.body.speed) {
      post.speed = req.body.speed;
    }
    if (req.body.halfYear) {
      post.halfYear = req.body.halfYear;
    }
    if (req.body.fullYear) {
      post.fullYear = req.body.fullYear;
    }
    if (req.body.raderFullYear) {
      post.raderFullYear = req.body.raderFullYear;
    }
    if (req.body.Ip) {
      post.Ip = parseInt(req.body.Ip);
    }
    if (req.body.IpL) {
      post.IpL = parseInt(req.body.IpL);
    }
    await Company.updateOne({ _id: post._id }, { $set: post });
    res.jsonp(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});
router.delete("/:id", async (req, res) => {
  const reqId = req.params.id;
  try {
    const delData = await Company.deleteOne({ _id: reqId });
    Company.find({})
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
