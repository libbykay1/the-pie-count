const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    flavors: {
        type: String
    },
    price: {
        type: Number
    },
    amount: {
        type: Number,
        required: 'Amount is required'
    },
});
const Item = mongoose.model("Item", itemSchema);

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    phoneNumber: {
        type: String
    },
    pickupDate: {
        type: Date
    },
    pickupTime: {
        type: String
    },
    displayTime: {
        type: String
    },
    status: {
        type: String
    },
    shopifyNumber: {
        type: Number
    },
    collect: {
        type: String
    },
    items: [itemSchema],
});
const Order = mongoose.model("Order", orderSchema);



module.exports = {
    Order,
    Item
}
