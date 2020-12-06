const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DBMS')
    })
    .catch((err) => {
        console.log('Opps, seems we have an error');
        console.log(err);
    })


const seedProducts = [
    {
        name: 'tomato',
        price: 3,
        category: 'vegetable'
    },
    {
        name: 'mango',
        price: 1,
        category: 'vegetable'
    },
    {
        name: 'milk',
        price: 3,
        category: 'diary'
    },
    {
        name: 'chicken',
        price: 4,
        category: 'bird'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err)
    })