const express = require('express')
// Using Node.js `require()`
const mongoose = require('mongoose');
// Using ES6 imports
const app = express()
const port = 3000
const Family = require('./Models/family');
const familyRoute = require('./Routes/family.router');
//connect database
const db = mongoose.connect(`mongodb://localhost/viettel`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
// Using ES6 imports



app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/family', familyRoute);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
module.exports = db;