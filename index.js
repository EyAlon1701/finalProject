const express = require('express');
const bodyParser = require('body-parser');
const database = require('./utilis/database');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

const categoriesRoute = require('./controllers/categories');
app.use('/',categoriesRoute);

const productsRoute = require('./controllers/products');
app.use('/',productsRoute);

const usersRoute = require('./controllers/users');
app.use('/',usersRoute);

const port = 5070;

database
.sync()
.then(res => {
    //console.log(res);
    app.listen(port, function(){
        console.log(`Server working with port ${port}`);
    })
})
.catch(err => console.log(err))
