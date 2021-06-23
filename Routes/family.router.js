const express = require('express');
const router = express.Router();
const Family = require('../Models/family');
router.get('/', (req, res) => {
    Family.find({})
        .then(data => {
            res.jsonp(data);
        })
        .catch(err => {
            console.send(err);
        });

});
module.exports = router;

