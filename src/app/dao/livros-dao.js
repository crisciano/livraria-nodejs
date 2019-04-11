class LivroDao{
    constructor(db){
        this._db = db;
    }

    all(){
        return new Promise((resolve, reject)=>{
            var sql = 'SELECT * FROM livros';
            this._db.all(sql, (err, res)=>{
                if(err) return reject(err);
                return resolve(res);
            });
        })
    }
    get(id){
        return new Promise( (resolve, reject)=>{
            var sql = `SELECT * FROM livros WHERE id = ${id}`;
            this._db.get(sql, (err, res)=>{
                if(err) return reject(err);
                return resolve(res);
            });
        })
    }

    set(livros = []){
        return new Promise( (resolve, reject)=>{
            var sql = `INSERT INTO ${table} 
            (titulo, preco, descricao )
            VALUES (?, ?, ?)`;
            this._db.run(sql, livros, (err, res)=>{
                if(err) return reject(err);
                livros.id = this.lastID;
                return resolve(res);
            });
        })
    }
}
module.exports = LivroDao