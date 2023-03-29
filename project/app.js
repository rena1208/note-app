


////createConnectionで接続するデータベースの情報を格納
// const connection = mysql.createConnection({
//     host: 'localhost / 127.0.0.1',
//     user: 'root',
//     password: 'root',
//     port: 8889,
//     database: 'note-app'
// });

// パッケージ読み込み
// const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const User = require('./models').User;

// const express = require('express')
// const cors = require('cors');
// const app = express()


// mysqlを呼び出す
const mysql = require('mysql');

// ルート設定
//ユーザー登録
// app.get('/register', (request, response) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     return res.render('/register');

// });

//ユーザー登録に使う事前データ
//// 暗号化につかうキー
const appKey = 'YOUR-SECRET-KEY';

// //バリデーション
// // バリデーション・ルール
// const registrationValidationRules = [
//     check('name')
//         .not().isEmpty().withMessage('この項目は必須入力です。'),
//     check('email')
//         .not().isEmpty().withMessage('この項目は必須入力です。')
//         .isEmail().withMessage('有効なメールアドレス形式で指定してください。'),
//     check('password')
//         .not().isEmpty().withMessage('この項目は必須入力です。')
//         .isLength({ min: 8, max: 25 }).withMessage('8文字から25文字にしてください。')
//         .custom((value, { req }) => {

//             if (req.body.password !== req.body.passwordConfirmation) {

//                 throw new Error('パスワード（確認）と一致しません。');

//             }

//             return true;

//         })
// ];

// app.post('/register', registrationValidationRules, (req, res) => {

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) { // バリデーション失敗

//         return res.status(422).json({ errors: errors.array() });

//     }

//     // 送信されたデータ
//     const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;

//     // ユーザーデータを登録（仮登録）
//     User.findOrCreate({
//         where: { email: email },
//         defaults: {
//             name: name,
//             email: email,
//             password: bcrypt.hashSync(password, bcrypt.genSaltSync(8))
//         }
//     }).then(([user]) => {

//         if (user.emailVerifiedAt) { // すでに登録されている時

//             return res.status(422).json({
//                 errors: [
//                     {
//                         value: email,
//                         msg: 'すでに登録されています。',
//                         param: 'email',
//                         location: 'body'
//                     }
//                 ]
//             });

//         }
//     });
// });