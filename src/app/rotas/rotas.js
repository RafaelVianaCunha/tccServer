const stopRotas = require('./stop-rotas');
const baseRotas = require('./base-rotas');

module.exports = (app) => {
    baseRotas(app);
    stopRotas(app);
};