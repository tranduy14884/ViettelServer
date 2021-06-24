const express = require('express')
// Using Node.js `require()`
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const parser = require('body-parser');
// Using ES6 imports
const app = express()
const port = 3000
const Family = require('./Models/family');
const familyRoute = require('./Routes/family.router');
const comboRoute = require('./Routes/combo.router');
const superRoute = require('./Routes/super.router');
const companyRoute = require('./Routes/company.router');
const orderRoute = require('./Routes/order.router');

//connect database
const db = mongoose.connect(`mongodb://localhost/viettel`, {
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
app.use('/familyApi', familyRoute);
app.use('/comboApi', comboRoute);
app.use('/superApi', superRoute);
app.use('/companyApi', companyRoute);
app.use('/orderApi', orderRoute);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
