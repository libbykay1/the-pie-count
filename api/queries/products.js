const { LargePie, DoubleCrust, SmallSavory, SmallSweet, Brittle, Cookie } = require('../models/products');

exports.getBrittles = async (req, res) => {
    const brittles = await Brittle.find();
    res.json(brittles);
};

exports.createBrittle = async (req, res) => {
    const brittle = new Brittle(req.body);
    const savedBrittle = await brittle.save();
    res.json(savedBrittle);
};

exports.editBrittle = async (req, res) => {
    const _id = req.params.brittleid;
    const update = await Brittle.findByIdAndUpdate(_id, { $set: req.body }, {new: true} );
    res.json({"Status": "Updated"});
};

exports.deleteBrittle = async (req, res) => {
    const _id = req.params.brittleid;
    await Brittle.deleteOne({_id: _id});
    res.json({"Status": "Removed brittle"});
};

exports.getCookies = async (req, res) => {
    const cookies = await Cookie.find();
    res.json(cookies);
};

exports.createCookie = async (req, res) => {
    const cookie = new Cookie(req.body);
    const savedCookie = await cookie.save();
    res.json(savedCookie);
};

exports.editCookie = async (req, res) => {
    const _id = req.params.cookieid;
    const update = await Cookie.findByIdAndUpdate(_id, { $set: req.body }, {new: true} );
    res.json({"Status": "Updated"});
};

exports.deleteCookie = async (req, res) => {
    const _id = req.params.cookieid;
    await Cookie.deleteOne({_id: _id});
    res.json({"Status": "Removed cookie"});
};

exports.createLargePie = async (req, res) => {
    const pie = new LargePie(req.body);
    const savedPie = await pie.save();
    res.json(savedPie);
};

exports.getLargePies = async (req, res) => {
    const pies = await LargePie.find().sort({name: 1});
    res.json(pies);
};

exports.editLargePie = async (req, res) => {
    const _id = req.params.id;
    const update = await LargePie.findByIdAndUpdate(_id, { $set: req.body }, {new: true} );
    res.json({"Status": "Updated"});
};

exports.deleteLargePie = async (req, res) => {
    const _id = req.params.cookieid;
    await Cookie.deleteOne({_id: _id});
    res.json({"Status": "Removed pie"});
};

exports.createDoubleCrust = async (req, res) => {
    const pie = new DoubleCrust(req.body);
    const savedPie = await pie.save();
    res.json(savedPie);
};

exports.getDoubleCrusts = async (req, res) => {
    const pies = await DoubleCrust.find();
    res.json(pies);
};

exports.editDoubleCrust = async (req, res) => {
    const _id = req.params.id;
    const update = await DoubleCrust.findByIdAndUpdate(_id, { $set: req.body }, {new: true} );
    res.json({"Status": "Updated"});
};

exports.deleteDoubleCrust = async (req, res) => {
    const _id = req.params.id;
    await DoubleCrust.deleteOne({_id: _id});
    res.json({"Status": "Removed pie"});
};

exports.createSmallSavory = async (req, res) => {
    const pie = new SmallSavory(req.body);
    const savedPie = await pie.save();
    res.json(savedPie);
};

exports.getSmallSavorys = async (req, res) => {
    const pies = await SmallSavory.find().sort({name: 1});
    res.json(pies);
};

exports.editSmallSavory = async (req, res) => {
    const _id = req.params.id;
    const update = await SmallSavory.findByIdAndUpdate(_id, { $set: req.body }, {new: true} );
    res.json({"Status": "Updated"});
};

exports.deleteSmallSavory = async (req, res) => {
    const _id = req.params.id;
    await SmallSavory.deleteOne({_id: _id});
    res.json({"Status": "Removed pie"});
};

exports.createSmallSweet = async (req, res) => {
    const pie = new SmallSweet(req.body);
    const savedPie = await pie.save();
    res.json(savedPie);
};

exports.getSmallSweets = async (req, res) => {
    const pies = await SmallSweet.find().sort({name: 1});
    res.json(pies);
};

exports.editSmallSweet = async (req, res) => {
    const _id = req.params.id;
    const update = await SmallSweet.findByIdAndUpdate(_id, { $set: req.body }, {new: true} );
    res.json({"Status": "Updated"});
};

exports.deleteSmallSweet = async (req, res) => {
    const _id = req.params.id;
    await SmallSweet.deleteOne({_id: _id});
    res.json({"Status": "Removed pie"});
};
