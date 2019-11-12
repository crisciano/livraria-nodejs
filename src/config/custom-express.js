require('marko/node-require').install();
require('marko/express');

const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.use('/public', express.static('src/app/public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}))

const rotas = require('../app/rotas/rotas');
rotas(app);

app.use( (req, resp, next) => {
  resp.status(404).marko(
    require('../app/views/notFound/notFound.marko')
  )
})

app.use( function (erro, req, resp, next) {

  console.log(erro);
  resp.status(500).marko(
    require('../app/views/badRequest/badRequest.marko')
  )
})

module.exports = app;