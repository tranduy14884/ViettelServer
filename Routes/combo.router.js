const express = require('express');
const router = express.Router();
const Combo = require('../Models/combo');
router.get('/',(req,res)=>{
    Combo.find({})
    .then(data=>{
        res.jsonp(data);
    })
    .catch(err =>{
        res.send(err);
    })
})


module.exports = router;