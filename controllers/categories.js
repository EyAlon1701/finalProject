const { response } = require('express');
const express = require('express');
const Category = require('../models/categories')
const auth = require("../auth")

const router = express.Router();

//CRUD - CREATE
router.post('/createCategory', auth,(request,response) => {
    const {categoryName,categoryDescription}= request.body;
    Category.create({
        categoryName: categoryName,
        categoryDescription: categoryDescription
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
        const {categoryName,categoryDescription}= request.body;
        category.categoryName = categoryName
        category.categoryDescription = categoryDescription 
        return category.save()  
    })
    .then(category_updated => {
        return response.status(200).json({
            message: category_updated
        });
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
        return category.destroy();
    })
    .then(category_removed => {
        return response.status(200).json({
            message: category_removed
        });
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})

module.exports = router