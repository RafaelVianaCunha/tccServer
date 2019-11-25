const StopControlador = require('./stop-controller');


class BaseControlador {

    static rotas() {
        return {
            home: '/',
            login: '/login'
        };
    }

    home() {
        return function(req, resp) {
            console.log("home");
            resp.status(500).send("home");
        };
    }

    login() {        
        return function(req, resp) {
            resp.status(500).send("login");
        };
    }

    efetuaLogin() {
        return function(req, resp, next) {
            console.log("efetuaLogin");           
            // Lógica de login.
            const passport = req.passport;            
            passport.authenticate('local', (erro, usuario, info) => {
                if (info) {
                    console.log(info);
                    return next(info);
                }

                if (erro) {
                    return next(erro);
                }

                req.login(usuario, (erro) => {
                    if (erro) {
                        return next(erro);
                    }

                    return resp.redirect(StopControlador.rotas().lista);
                });
            })(req, resp, next);
        };
    }
}

module.exports = BaseControlador;