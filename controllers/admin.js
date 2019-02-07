const Book = require('../model/book');

exports.getAddBook = (req, res, next) => {
    res.render('admin/add-book', {
        pageTitle: 'Add New Book',
        path: '/admin/add-book',
        editMode: false
    });
};

exports.postAddBook = (req, res, next) => {
    const name = req.body.name;
    const author = req.body.authorName;
    const year = req.body.year;
    const description = req.body.description;

    const book = new Book({
        name: name,
        author: author,
        year: year,
        description: description
    })

    book
        .save()
        .then(result => {
            res.redirect('/admin/products');
        }) 
        .catch(err => {
            console.log(err);
        });
    
};

exports.getEditBook = (req, res, next) => {
    const editMode = req.query.edit;
   
    if (!editMode) {
       return res.redirect('/');
    }

    Book.findById(req.params.id)
    .then( book => {

        if (!book) {
            res.redirect('/');
        }

        res.render('admin/add-book', {
            product: book,
            pageTitle: 'Edit Book',
            path: '/admin/edit-book',
            editMode: req.query.edit,
            
        });   
    })
    .catch(err => console.log(err))
   
};

exports.postEditBook = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const author = req.body.authorName;
    const year = req.body.year;
    const desc = req.body.description;

    Book
        .findById(id)
        .then(book => {
            book.name = name;
            book.author = author;
            book.year = year;
            book.description = desc;

            return book.save();
        })
        .then(result => {
            console.log('Book has been updated!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Book.find()
    .then(books => {
        res.render('admin/products', {
            prods: books, 
            pageTitle: 'Admin Products', 
            path: '/admin/products'
        });
    })
    .catch(err => console.log(err));
};

exports.postDeleteBook = (req, res, next) => {
    const id = req.body.id;

    Book.findByIdAndRemove(id)
    .then(() => {
        console.log('Book has been deleted!');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};