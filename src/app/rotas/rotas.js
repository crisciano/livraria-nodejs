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

    app.post('/livros/add', (req, resp)=>{
        // console.log(req.body);
        resp.json(req.body);
        var livroDao = new LivrosDao(db);

        var livros = req.body;
        /** transforma obj em array */
        livros = Object.values(livros);
        // console.log(livros);

        livroDao.set(livros)
            .then(res=> console.log(res))
            .catch(err=> console.log(err))
    })
};