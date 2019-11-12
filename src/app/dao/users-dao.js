class UserDao{
  constructor(db){
      this._db = db;
      this._table = "users";
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

  set(users = []){

    console.log(users);
      return new Promise( (resolve, reject)=>{
          var sql = `INSERT INTO ${this._table} 
          (login, email, password)
          VALUES (?, ?, ?)`;
          this._db.run(sql, users, (err, res)=>{
              if(err) return reject(err);
              users.id = this.lastID;
              return resolve(res);
          });
      })
  }

  alter(users = []){
      return new Promise( (resolve, reject)=>{
          var sql = `UPDATE ${this._table} SET
              login = ?,
              email = ?,
              password = ?
              WHERE id = ?`;
          this._db.run(sql, users, (err, res)=>{
              if(err) return reject(err);
              users.id = this.lastID;
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
module.exports = UserDao