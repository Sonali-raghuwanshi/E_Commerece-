const express = require("express");
const { AddProducts, getProducts, products, getEditProduct, postEditProduct, postDeleteProduct } = require("../controller/product");
const Product = require("../models/product");
const router = express.Router();

router.get('/add-product', products);

router.get('/product', getProducts);

router.post('/add-product', AddProducts);


router.get("/edit-product/:prodId", getEditProduct)

router.post('/edit-product', postEditProduct)

router.post('/delete-product', postDeleteProduct)

module.exports = router;


