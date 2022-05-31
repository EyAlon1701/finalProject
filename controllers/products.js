const { response } = require('express');
const express = require('express');
const Product = require('../models/products')
const auth = require("../auth")

const router = express.Router();

router.get('/storeHomePage',auth, (request,response) => {

    Product.findAll()
    .then(products => {
        response.render('storeHomePage', {
            data: products
        })
    })
    .catch(err => {
        console.log(err);
    }) 
});

//CRUD - CREATE
router.post('/createProduct', auth,(request,response) => {
    const {productName,productPrice,productPhoto,productCategoryId}= request.body;
    Product.create({
        productName: productName,
        productPrice: productPrice,
        productPhoto: productPhoto,
        productCategoryId: productCategoryId
    })
    .then(results => {
        console.log(results);
        response.redirect('/storeHomePage');
    })
    .catch(err => {
        console.log(err);
        response.redirect('/storeHomePage');
    })  
})

//CTUD - READ ALL
router.get('/getAllProducts',auth, (request,response) => {
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
router.get('/getProduct/:ProductId', auth, (request,response) => {
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

//CRUD - READ ONE/MANY BY categoryId
router.get('/getProductsByCategoryId/:categoryId',auth, (request,response) => {
    const categoryId = request.params.categoryId;
    Product.findAll({where: {productCategoryId: categoryId}})
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

//CTUD - UPDATE
router.put('/updateProduct/:ProductId',auth, (request,response) => {
    const ProductId = request.params.ProductId;
    Product.findByPk(ProductId)
    .then(Product => {
        const {productName,productPrice,productPhoto,productCategoryId}= request.body;
        Product.productName = productName
        Product.productPrice = productPrice 
        Product.productPhoto = productPhoto
        Product.productCategoryId = productCategoryId 
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
router.delete('/deleteProduct/:ProductId',auth, (request,response) => {
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

module.exports = router