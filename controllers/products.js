const { response } = require('express');
const express = require('express');
const Product = require('../models/products')
const auth = require("../auth")

const router = express.Router();

//CRUD - CREATE
router.post('/createProduct', auth,(request,response) => {
    const {productName,productPrice,productPhoto,productCategoryId}= request.body;

    if(productName==null || productPrice==null || productPhoto==null || productCategoryId==null)
    {
        return response.status(200).json({
            message: 'Please fill inputs'
        });
    }
    Product.findAll({where: {productName: productName}})
    .then(product => {
        if(product[0]!=null)
        {   
            return response.status(500).json({
                message: 'Product already exists'
            })  
        }
        else
        {
            Product.create({
                productName: productName,
                productPrice: productPrice,
                productPhoto: productPhoto,
                productCategoryId: productCategoryId
            })
            .then(results => {
                return response.status(200).json({
                    message: "The product is added"
                })
            })
            .catch(err => {
                return response.status(200).json({
                    message: 'Error creating product'
                });
            })
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
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
        if(Product == null)
        {
            return response.status(200).json({
                message: "Product with this id does not exist"
            })
        }
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
        if(Products[0] == null)
        {
            return response.status(200).json({
                message: "Products with this Category id does not exist"
            })
        }
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
    .then(product => {
        if(product == null)
        {
            return response.status(200).json({
                message: "Product with this id does not exist"
            })
        }
        const {productName,productPrice,productPhoto,productCategoryId}= request.body;
        if(productName==null || productPrice==null || productPhoto==null || productCategoryId==null)
        {
            return response.status(200).json({
                message: 'Please fill inputs'
            });
        }
        product.productName = productName
        product.productPrice = productPrice 
        product.productPhoto = productPhoto
        product.productCategoryId = productCategoryId 
        product.save()  
        return response.status(200).json({
            message: "The product got updated successfully!"
        })
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
        if(Product == null)
        {
            return response.status(200).json({
                message: "Product with this id does not exist"
            })
        }
        Product.destroy();
        return response.status(200).json({
            message: "The product got deleted!"
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

module.exports = router