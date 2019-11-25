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


const COIN_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS coin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, 
    main  TEXT NOT NULL,
    secondary  TEXT  
)
`;

const INSERIR_COIN_1 = 
`
INSERT INTO coin (
    name, 
    main,
    secondary
) SELECT 'BTCLTC', 'BTC', 'LTC' WHERE NOT EXISTS (SELECT * FROM coin WHERE name = 'BTCLTC')
`;

const INSERIR_COIN_2 = 
`
INSERT INTO coin (
    name, 
    main,
    secondary
) SELECT 'BTCZEC', 'BTC', 'ZEC' WHERE NOT EXISTS (SELECT * FROM coin WHERE name = 'BTCLTC')
`;

const INSERIR_COIN_3 = 
`
INSERT INTO coin (
    name, 
    main,
    secondary
) SELECT 'LTCUSDT', 'LTC', 'USDT' WHERE NOT EXISTS (SELECT * FROM coin WHERE name = 'LTCUSDT')
`;

const INSERIR_COIN_4 = 
`
INSERT INTO coin (
    name, 
    main,
    secondary
) SELECT 'BTCUSDT', 'BTC', 'USDT' WHERE NOT EXISTS (SELECT * FROM coin WHERE name = 'BTCUSDT')
`;

const EXCHANGE_COIN_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS EXCHANGE_COIN (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    coinId TEXT NOT NULL, 
    exchangeId  TEXT NOT NULL,
    coinExchange  TEXT NOT NULL 
)
`;

const INSERIR_EXCHANGE_COIN_1 = 
`
INSERT INTO EXCHANGE_COIN (
    coinId, 
    exchangeId,
    coinExchange
) SELECT 1, 1, 'BTCLTC' WHERE NOT EXISTS (SELECT * FROM EXCHANGE_COIN WHERE coinExchange = 'BTCLTC' and exchangeId = 1 ) 
`;

const INSERIR_EXCHANGE_COIN_2 = 
`
INSERT INTO EXCHANGE_COIN (
    coinId, 
    exchangeId,
    coinExchange
) SELECT 4, 1, 'BTCUSD' WHERE NOT EXISTS (SELECT * FROM EXCHANGE_COIN WHERE coinExchange = 'BTCUSDT' and exchangeId = 1 ) 
`;

const INSERIR_EXCHANGE_COIN_3 = 
`
INSERT INTO EXCHANGE_COIN (
    coinId, 
    exchangeId,
    coinExchange
) SELECT 4, 2, 'BTCUSDT' WHERE NOT EXISTS (SELECT * FROM EXCHANGE_COIN WHERE coinExchange = 'BTCUSDT' and exchangeId = 2 ) 
`;

const EXCHANGE_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS EXCHANGE (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL, 
    url  TEXT 
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
    bd.run(COIN_SCHEMA);
    bd.run(EXCHANGE_COIN_SCHEMA);
    bd.run(INSERIR_COIN_1);
    bd.run(INSERIR_COIN_2);
    bd.run(INSERIR_COIN_3);
    bd.run(INSERIR_COIN_4);
    bd.run(INSERIR_EXCHANGE_COIN_1);
    bd.run(INSERIR_EXCHANGE_COIN_2);
    bd.run(INSERIR_EXCHANGE_COIN_3);

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