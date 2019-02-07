const Book = require('../model/book');

exports.getStore = (req, res, next) => {
    Book.find()
    .then(books => {
        res.render('store/store', {
            prods: books, 
            pageTitle: 'Cart', 
            path: '/',
            pageTitle: 'Your Cart'
            });
        })
    .catch(err => {
        console.log(err);
    });
};

exports.getDetails = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    Book
        .findById(id)
        .then(book => {
            console.log(book);
            res.render('store/book-details', { 
                book: book, 
                pageTitle: book.name, 
                path: ''
            });   
        })
        .catch(err => {
            console.log(err);
        })
}