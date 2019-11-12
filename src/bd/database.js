const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('./src/bd/data.db');

const USUARIOS_SCHEMA = `
    CREATE TABLE IF NOT EXISTS users  (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        login VARCHAR(40) NOT NULL UNIQUE, 
        email VARCHAR(255) NOT NULL, 
        password VARCHAR(255) NOT NULL
    )
`;

const INSERIR_USUARIO_1 = 
`
    INSERT INTO users ( login, email, password ) 
    SELECT 'Crisciano S. Botelho', 'crisciano.botelho@compasso.com.br', '123' WHERE NOT EXISTS 
    (SELECT * FROM users WHERE email = 'crisciano.compasso@compasso.com.br')
`;

const LIVROS_SCHEMA = 
`
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL, 
        price REAL NOT NULL,
        description TEXT DEFAULT ('') NOT NULL )
`;

const INSERIR_LIVRO_1 = 
`
    INSERT INTO books ( title, price, description ) 
    SELECT 'Node na prática', 30.0, 'Como desenvolver com Node.' 
    WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'Node na prática')
`;

const INSERIR_LIVRO_2 = 
`
    INSERT INTO books ( title, price, description) 
    SELECT 'JavaScript na prática', 40.0, 'Como desenvolver com JavaScript.' 
    WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'JavaScript na prática')
`;

bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
    bd.run(USUARIOS_SCHEMA);
    bd.run(LIVROS_SCHEMA);
    // bd.run(INSERIR_USUARIO_1);
    bd.run(INSERIR_LIVRO_1);
    bd.run(INSERIR_LIVRO_2);

    // bd.each("SELECT * FROM usuarios", (err, usuario) => {
    //     console.log('Usuario: ');
    //     console.log(usuario);
    // });
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;