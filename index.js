const express = require('express');
const app = express();
const port = 2500;
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DBMS')
    })
    .catch((err) => {
        console.log('Opps, seems we have an error');
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetable', 'diary', 'bird']

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const found = await Product.findById(id)
    res.render('products/details', { found })

})

app.post('/products', async (req, res) => {
    const data = req.body;
    const newProduct = new Product(data);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})


app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
