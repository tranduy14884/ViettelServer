require('dotenv').config();
const express = require("express");
const router = express.Router();
const Admin = require("../Models/admin");
const cryptr = require("crypto");
const jwt = require("jsonwebtoken");
router.get("/",(req,res)=>{
  Admin.find({})
  .then(data=>{
    res.jsonp(data);
  })
  .catch(err=>{
    res.status(404).send(err);
  })

})
router.get("/:id", async (req, res) => {
  Admin.find({ _id: req.params.id })
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.post("/auth", async (req, res) => {
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
    resData.password = "**************";
    res.jsonp({
      jwt: token,
      account: resData,
    });
});

router.patch('/:id',async (req,res)=>{
 try {
    const check = await Admin.findById(req.params.id)
    if(req.body.phone){
      check.phone = req.body.phone
    }
    if(req.body.passwordOld){
      if(check.password === cryptr.createHash("md5").update(req.body.passwordOld).digest("hex")){
        check.password = cryptr.createHash("md5").update(req.body.passwordNew).digest("hex")
      }
      else{
        return res.status(400).json({err: 'Mật khẩu cũ không đúng'});
      }
    }
    await Admin.updateOne({_id : check._id},{ $set : check});
    res.jsonp(check);
 } catch (error) {
   res.status(404).send(error);
 }
});

module.exports = router;
