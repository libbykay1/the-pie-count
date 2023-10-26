const mongoose = require('mongoose');
const { Order } = require('../models/orders');

exports.getOrders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
};

exports.getOrdersByDate = async (req, res) => {
    const date = req.params.date;
    const orders = await Order.find({pickupDate: date}).sort({pickupTime: 1});
    res.json(orders);
};

exports.createOrder = async (req, res) => {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.json(savedOrder);
};

exports.editOrderItems = async (req, res) => {
    const _id = req.params.orderid;
    const update = await Order.findByIdAndUpdate(_id, { $push: { items: req.body } });
    res.json({"Status": "Updated"});
};

exports.editOrder = async (req, res) => {
    const _id = req.params.orderid;
    const update = await Order.findByIdAndUpdate(_id, { $set: { pickupDate: req.body.pickupDate, pickupTime: req.body.pickupTime, displayTime: req.body.displayTime } });
    res.json({"Status": "Updated"});
};

exports.editCollect = async (req, res) => {
    const _id = req.params.orderid;
    const update = await Order.findByIdAndUpdate(_id, { $set: { collect: req.body.collect } });
    res.json({'Status': 'Updated'});
};

exports.orderReady = async (req, res) => {
    const _id = req.params.orderid;
    const update = await Order.findByIdAndUpdate(_id, { $set: { status: 'ready' } });
    res.json({'Status': 'Order ready'});
};

exports.orderPickedup = async (req, res) => {
    const _id = req.params.orderid;
    const update = await Order.findByIdAndUpdate(_id, { $set: { status: 'picked up' }});
    res.json({'Status': 'Order picked up'});
};

exports.getOrder = async (req, res) => {
    const _id = req.params.orderid;
    const order = await Order.findById(_id);
    res.json(order);
};

exports.deleteOrder = async (req, res) => {
    const _id = req.params.orderid;
    await Order.deleteOne({_id: _id});
    res.json({"Status": "Removed order"});
};

exports.editItem = async (req, res) => {
    const _id = req.params.orderid;
    const itemId = req.params.itemid;
    const update = await Order.findByIdAndUpdate(
        _id,
        {
            $set: {
                'items.$[element].amount': req.body.amount,
            },
        },
        {
            arrayFilters: [{ 'element._id': itemId }],
            new: true,
        }
    );
    res.json({"Status": "Updated"});
};

exports.removeItem = async (req, res) => {
    const orderid = req.params.orderid;
    const itemid = req.params.itemid;
    const order = await Order.findByIdAndUpdate(
        orderid,
        { $pull: { items: { _id: itemid } } },
        { new: true }
    );
    res.json({status: 'Item removed'});
};

exports.getOrderTotal = async (req, res) => {
    const orderId = req.params.orderid;
    const objectId = new mongoose.Types.ObjectId(orderId);
    Order.aggregate([
        { $match: { _id: objectId } },
        { $unwind: '$items' },
        {
          $group: {
            _id: '$_id',
            totalPrice: { $sum: {
                $multiply: ['$items.price', '$items.amount']
            }
          }
        }}
      ])
      .exec()
      .then(result => {
        if (result.length > 0) {
        const totalPrice = result[0].totalPrice;
        res.json({'total': totalPrice});
        } else {
            console.log('No items yet');
        };
});
};

exports.getItems = async (req, res) => {

    const pipeline = [
        { $match: { status: 'pending' } },
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.name",
                count: { $sum: "$items.amount" },
                price: { $avg: { $ifNull: ["$items.price", 0] } }
            }
        },
        { $sort: { price: -1 } }
    ];
    try {
        const results = await Order.aggregate(pipeline).exec();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error aggregating data');
    }
};

exports.getFourpackFlavors = async (req, res) => {
    const pipeline = [
        { $unwind: '$items' },
        { $match: { "items.flavors": { $exists: true, $ne: "" } } }, // Filter for non-empty flavors
  {
    $project: {
      flavors: { $split: ["$items.flavors", ", "] }
    }
  },
  { $unwind: "$flavors" },
  {
    $group: {
      _id: "$flavors",
      count: { $sum: 1 },
    },
  },
    ];
    try {
        const results = await Order.aggregate(pipeline).exec();
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error aggregating data');
    }
};
