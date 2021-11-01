const express = require("express");
const { getIndex, getProducts, getProductsById, postCart, getCarts, postDeletedCartItem, postOrders,getOrders } = require("../controller/shop");
const router = express.Router();

router.get('/', getIndex);

router.get('/products', getProducts)

router.get('/product/:productsId', getProductsById);

router.get('/cart', getCarts);

router.post('/cart', postCart)

router.post('/delete-cart-item', postDeletedCartItem)

router.post('/create-order', postOrders);

router.get('/orders', getOrders);


module.exports = router;