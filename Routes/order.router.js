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


module.exports = router;