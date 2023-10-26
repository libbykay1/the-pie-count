const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

const orderRoutes = require('./api/routes/orders');
const productRoutes = require('./api/routes/products');


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/", orderRoutes);
app.use("/", productRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port ${port}`)
});
