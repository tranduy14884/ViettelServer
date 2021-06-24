const express = require('express');
const router = express.Router();
const Super = require('../Models/super');
router.get('/', (req,res)=>{
    Super.find({})
    .then((data) =>{
        res.jsonp(data);
    })
    .catch(err =>{
        res.send(err);
    })
})
router.get("/:id", async (req, res) => {
    Super.find({ _id: req.params.id })
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
      price: (req.body.price),
      halfYear: (req.body.halfYear),
      fullYear: (req.body.fullYear),
      modem : (req.body.modem),
      wifi : (req.body.wifi)
    };
    try {
      const storeData = await Super.insertMany(reqData);
    } catch (error) {
      res.status(400).send(err);
    }
    // res.jsonp(reqData);
    Super.find({})
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
      const post = await Super.findById(reqId);
  
      if (req.body.name) {
        post.name = req.body.name;
      }
      if (req.body.price) {
        post.price = req.body.price;
      }
      if (req.body.speed) {
        post.speed = req.body.speed;
      }
      if (req.body.halfYear || req.body.halfYear===0) {
        post.halfYear = req.body.halfYear;
      }
      if (req.body.fullYear || req.body.fullYear===0)  {
        post.fullYear = req.body.fullYear;
      }
      if (req.body.modem || req.body.modem===0) {
        post.modem = req.body.modem;
      }
      if (req.body.wifi || req.body.wifi ===0) {
        post.wifi = req.body.wifi;
      }
     
      await Super.updateOne({ _id: post._id }, { $set: post });
      res.jsonp(post);
    } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
    }
  });
  router.delete("/:id", async (req, res) => {
    const reqId = req.params.id;
    try {
      const delData = await Super.deleteOne({ _id: reqId });
      Super.find({})
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