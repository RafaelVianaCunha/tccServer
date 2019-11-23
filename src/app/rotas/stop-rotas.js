const StopControlador = require('../controladores/stop-controlador');
const stopControlador = new StopControlador();

const Stop = require('../modelos/stop');

const BaseControlador = require('../controladores/base-controlador');

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
        .get(stopControlador.formularioCadastro())
        .post(Stop.validacoes(), stopControlador.cadastra())
        .put(stopControlador.edita());

    app.get(rotasStop.edicao, stopControlador.formularioEdicao());

    app.delete(rotasStop.delecao, stopControlador.remove());
};