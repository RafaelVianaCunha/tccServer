class StopDao {

    constructor(db) {
        this._db = db;
    }

    adiciona(stop) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO stop (
                    titulo, 
                    preco,
                    descricao
                ) values (?,?,?)
                `,
                [
                    stop.titulo,
                    stop.preco,
                    stop.descricao
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Não foi possível adicionar o stop!');
                    }

                    resolve();
                }
            )
        });
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM stop',
                (erro, resultados) => {
                    if (erro) return reject('Não foi possível listar os stop!');

                    return resolve(resultados);
                }
            )
        });
    }

    buscaPorId(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM stop
                    WHERE id = ?
                `,
                [id],
                (erro, stop) => {
                    if (erro) {
                        return reject('Não foi possível encontrar o stop!');
                    }
                    return resolve(stop);
                }
            );
        });
    }

    atualiza(stop) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE stop SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                stop.titulo,
                stop.preco,
                stop.descricao,
                stop.id
            ],
            erro => {
                if (erro) {
                    return reject('Não foi possível atualizar o stop!');
                }

                resolve();
            });
        });
    }

    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM stop
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o stop!');
                    }
                    return resolve();
                }
            );
        });
    }
}

module.exports = StopDao;