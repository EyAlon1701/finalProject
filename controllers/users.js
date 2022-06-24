const express = require('express');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/users')

const router = express.Router();

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
                    if(isMatch)
                    {
                        if(user[0].isApproved == true) {
                            const token = jsonwebtoken.sign(user[0].email, 'EyAlon#1701');
                            return response.status(200).json({
                                message: token
                            })
                        }
                        else {
                            return response.status(200).json({
                                message: "The user not approved!"
                            })
                        }      
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
        return response.status(200).json({
            message: "succeed! now login"
        })
    })
    .catch(err => {
        return response.status(500).json({
            message: 'ERROR'
        });
    })
})

router.post('/verify', async(request,response) =>{

    const {email,passcode} = request.body;

    if(!email || !passcode){

        return response.status(200).json({
            message: 'Please fill inputs'
        })
    }
    User.findAll({where: {email: email}})
    .then(user => {
        if(user[0]==null)
        {   
            return response.status(500).json({
                message: 'User Not found'
            })  
        }
        else
        {
            if(user[0].passcode == passcode)
            {
                user[0].isApproved = true;
                user[0].save();
                return response.status(200).json({
                    message: 'The user is now verified!'
                })
            }
            else 
            {
                return response.status(200).json({
                    message: 'The code is incorrect'
                })
            }
        }
    })
    .catch(err => {
        return response.status(500).json({
            message: err
        })
    })
})

router.post('/forgetPassword', async (request, response) => {

  
})

router.post('/updatePassword', async (request, response) => {

      const {email,password} = request.body;

    if(!email || !password){

        return response.status(200).json({
            message: 'Please fill inputs'
        })
    }

    User.findAll({where: {email: email}})
    .then(async user => {
        if(user[0] == null)
        {
            return response.status(200).json({
                message: 'User Not found'
            })
        }
        else {
            const hash_password = await bcryptjs.hash(password,10);
            user[0].password = hash_password;
            user[0].save();
            return response.status(200).json({
                message:  'Password updates successfully'
            })
        }
    }) 
    .catch(err => {
        return response.status(500).json({
            message: err
        });
    })
})

module.exports = router;