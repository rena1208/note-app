// .env読み込み
require('dotenv').config()

// サーバー接続時//パッケージ読み込み
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const User = require('./models').User;
const { send } = require('process');
const express = require('express');
const app = express();
const cors = require('cors')
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const passport = require('./auth');

app.get('/', function (req, res) {
    res.send('hello')
})
app.listen(5000, function () {
    console.log('Example app listening on port http://localhost:5000!')
})














// ミドルウェアの設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(flash());
app.use(session({
    secret: 'YOUR-SECRET-STRING',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) { // ログインしてるかチェック

        next();

    } else {

        res.redirect(302, '/login');

    }
};




// app.get('/register', (request, response) => {
//     // res.setHeader("Access-Control-Allow-Origin", "*");
//     return response.json(200);

// });



//バリデーション
// バリデーション・ルール
const registrationValidationRules = [
    check('name')
        .not().isEmpty().withMessage('この項目は必須入力です。'),
    check('email')
        .not().isEmpty().withMessage('この項目は必須入力です。')
        .isEmail().withMessage('有効なメールアドレス形式で指定してください。'),
    check('password')
        .not().isEmpty().withMessage('この項目は必須入力です。')
        .isLength({ min: 8, max: 25 }).withMessage('8文字から25文字にしてください。')
        .custom((value, { req }) => {

            if (req.password !== req.passwordConfirmation) {

                throw new Error('パスワード（確認）と一致しません。');

            }

            return true;

        })
];


app.post('/register', registrationValidationRules, (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) { // バリデーション失敗

        return res.status(422).json({ errors: errors.array() });

    }

    // 送信されたデータ
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // ユーザーデータを登録
    User.create({
        // where: { email: email },
        name: name,
        email: email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(8))
    }
    ).then((aaa) => {

        // if (user.email) { // すでに登録されている時

        //     return res.status(422).json({
        //         errors: [
        //             {
        //                 value: email,
        //                 msg: 'すでに登録されています。',
        //                 param: 'email',
        //                 location: 'body'
        //             }
        //         ]
        //     });

        // }
    });
});


// //ログイン
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
// }, (email, password, done) => {

//     User.findOne({
//         where: {
//             email: email
//         }
//     })
//         .then(user => {

//             if (user && bcrypt.compareSync(password, user.password)) {

//                 return done(null, user);  // ログイン成功

//             }

//             throw new Error();

//         })
//         .catch(error => { // エラー処理

//             return done(null, false, { message: '認証情報と一致するレコードがありません。' });

//         });

// }));

// // Session
// passport.serializeUser((user, done) => {

//     done(null, user);

// });
// passport.deserializeUser((user, done) => {

//     done(null, user);

// });

// module.exports = passport;

// // ログインフォーム
// app.get('/login', (req, res) => {
//     const errorMessage = req.flash('error').join('<br>');
//     res.render('login/form', {
//         errorMessage: errorMessage
//     });
// });

// // ログイン実行
// app.post('/login',
//     passport.authenticate('local', {
//         successRedirect: '/user',
//         failureRedirect: '/login',
//         failureFlash: true,
//         badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。'
//     })
// );

// // ログイン成功後のページ
// app.get('/user', authMiddleware, (req, res) => {
//     const user = req.user;
//     res.send('ログイン完了！');
// });

//// パッケージ読み込み
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