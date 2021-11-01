const Product = require("./../models/product")
exports.products = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'add-Product',
        path: '/admin/add-product',
        mode: false
    })
}


exports.AddProducts = async (req, res, next) => {
    try {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const product = new Product({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
            userId: req.user
        });
        const result = await product.save();
        res.redirect('/admin/product')
    } catch (error) {
        console.log(error)
    }
}


exports.getProducts = async (req, res, next) => {
    try {

        const product = await Product.find();

        res.render('admin/product', {
            pageTitle: 'Products',
            path: 'admin/product',
            products: product
        });
    } catch (error) {
        console.log(error)
    }
}

exports.getEditProduct = async (req, res, next) => {
    try {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/')
        }
        const prodId = req.params.prodId;
        const product = await Product.findById(prodId);
        if (!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit product',
            path: '/admin/edit-product',
            mode: editMode,
            products: product
        })

    } catch (error) {
        console.log(error)
    }
}




exports.postEditProduct = async (req, res, next) => {
    try {
        const prodId = req.body.prodId;
        const { title, imageUrl, price, description } = req.body;
        const product = await Product.findById(prodId);
        product.title = title;
        product.imageUrl = imageUrl;
        product.price = price;
        product.description = description;
        const result = product.save();
        res.redirect('/admin/product');
    } catch (error) {
        console.log(error);
    }
}

exports.postDeleteProduct = async (req, res, next) => {
    try {
        const prodId = req.body.prodId;
        const deletedProduct = await Product.findByIdAndRemove(prodId);
        res.redirect('/admin/product')
    } catch (error) {
        console.log(error)
    }
}