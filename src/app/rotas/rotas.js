const db = require('../../bd/database');
const LivrosDao = require('../dao/livros-dao');
const UsuarioDao = require('../dao/users-dao');

module.exports = (app) => {

    /** get */
    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/home/home.marko'))
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

    app.get('/usuarios', function(req, resp) {

        var usuariosDao = new UsuarioDao(db);

        usuariosDao.all()
            .then( usuarios =>{
                var data = {usuarios: usuarios};
                resp.marko(  require('../views/usuarios/lista/lista.marko'), data);
            })
            .catch(err=> console.log(err))
    });

    app.get('/usuarios/form', (req, resp)=>{
        resp.marko(
            require('../views/usuarios/form/form.marko'),
            {usuario: {}})
    })

    app.get('/usuarios/form/:id', (req, resp)=>{
        let id = req.params.id;

        var usuariosDao = new UsuarioDao(db);

        usuariosDao.get(id)
            .then(res=> {
                console.log(res); 
                // resp.status(200).end() 
                resp.marko(
                    require('../views/usuarios/form/form.marko'),
                    { usuario: res }
                )
            })
            .catch(err => console.log(err))

    })


    /** delete */
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

    app.delete('/usuarios/:id', (req, resp, err ) => {

        let id = req.params.id;

        var usuariosDao = new UsuarioDao(db);

        usuariosDao.delete(id)
            .then(res=> {
                console.log(res); 
                resp.status(200).end() 
            })
            .catch(err => console.log(err))

    })
    

    /** post */
    app.post('/livros', function(req, resp) {

        var livroDao = new LivrosDao(db);

        var livros = req.body;

        /** transforma obj em array */
        livros = Object.values(livros);

        livroDao.set(livros)
            .then(res => resp.redirect('/livros'))
            .catch(err=> console.log(err))
    });

    app.post('/usuarios', function(req, resp) {

        var usuariosDao = new UsuarioDao(db);

        var usuarios = req.body;

        /** transforma obj em array */
        usuarios = Object.values(usuarios);

        usuariosDao.set(usuarios)
            .then(res => resp.redirect('/usurios'))
            .catch(err=> console.log(err))
    });

    /** put */
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

    app.put('/usuarios', function(req, resp) {

        var usuariosDao = new UsuarioDao(db);

        var usuarios = req.body;

        usuarios = [
            usuarios.nome_completo,
            usuarios.email,
            usuarios.senha,
            usuarios.id
        ]

        usuariosDao.alter(usuarios)
            .then(res => resp.redirect('/usuarios'))
            .catch(err=> console.log(err))
    });
    
};