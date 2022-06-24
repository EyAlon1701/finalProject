const { response } = require('express');
const express = require('express');
const Category = require('../models/categories')
const auth = require("../auth")
const Product = require('../models/products')

const router = express.Router();

//CRUD - CREATE
router.post('/createCategory', auth,(request,response) => {
    const {categoryName,categoryDescription}= request.body;

    if(categoryName==null || categoryDescription==null)
    {
        return response.status(200).json({
            message: 'Please fill inputs'
        });
    } 

    Category.findAll({where: {categoryName: categoryName}})
    .then(category => {
        if(category[0]!=null)
        {   
            return response.status(500).json({
                message: 'Category already exists'
            })  
        }
        else
        {
            Category.create({
                categoryName: categoryName,
                categoryDescription: categoryDescription
            })
            .then(results => {
                return response.status(200).json({
                    message: "The category is added"
                })
            })
            .catch(err => {
                return response.status(200).json({
                    message: 'Error creating category'
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
router.get('/getAllCategories', auth,(request,response) => {
    Category.findAll()
    .then(categories => {
        return response.status(200).json({
            message: categories
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

//CRUD - READ ONE BY PK
router.get('/getCategory/:categoryId',auth, (request,response) => {
    const categoryId = request.params.categoryId;
    Category.findByPk(categoryId)
    .then(category => {
        if(category == null)
        {
            return response.status(200).json({
                message: "Category with this id does not exist"
            })
        }
        return response.status(200).json({
            message: category
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

//GET ONE/MANY BY VALUE(NAME)
router.get('/getCategoriesByValue/:search', auth, (request,response) => {
    const search = request.params.search;
    Category.findAll({where: {categoryName: search}})
    .then(categories => {
        if(categories[0] == null)
        {
            return response.status(200).json({
                message: "There is no category name with this value"
            })
        }
        return response.status(200).json({
            message: categories
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

//CTUD - UPDATE
router.put('/updateCategory/:categoryId', auth,(request,response) => {
    const categoryId = request.params.categoryId;
    Category.findByPk(categoryId)
    .then(category => {
        if(category == null)
        {
            return response.status(200).json({
                message: "Category with this id does not exist"
            })
        }
        const {categoryName,categoryDescription}= request.body;
        if(categoryName==null || categoryDescription==null)
        {
            return response.status(200).json({
                message: 'Please fill inputs'
            });
        } 
        category.categoryName = categoryName
        category.categoryDescription = categoryDescription 
        category.save() 
        return response.status(200).json({
            message: "The category got updated successfully!"
        }) 
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})

//CRUD - DELETE ONE BY PK
router.delete('/deleteCategory/:categoryId', auth,(request,response) => {
    const categoryId = request.params.categoryId;
    Category.findByPk(categoryId)
    .then(category => {
        if(category == null)
        {
            return response.status(200).json({
                message: "category with this id does not exist"
            })
        }
        category.destroy();
        Product.findAll({where: {productCategoryId: categoryId}})
        .then(products => {
            for (var i = 0; i < products.length; i++) {
                products[i].destroy();
            }
            return response.status(200).json({
                message: "all delete category&products"
            })
        })
        .catch(err => {
            return response.status(500).json({
                message: err
            })
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})

module.exports = router