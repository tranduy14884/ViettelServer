require('dotenv').config();
const express = require("express");
const router = express.Router();
const Admin = require("../Models/admin");
const cryptr = require("crypto");
const jwt = require("jsonwebtoken");
const { find } = require('../Models/admin');
router.get("/",(req,res)=>{
  Admin.find({})
  .then(data=>{
    res.jsonp(data);
  })
  .catch(err=>{
    res.status(404).send(err);
  })

})
router.post("/", async (req, res) => {
  const findData = await Admin.findOne({
    username: req.body.username,
    password: cryptr.createHash("md5").update(req.body.password).digest("hex"),
  })
    if(!findData) return  res.status(400).send("That bai");
    const token = jwt.sign(
      {
        _id: findData._id,
        username: findData.username,
      },
      process.env.ACCESS_TOKEN_SECRET
     
    );
    const resData = findData;
    resData.password = "******";
    res.jsonp({
      jwt: token,
      account: resData,
    });
});

module.exports = router;
