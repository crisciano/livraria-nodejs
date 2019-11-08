class LivroDao{
    constructor(db){
        this._db = db;
        this._table = "livros";
    }

    all(){
        return new Promise((resolve, reject)=>{
            var sql = `SELECT * FROM ${this._table}`;
            this._db.all(sql, (err, res)=>{
                if(err) return reject(err);
                return resolve(res);
            });
        })
    }

    get(id){
        return new Promise( (resolve, reject)=>{
            var sql = `SELECT * FROM ${this._table} WHERE id = ${id}`;
            this._db.get(sql, (err, res)=>{
                if(err) return reject(err);
                return resolve(res);
            });
        })
    }

    set(livros = []){
        return new Promise( (resolve, reject)=>{
            var sql = `INSERT INTO ${this._table} 
            (titulo, preco, descricao)
            VALUES (?, ?, ?)`;
            this._db.run(sql, livros, (err, res)=>{
                if(err) return reject(err);
                livros.id = this.lastID;
                return resolve(res);
            });
        })
    }

    alter(livros = []){
        console.log(livros);
        return new Promise( (resolve, reject)=>{
            var sql = `UPDATE ${this._table} SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?`;
            this._db.run(sql, livros, (err, res)=>{
                if(err) return reject(err);
                livros.id = this.lastID;
                return resolve(res);
            });
        })
    }

    delete(id){
        return new Promise( (resolve, reject ) => {
            var sql = `DELETE FROM ${this._table} WHERE id = ${id}`;
            this._db.run(sql, (err, res) =>{
                if(err) return reject(err)
                return resolve(res)
            })
        })
    }
}
module.exports = LivroDao