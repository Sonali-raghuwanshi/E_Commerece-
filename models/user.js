const mongoose = require("mongoose")
const schema = mongoose.Schema;
const userSchema = schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    }
})

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItem = this.cart.items.filter((p) => {
        return p.productId.toString() !== productId.toString()
    })
    this.cart = updatedCartItem
    this.save()
}

userSchema.methods.clearCart = function () {
    this.cart = { items: [] }
    return this.save()
}

module.exports = mongoose.model("User", userSchema);



// const mongodb = require("mongodb")
// const getDb = require("./../util/database").getDb;
// const ObjectId = mongodb.ObjectId;
// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this._id = id;
//         this.cart = cart
//     }

//     async save() {
//         try {
//             const db = await getDb();
//             return await db.collection("users").insertOne(this)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     static async findById(userId) {
//         try {
//             const db = await getDb();
//             return await db.collection("users")
//                 .findOne({ _id: new ObjectId(userId) })
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async addToCart(product) {
//         try {

//             const cartProductIndex = this.cart.item.findIndex(cp => {
//                 return cp.prodId.toString() == product._id.toString()
//             })
//             let newQuantity = 1;
//             const updatedCartItem = this.cart.item;
//             if (cartProductIndex >= 0) {
//                 newQuantity = this.cart.item[cartProductIndex].quantity + 1;
//                 updatedCartItem[cartProductIndex].quantity = newQuantity
//             } else {
//                 updatedCartItem.push({ prodId: new ObjectId(product._id), quantity: 1 })
//                 console.log(updatedCartItem)
//             }
//             const updatedCart = { item: updatedCartItem }
//             const db = getDb();
//             return db.collection("users").updateOne({ _id: new ObjectId(this._id) },
//                 { $set: { cart: updatedCart } })
//         } catch (error) {
//             console.log(error)
//         }
//     }






//     async getCart() {
//         try {
//             const db = getDb();
//             const productId = this.cart.item.map(i => {
//                 return i.prodId
//             })
//             const products = await db.collection("products")
//                 .find({ _id: { $in: productId } }).toArray();
//             return products.map((p) => {
//                 return {
//                     ...p,
//                     quantity: this.cart.item.find((i) => {
//                         return i.prodId.toString() === p._id.toString()
//                     }).quantity
//                 }
//             })
//         } catch (error) {
//             console.log(error);
//         }
//     }


//     async addOrders() {
//         try {
//             const db = getDb()
//             const products = await this.getCart()
//             const orders = {
//                 item: products,
//                 user: {
//                     _id: new ObjectId(this._id),
//                     name: this.name
//                 }
//             }
//             const oneOrder = await db.collection("orders").insertOne(orders)
//             this.cart = { item: [] }
//             return db.collection("users").updateOne({ _id: new ObjectId(this._id) },
//                 { $set: { cart: { item: [] } } })
//         } catch (error) {
//             console.log(error)
//         }

//     }


//     async getOrders() {
//         try {
//             const db = getDb()
//             const orders = await db.collection("orders").find({ "user._id": new ObjectId(this._id) }).toArray();
//             return orders;
//         } catch (error) {
//             console.log(error)
//         }
//     }



//     async deleteItemFromCart(prodId) {
//         try {
//             const updatedCartItem = this.cart.item.filter((p) => {
//                 return p.prodId.toString() !== prodId.toString()
//             })
//             const db = getDb();
//             return db.collection("users").updateOne({ _id: new ObjectId(this._id) },
//                 { $set: { cart: { item: updatedCartItem } } })
//         } catch (error) {
//             console.log(error)
//         }
//     }

// }
// module.exports = User;