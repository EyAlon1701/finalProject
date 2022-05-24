const express = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users')

const router = express.Router();

router.get('/login', (request,response) => {

    User.findAll()
    .then(users => {
        response.render('login', {
            data: users
        })
    })
    .catch(err => {
        console.log(err);
    }) 
});

router.get('/register', (request,response) => {

    User.findAll()
    .then(users => {
        response.render('register', {
            data: users
        })
    })
    .catch(err => {
        console.log(err);
    }) 
});

router.get('/', (request,response) => {

    User.findAll()
    .then(users => {
        response.render('homePage', {
            data: users
        })
    })
    .catch(err => {
        console.log(err);
    }) 
});

router.post('/login', async(request,response) =>{

    const {email,password} = request.body;

    if(!email || !password){

        return response.status(200).json({
            message: 'Please fill inputs'
        })
    }
    else{
        User.findAll({where: {email: email}})
        .then(async user => {
            if(user[0]==null)
            {   
                return response.status(500).json({
                    message: 'User Not found'
                })  
            }
            else
            {
                bcryptjs.compare(password,user[0].password)
                .then(isMatch => {
                    console.log(isMatch);
                    if(isMatch){
                        const token = jsonwebtoken.sign(user[0].firstName, 'EyAlon#1701');
                        //  response.redirect('storeHomePage');
                        return response.status(200).json({
                            message: token
                        })
                    }
                    else
                    {
                        return response.status(500).json({
                            message: 'Password not match'
                        })
                    }
                })
                .catch(err => {
                    return response.status(500).json({
                        message: err.message
                    });
                })
            }
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({
                message: 'Big L'
            })
        })  
        
    }
});

router.post('/register', async(request,response) =>{

    const {firstName,lastName,email,password,mobile} = request.body;

    if(firstName==null || lastName==null || email==null || password==null || mobile==null)
    {
        return response.status(200).json({
            message: 'Please fill inputs'
        });
    }
    const hash_password = await bcryptjs.hash(password,10);
    User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash_password,
        passcode: Math.floor(1000 + Math.random() * 9000),
        mobile: mobile
    })
    .then(results => {
        console.log(results);
        response.redirect('/storeHomePage');
    })
    .catch(err => {
        return response.status(500).json({
            message: 'ERROR'
        });
    })
})

module.exports = router;