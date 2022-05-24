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

/*
const productsRoute = require('./controllers/products');
app.use('/products',productsRoute);
*/

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
