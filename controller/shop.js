const Product = require("../models/product");
const Order = require("../models/order")

exports.getIndex = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('shop/index', {
            pageTitle: 'shop',
            path: '/',
            products: products
        })
    } catch (error) {
        console.log(error)

    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.render('shop/product-list', {
            pageTitle: 'shop',
            path: '/',
            products: products
        })
    } catch (error) {
        console.log(error)
    }
}



exports.getProductsById = async (req, res, next) => {
    try {
        const prodId = req.params.productsId;
        const product = await Product.findById(prodId);
        console.log(product);
        res.render('shop/product-detail', {
            pageTitle: 'Product Detail',
            path: 'shop/product-detail',
            product: product
        })
    } catch (error) {
        console.log(error)
    }
}


exports.postCart = async (req, res, next) => {
    try {
        const prodId = req.body.prodId;
        const product = await Product.findById(prodId)
        const result = await req.user.addToCart(product)
        res.redirect("/cart")
    } catch (error) {
        console.log(error)
    }
}



exports.postOrders = async (req, res, next) => {
    try {
        req.user
            .populate('cart.items.productId')
            .then(user => {
                const products = user.cart.items.map((i) => {
                    return { quantity: i.quantity, product: { ...i.productId._doc } }
                });
                const order = new Order({
                    user: {
                        name: req.user.name,
                        userId: req.user
                    },
                    products: products
                })
                return order.save()
            }).then((result) => {
                req.user.clearCart().then(() => {
                    res.redirect('/orders');
                })
            })


    } catch (error) {
        console.log(error)
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({'user.userId':req.user._id})
        res.render('shop/order', {
            path: 'orders',
            pageTitle: 'Your Orders',
            orders: orders
        });
    } catch (error) {
        console.log(error)
    }
}


exports.getCarts = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
            });
        })
        .catch(error => {
            console.log(error)
        })
}



exports.postDeletedCartItem = async (req, res, next) => {
    try {
        const prodId = req.body.prodId;
        const products = await req.user.removeFromCart(prodId)
        return res.redirect('/cart');

    } catch (error) {
        console.log(error)
    }
}