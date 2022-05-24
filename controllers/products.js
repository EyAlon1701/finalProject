const { response } = require('express');
const express = require('express');
const Product = require('../models/products')

const router = express.Router();


//CRUD - CREATE
router.post('/createProduct', (request,response) => {
    const {productName,productPrice,productPhoto,productCategory}= request.body;
    Product.create({
        productName: productName,
        productPrice: productPrice,
        productPhoto: productPhoto,
        productCategory: productCategory
    })
    .then(results => {
        console.log(results);
        response.redirect('/accounts');
    })
    .catch(err => {
        console.log(err);
        response.redirect('/accounts');
    })  
})

//CTUD - READ ALL
router.get('/getAllProducts', (request,response) => {
    Product.findAll()
    .then(Products => {
        return response.status(200).json({
            message: Products
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

//CRUD - READ ONE BY PK
router.get('/getProduct/:ProductId', (request,response) => {
    const ProductId = request.params.ProductId;
    Product.findByPk(ProductId)
    .then(Product => {
        return response.status(200).json({
            message: Product
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

//CTUD - UPDATE
router.put('/updateProduct/:ProductId', (request,response) => {
    const ProductId = request.params.ProductId;
    Product.findByPk(ProductId)
    .then(Product => {
        const {productName,productPrice,productPhoto,productCategory}= request.body;
        Product.productName = productName
        Product.productPrice = productPrice 
        Product.productPhoto = productPhoto
        Product.productCategory = productCategory 
        return Product.save()  
    })
    .then(Product_updated => {
        return response.status(200).json({
            message: Product_updated
        });
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})

//CRUD - DELETE ONE BY PK
router.delete('/deleteProduct/:ProductId', (request,response) => {
    const ProductId = request.params.ProductId;
    Product.findByPk(ProductId)
    .then(Product => {
        return Product.destroy();
    })
    .then(Product_removed => {
        return response.status(200).json({
            message: Product_removed
        });
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})



//CRUD - READ ONE/MANY BY VALUE(NAME)
router.get('/getProductsByValue/:search', (request,response) => {
    const search = request.params.search;
    Product.findAll({where: {productName: search}})
    .then(Products => {
        return response.status(200).json({
            message: Products
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

module.exports = router