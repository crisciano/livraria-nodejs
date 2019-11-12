const db = require('../../bd/database');
const BookDao = require('../dao/books-dao');
const UserDao = require('../dao/users-dao');

module.exports = (app) => {

    /** get */
    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/home/home.marko'))
    });
    
    app.get('/books', function(req, resp) {

        var bookDao = new BookDao(db);

        bookDao.all()
            .then( books =>{
                var data = {books: books};
                resp.marko(  require('../views/books/list/lista.marko'), data);
            })
            .catch(err=> console.log(err))
    });

    app.get('/books/form', (req, resp)=>{
        resp.marko(
            require('../views/books/form/form.marko'),
            {book: {}})
    })

    app.get('/books/form/:id', (req, resp)=>{
        let id = req.params.id;

        var bookDao = new BookDao(db);

        bookDao.get(id)
            .then(res=> {
                console.log(res); 
                // resp.status(200).end() 
                resp.marko(
                    require('../views/books/form/form.marko'),
                    { book: res }
                )
            })
            .catch(err => console.log(err))

    })

    app.get('/users', function(req, resp) {

        var usersDao = new UserDao(db);

        usersDao.all()
            .then( users =>{
                var data = {users: users};
                resp.marko(  require('../views/users/list/lista.marko'), data);
            })
            .catch(err=> console.log(err))
    });

    app.get('/users/form', (req, resp)=>{
        resp.marko(
            require('../views/users/form/form.marko'),
            {user: {}})
    })

    app.get('/users/form/:id', (req, resp)=>{
        let id = req.params.id;

        var usersDao = new UserDao(db);

        usersDao.get(id)
            .then(res=> {
                console.log(res); 
                // resp.status(200).end() 
                resp.marko(
                    require('../views/users/form/form.marko'),
                    { user: res }
                )
            })
            .catch(err => console.log(err))

    })


    /** delete */
    app.delete('/books/:id', (req, resp, err ) => {

        let id = req.params.id;

        var bookDao = new BookDao(db);

        bookDao.delete(id)
            .then(res=> {
                console.log(res); 
                resp.status(200).end() 
            })
            .catch(err => console.log(err))

    })

    app.delete('/users/:id', (req, resp, err ) => {

        let id = req.params.id;

        var usersDao = new UserDao(db);

        usersDao.delete(id)
            .then(res=> {
                console.log(res); 
                resp.status(200).end() 
            })
            .catch(err => console.log(err))

    })
    

    /** post */
    app.post('/books', function(req, resp) {

        var bookDao = new BookDao(db);

        var books = req.body;

        /** transforma obj em array */
        books = Object.values(books);

        bookDao.set(books)
            .then(res => resp.redirect('/books'))
            .catch(err=> console.log(err))
    });

    app.post('/users', function(req, resp) {

        var usersDao = new UserDao(db);

        var users = req.body;

        /** transforma obj em array */
        users = Object.values(users);

        usersDao.set(users)
            .then(res => resp.redirect('/users'))
            .catch(err=> console.log(err))
    });

    /** put */
    app.put('/books', function(req, resp) {

        var bookDao = new BookDao(db);

        var books = req.body;

        books = [
            books.title,
            books.price,
            books.description,
            books.id
        ]

        console.log(books);

        bookDao.alter(books)
            .then(res => resp.redirect('/books'))
            .catch(err=> console.log(err))
    });

    app.put('/users', function(req, resp) {

        var usersDao = new UserDao(db);

        var users = req.body;

        users = [
            users.login,
            users.email,
            users.password,
            users.id
        ]

        usersDao.alter(users)
            .then(res => resp.redirect('/users'))
            .catch(err=> console.log(err))
    });
    
};