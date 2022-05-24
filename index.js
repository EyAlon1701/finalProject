const express = require('express');
const bodyParser = require('body-parser');
const database = require('./utilis/database');
const path = require('path');

const app = express();

app.set('view engine','ejs');
app.set('views','views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');

const productsRoute = require('./controllers/product');
app.use('/api/products',productsRoute);

const accountsRoute = require('./controllers/account');
app.use('/accounts',accountsRoute);

const usersRoute = require('./controllers/user');
app.use('/users',usersRoute);

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
