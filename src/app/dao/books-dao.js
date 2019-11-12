class BookDao{
    constructor(db){
        this._db = db;
        this._table = "books";
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

    set(books = []){
        return new Promise( (resolve, reject)=>{
            var sql = `INSERT INTO ${this._table} 
            (title, price, description)
            VALUES (?, ?, ?)`;
            this._db.run(sql, books, (err, res)=>{
                if(err) return reject(err);
                books.id = this.lastID;
                return resolve(res);
            });
        })
    }

    alter(books = []){
        console.log(books);
        return new Promise( (resolve, reject)=>{
            var sql = `UPDATE ${this._table} SET
                title = ?,
                price = ?,
                description = ?
                WHERE id = ?`;
            this._db.run(sql, books, (err, res)=>{
                if(err) return reject(err);
                books.id = this.lastID;
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
module.exports = BookDao