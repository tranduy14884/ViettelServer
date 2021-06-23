const express = require('express');
const router = express.Router();
const Company = require('../Models/company');
router.get('/',(req,res)=>{
    Company.find({})
    .then(data =>{
        res.jsonp(data);
    })
    .catch(err=>{
        res.send(err);
    })
})

module.exports = router;