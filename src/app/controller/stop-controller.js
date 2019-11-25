const { validationResult } = require('express-validator/check');

const StopDao = require('../infra/stop-dao');
const db = require('../../config/database');

class StopControlador {

    static rotas() {
        return {
            autenticadas: '/stop*',
            lista: '/stop',
            cadastro: '/stop/cadastro',
            edicao: '/stop/:id',
            delecao: '/stop/:id'
        };
    }

    lista() {
        return function(req, resp) {
            const stopDao = new StopDao(db);
            stopDao.lista()
                    .then(stop => {  
                                   resp.send(stop);
                                })
                    .catch(erro => console.log(erro));
        };
    }

    edicao() {
        return function(req, resp) {
            const id = req.params.id;
            const stopDao = new StopDao(db);
    
            stopDao.buscaPorId(id)
                    .then(stop => 
                        resp.status(204).send(stop)
                    )
                    .catch(erro => console.log(erro));
        };
    }

    cadastra() {
        return function(req, resp) {
            console.log('aqui77777');
            console.log(req.body);
            const stopDao = new StopDao(db);
            var pagamento = JSON.parse(req);
            console.log(pagamento);
            const erros = validationResult(req);
    
            if (!erros.isEmpty()) {
                console.log(erros);
                return resp.status(500).send(erro);
            }
    
            stopDao.adiciona(req.body)
                    .then(resp.status(201))
                    .catch(erro => console.log(erro));
        };
    }

    edita() {
        return function(req, resp) {
            console.log(req.body);
            const stopDao = new StopDao(db);
            
            stopDao.atualiza(req.body)
                    .then(resp.redirect(StopControlador.rotas().lista))
                    .catch(erro => console.log(erro));
        };
    }

    remove() {
        return function(req, resp) {
            const id = req.params.id;
    
            const stopDao = new StopDao(db);
            stopDao.remove(id)
                    .then(() => resp.status(200).end())
                    .catch(erro => console.log(erro));
        };
    }
}

module.exports = StopControlador;