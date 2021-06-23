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

module.exports = router;