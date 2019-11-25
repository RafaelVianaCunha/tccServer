const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use('/estatico', express.static('src/app/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride(function (req, resp) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}));

const sessaoAutenticacao = require('./sessao-autenticacao');
sessaoAutenticacao(app);

const rotas = require('../app/rotas/rotas');
rotas(app);

app.use(function (req, resp, next) {
    return resp.status(404).send(
        "Erro 404: " + erro.mensagem
    );
});

app.use(function (erro, req, resp, next) {
    return resp.status(500).send(
        "Erro 500: " + erro.mensagem
    );
});

module.exports = app;