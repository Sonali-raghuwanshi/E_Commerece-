const bodyParser = require('body-parser');
const express = require('express');


const app = express();
app.use(bodyParser({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');
const mongoose = require("mongoose")
const User = require("./models/user")




app.use((req, res, next) => {
    User.findById("61686adb50901c251354eb88")
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(error => {
            console.log(error)
        })
})


app.use('/admin', adminRoute);
app.use(shopRoute);

app.use((req, res) => res.send('Page Not Found'));
mongoose.connect(`mongodb+srv://shazaib:5gUDaAp76a0SXYWo@nodejscluster.dkico.mongodb.net/shop?retryWrites=true&w=majority`)
    .then((success) => {
        app.listen(3000)
        User.findOne().then((user) => {
            if (!user) {
                const users = new User({
                    name: 'shazaib',
                    email: 'shazaib@gmail.com',
                    item: []
                })
                users.save()
            }
        })

    }).catch((error) => {
        console.log(error)
    })
