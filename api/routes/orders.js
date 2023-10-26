const express = require('express');
const {
    getOrders,
    createOrder,
    editOrder,
    editOrderItems,
    getOrder,
    deleteOrder,
    editItem,
    removeItem,
    getOrderTotal,
    orderReady,
    orderPickedup,
    editCollect,
    getOrdersByDate,
    getItems,
    getFourpackFlavors
} = require('../queries/orders');

const router = express.Router();





router.get('/orders', getOrders);
router.get('/orders/list/:date', getOrdersByDate);
router.post('/orders', createOrder);
router.patch('/orders/:orderid', editOrder);
router.patch('/orders/:orderid/items', editOrderItems);
router.get('/orders/:orderid', getOrder);
router.delete('/orders/:orderid', deleteOrder);

router.patch('/orders/:orderid/items/:itemid', editItem);
router.patch('/orders/:orderid/items/:itemid/remove', removeItem);

router.get('/orders/:orderid/total', getOrderTotal);
router.get('/orders/items/count', getItems);

router.patch('/orders/:orderid/ready', orderReady);
router.patch('/orders/:orderid/pickedup', orderPickedup);
router.patch('/orders/:orderid/collect', editCollect);

router.get('/fourpacks', getFourpackFlavors);

module.exports = router;
