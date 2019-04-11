class LivroDao{
    constructor(db){
        this._db = db;
    }

    lista(){
        return new Promise((resolve, reject)=>{
            var sql = 'SELECT * FROM livros';
            this._db.all(sql, (err, res)=>{
                if(err) return reject(err);
                return resolve(res);
            });
        })
    }
}
module.exports = LivroDao