const StopControlador = require('../controller/stop-controller');
const stopControlador = new StopControlador();

const Stop = require('../modelos/stop');

const BaseControlador = require('../controller/base-controller');

module.exports = (app) => {
    const rotasStop = StopControlador.rotas();
    
    // app.use(rotasStop.autenticadas, function(req, resp, next) {
    //     if (req.isAuthenticated()) {
    //         next();
    //     } else {
    //         resp.redirect(BaseControlador.rotas().login);
    //     }
    // });

    app.get(rotasStop.lista, stopControlador.lista());

    app.route(rotasStop.cadastro)
        .post(Stop.validacoes(), stopControlador.cadastra())
        .put(stopControlador.edita());

    app.get(rotasStop.edicao, stopControlador.edicao());

    app.delete(rotasStop.delecao, stopControlador.remove());
};