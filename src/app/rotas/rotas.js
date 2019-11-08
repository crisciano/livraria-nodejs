const db = require('../../bd/database');
const LivrosDao = require('../dao/livros-dao');

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Casa do Código </h1>
                    </body>
                </html>
            `
        );
    });
    
    app.get('/livros', function(req, resp) {

        var livroDao = new LivrosDao(db);

        livroDao.all()
            .then( livros =>{
                var data = {livros: livros};
                resp.marko(  require('../views/livros/lista/lista.marko'), data);
            })
            .catch(err=> console.log(err))
    });

    app.delete('/livros/:id', (req, resp, err ) => {

        let id = req.params.id;

        var livroDao = new LivrosDao(db);

        livroDao.delete(id)
            .then(res=> {
                console.log(res); 
                resp.status(200).end() 
            })
            .catch(err => console.log(err))

    })
    
    app.post('/livros', function(req, resp) {

        var livroDao = new LivrosDao(db);

        var livros = req.body;

        /** transforma obj em array */
        livros = Object.values(livros);

        livroDao.set(livros)
            .then(res => resp.redirect('/livros'))
            .catch(err=> console.log(err))
    });

    app.put('/livros', function(req, resp) {

        var livroDao = new LivrosDao(db);

        var livros = req.body;

        livros = [
            livros.titulo,
            livros.preco,
            livros.descricao,
            livros.id
        ]

        console.log(livros);

        livroDao.alter(livros)
            .then(res => resp.redirect('/livros'))
            .catch(err=> console.log(err))
    });
    
    app.get('/livros/form', (req, resp)=>{
        resp.marko(
            require('../views/livros/form/form.marko'),
            {livro: {}})
    })

    app.get('/livros/form/:id', (req, resp)=>{
        let id = req.params.id;

        var livroDao = new LivrosDao(db);

        livroDao.get(id)
            .then(res=> {
                console.log(res); 
                // resp.status(200).end() 
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: res }
                )
            })
            .catch(err => console.log(err))

    })

};