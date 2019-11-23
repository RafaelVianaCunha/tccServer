const { check } = require('express-validator/check');

class Stop {
    static validacoes() {
        return [
            check('exchange').isLength({ min: 1 }).withMessage('A exchange não pode ser vazia'),
            check('stop').isAlphanumeric().withMessage('O stop precisa ter um valor'),
            check('limit').isAlphanumeric().withMessage('O limit precisa ter um valor')
        ];
    }
}

module.exports = Stop;