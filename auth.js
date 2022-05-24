import { auto } from 'async';
import { response } from 'express'
import jwt from 'jsonwebtoken'
const User = require('../models/users')


const auth = async(request, response,next) => {

    const bearerHeader = request.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    const tokenVerify = await jwt.verify(token, 'EyAlon#1701')
    const account = await User.find(x => x.email == tokenVerify.email)

    if(account){
        request.account = account;
        next();
    } else {
        return response.sendStatus(403);
    }
    console.log(tokenVerify);
}

export default auth;