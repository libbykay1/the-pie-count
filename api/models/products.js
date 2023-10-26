const mongoose = require('mongoose');

const largePieSchema = new mongoose.Schema({
    name: String,
    price: Number
});
const LargePie = mongoose.model("LargePie", largePieSchema);

const doubleCrustSchema = new mongoose.Schema({
    name: String,
    price: Number
});
const DoubleCrust = mongoose.model("DoubleCrust", doubleCrustSchema);

const smallSavorySchema = new mongoose.Schema({
    name: String,
    price: Number
})
const SmallSavory = mongoose.model("SmallSavory", smallSavorySchema);

const smallSweetSchema = new mongoose.Schema({
    name: String,
    price: Number
})
const SmallSweet = mongoose.model("SmallSweet", smallSweetSchema);

const brittleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    price: {
        type: Number
    }
});
const Brittle = mongoose.model("Brittle", brittleSchema);

const cookieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required'
    },
    price: {
        type: Number
    }
});
const Cookie = mongoose.model("Cookie", cookieSchema);

module.exports = {
    LargePie,
    DoubleCrust,
    SmallSavory,
    SmallSweet,
    Brittle,
    Cookie
};
