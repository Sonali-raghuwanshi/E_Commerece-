const mongoose = require("mongoose")
const schema = mongoose.Schema;
const productschema = new schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Product", productschema)



// const mongodb = require("mongodb");
// const getDb = require('./../util/database').getDb;

// class Product {
//     constructor(title, imageUrl, price, description, id, userId) {
//         this.title = title;
//         this.price = price;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this._id = (id) ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//     }

//     async save() {
//         try {
//             const db = await getDb();
//             let result;
//             if (this._id) {
//                 // edit the  product
//                 result = await db.collection('products').updateOne(
//                     { _id: this._id }, { $set: this })
//             } else {
//                 result = await db.collection('products').insertOne(this);
//             }
//             return result;

//         } catch (error) {

//         }

//     }

//     static async fethcAll() {   
//         try {
//             const db = await getDb();
//             const products = await db.collection("products").find().toArray();
//             return products;
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     static async findById(prodId) {
//         try {
//             const db = await getDb();
//             const products = await db.collection("products")
//                 .find({ _id: new mongodb.ObjectId(prodId) }).next();
//             return products;
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     static async deleteById(prodId) {
//         try {
//             const db = await getDb();
//             const products = await db.collection("products").deleteOne({ _id: new mongodb.ObjectId(prodId) })
//             return products;
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }


// module.exports = Product;