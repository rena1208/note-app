// サーバー接続時
const express = require('express')
const app = express()
app.get('/', function (req, res) {
    res.send('hello')
})
app.listen(5000, function () {
    console.log('Example app listening on port http://localhost:5000!')
})

// // パッケージ読み込み
// const { check, validationResult } = require('express-validator');
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const User = require('./models').User;

// const express = require('express')
// const app = express()

// // ミドルウェアの設定
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));