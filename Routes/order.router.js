const express = require('express');
const router = express.Router();
const Order = require('../Models/order');
router.get('/', (req, res)=>{
    Order.find({})
    .then(data=>{
        res.jsonp(data);
    })
    .catch( err=>{
        res.send(err);
    })
});
router.get("/:id", async (req, res) => {
    Order.find({ _id: req.params.id })
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
      location : req.body.location,
      phone : parseInt(req.body.phone),
      packet : req.body.packet,
      status : parseInt(req.body.status)
    };
    try {
      const storeData = await Order.insertMany(reqData);
    } catch (error) {
      res.status(400).send(err);
    }
    Order.find({})
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
      const post = await Order.findById(reqId);
  
    //   if (req.body.name) {
    //     post.name = req.body.name;
    //   }
    //   if (req.body.price) {
    //     post.price = req.body.price;
    //   }
    //   if (req.body.speed) {
    //     post.speed = req.body.speed;
    //   }
    //   if (req.body.halfYear) {
    //     post.halfYear = req.body.halfYear;
    //   }
    //   if (req.body.fullYear) {
    //     post.fullYear = req.body.fullYear;
    //   }
    //   if (req.body.modem) {
    //     post.modem = req.body.modem;
    //   }
      if (req.body.status) {
        post.status = req.body.status;
      }
     
      await Order.updateOne({ _id: post._id }, { $set: post });
      res.jsonp(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  });
  router.delete("/:id", async (req, res) => {
    const reqId = req.params.id;
    try {
      const delData = await Order.deleteOne({ _id: reqId });
      Order.find({})
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