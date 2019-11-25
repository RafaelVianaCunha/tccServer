const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nome_completo VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL, 
    senha VARCHAR(255) NOT NULL
)
`;

const INSERIR_USUARIO_1 = 
`
INSERT INTO usuarios (
    nome_completo, 
    email,
    senha
) SELECT 'Rafael Cunha', 'rafael@outlook.com', '123' WHERE NOT EXISTS (SELECT * FROM usuarios WHERE email = 'rafael@outlook.com')
`;

const STOP_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS stop (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    exchangeId TEXT NOT NULL, 
    usuarioId  INTEGER NOT NULL,
    coinId  INTEGER NOT NULL,
    stop INTEGER NOT NULL,
    lim INTEGER NOT NULL    
)
`;

const INSERIR_STOP_1 = 
`
INSERT INTO STOP (
    exchangeId,
    usuarioId,
    coinId,
    stop,
    lim
) SELECT 1,1,1,8000,7500 WHERE NOT EXISTS (SELECT * FROM STOP WHERE id = 1)
`;

const EXCHANGE_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS EXCHANGE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, 
    url  TEXT 
)
`;

const INSERIR_EXCHANGE_1 = 
`
INSERT INTO EXCHANGE (
    name,
    url    
) SELECT 'bitfinex','https://www.bitfinex.com' WHERE NOT EXISTS (SELECT * FROM EXCHANGE WHERE name = 'bitfinex')
`;

const INSERIR_EXCHANGE_2 = 
`
INSERT INTO EXCHANGE (
    name,
    url    
) SELECT 'binance','https://www.binance.com/' WHERE NOT EXISTS (SELECT * FROM EXCHANGE WHERE name = 'binance')
`;

bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(USUARIOS_SCHEMA);
    bd.run(INSERIR_USUARIO_1);
    bd.run(STOP_SCHEMA);
    bd.run(INSERIR_STOP_1);
    bd.run(EXCHANGE_SCHEMA);
    bd.run(INSERIR_EXCHANGE_1);
    bd.run(INSERIR_EXCHANGE_2);

    bd.each("SELECT * FROM usuarios", (err, usuario) => {
        console.log('Usuario: ');
        console.log(usuario);
    });

    // bd.each("SELECT * FROM EXCHANGE", (err, EXCHANGE) => {
    //     console.log('EXCHANGE: ');
    //     console.log(EXCHANGE);
    // });
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;