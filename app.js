const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const adminRoutes = require('./routes/admin');
const storeRoutes = require('./routes/store');
const Book = require('./model/book');
const Author = require('./model/author');

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(storeRoutes);
app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'Page Not Found!',
        path: 'no path'
    }); 
});

mongoose
    .connect(
        'mongodb+srv://Dmytryk:tNSWgFk5t36ZBmR@cluster0-mzr98.mongodb.net/bookstore?retryWrites=true'
    )
    .then(result => {
        app.listen(3001);
    })
    .catch(err => {
        console.log(err);
    })