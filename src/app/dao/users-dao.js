class UsuarioDao{
  constructor(db){
      this._db = db;
      this._table = "usuarios";
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

  set(usuarios = []){

    console.log(usuarios);
      return new Promise( (resolve, reject)=>{
          var sql = `INSERT INTO ${this._table} 
          (nome_completo, email, senha)
          VALUES (?, ?, ?)`;
          this._db.run(sql, usuarios, (err, res)=>{
              if(err) return reject(err);
              usuarios.id = this.lastID;
              return resolve(res);
          });
      })
  }

  alter(usuarios = []){
      return new Promise( (resolve, reject)=>{
          var sql = `UPDATE ${this._table} SET
              nome_completo = ?,
              email = ?,
              senha = ?
              WHERE id = ?`;
          this._db.run(sql, usuarios, (err, res)=>{
              if(err) return reject(err);
              usuarios.id = this.lastID;
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
module.exports = UsuarioDao