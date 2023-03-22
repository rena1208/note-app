// mysqlを呼び出す
const mysql = require('mysql');

//createConnectionで接続するデータベースの情報を格納
const connection = mysql.createConnection({
    host: 'localhost / 127.0.0.1',
    user: 'root',
    password: 'root',
    port: 8889,
    database: 'note-app'
});

// .env設定
require('dotenv').config()
const express = require('express');
const app = express();

// ルート設定
//ユーザー登録
app.get('/register', (request, response) => {

    return res.render('/register');

});

