const express = require('express')
// Using Node.js `require()`
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// Using ES6 imports
const app = express()
const port = 3000
// const Family = require('./Models/family');
// const familyRoute = require('./Routes/family.router');
const comboRoute = require('./Routes/combo.router');
const superRoute = require('./Routes/super.router');
const companyRoute = require('./Routes/company.router');
const orderRoute = require('./Routes/order.router');
const adminRoute = require('./Routes/admin.router');

//connect database
const db = mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
// Using ES6 imports
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
})
//test
app.get('/api', (req, res) => {
    res.send('Api server!')
})
const familySchema = new mongoose.Schema({
    name: String,
    speed: String,
    price: Number,
    halfYear: Number,
    fullYear: Number
}, {
    collection: 'family'
}
);
const Family = mongoose.model('family', familySchema);
app.get("/api/family", (req, res) => {
  Family.find({})
    .then((data) => {
      res.jsonp(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
// app.use('/api/familyApi', familyRoute);
app.use('/api/comboApi', comboRoute);
app.use('/api/superApi', superRoute);
app.use('/api/companyApi', companyRoute);
app.use('/api/orderApi', orderRoute);
app.use('/api/adminApi', adminRoute);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
