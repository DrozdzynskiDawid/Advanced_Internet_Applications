const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('trust proxy', 1);
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/AIA');

const ProductSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    price: Number
});

const ProductModel = mongoose.model("products", ProductSchema);

app.get('/', (req, res) => {
    let success = req.session.buySuccess;
    req.session.buySuccess = undefined;
    ProductModel.find({}).then(function(products) {
        res.render('shop', {products: products, success: success});
    }).catch(function(err) {
        console.log(err);
    });
});

app.post('/submit', (req, res) => {
    let selectedItems = req.body.item;
    if (typeof selectedItems == 'string') {
        selectedItems = [selectedItems];
    }
    req.session.cartItems = selectedItems;

    if (req.session.cartItems != undefined) {
        res.redirect('/cart');
    }
    else {
        res.redirect('/')
    }
});

app.post('/deleteFromCart', (req, res) => {
    const itemToDelete = req.body.itemId;
    const indexToDelete = req.session.cartItems.indexOf(itemToDelete);
    if (indexToDelete !== -1) {
        req.session.cartItems.splice(indexToDelete, 1);
    }
    res.redirect('/cart');
});

app.get('/cart', (req, res) => {
    const cartItems = req.session.cartItems;
    req.session.cartItems = [];
    req.session.totalPrice = 0;
    let success = req.session.buySuccess;
    req.session.buySuccess = undefined;
    ProductModel.find({_id: { $in: cartItems }}).then(function(products) {
        products.forEach(p => {
            req.session.cartItems.push(p.id);
            req.session.totalPrice += p.price;
        });
        req.session.totalPrice = req.session.totalPrice.toFixed(2);
        res.render('cart', {products: products, totalPrice: req.session.totalPrice, success: success});
    }).catch(function(err) {
        console.log(err);
    });
});

app.post('/buy', (req, res) => {
    const cartItems = req.session.cartItems;
    req.session.buySuccess = false;

    ProductModel.find({_id: { $in: cartItems }}).countDocuments()
        .then(count => {
            if (count == req.session.cartItems.length) {
                req.session.buySuccess = true;
                return ProductModel.deleteMany({_id: { $in: cartItems }});
            } else {
                req.session.buySuccess = false;
            }
        })
        .then(result => {
            if (req.session.buySuccess == true) {
                res.redirect('/');
            }
            else {
                res.redirect('/cart');
            }
        })
        .catch(err => {
            console.log("Error during buy process:", err);
            res.status(500).send('Error during buying items');
        });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
