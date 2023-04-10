// .env読み込み
require('dotenv').config()

// サーバー接続時//パッケージ読み込み
const { check, validationResult } = require('express-validator');
const crypto = require('crypto');
const User = require('./models').User;
const Note = require('./models').Note;
const { send } = require('process');
const express = require('express');
const app = express();
const cors = require('cors')
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');
const authenticate = require('./authenticate');
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
app.use(bodyParser.json());


const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) { // ログインしてるかチェック

        next();

    } else {

        res.redirect(302, '/login');

    }
};

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

//ログイン
app.post('/api/login', (req, res) => {
    // console.log(req.body.email);
    // console.log(req.body.password);
    // return;
    const payload = {

        email: req.body.email,
        password: req.body.password
    };

    const token = jwt.sign(payload, config.jwt.secret, config.jwt.options);

    const body = {
        email: req.body.email,
        token: token,
    };
    // console.log(body);
    res.status(200).json(body);
});

app.get('/api/user', authenticate, async (req, res) => {
    console.log(req.jwtPayload)
    // const bearToken = req.headers['authorization']
    // const bearer = bearToken.split(' ')
    // const token = bearer[1]
    // console.log(req.jwtPayload);
    // return;
    // console.log(res.status(200).json);

    res.status(200).json({

        // message: 'Hello!',
        // authEmail: req.jwtPayload.email,
        user: {
            email: req.jwtPayload.email,
            name: '名前',


        }

    });


});

app.post('/userId/postnote', (req, res) => {
    // 送信されたデータ
    console.log(req.body)
    const title = req.body.title;
    const text = req.body.text;

    // postデータを登録
    Note.create({
        // where: { email: email },
        title: title,
        text: text,
    }
    ).then(() => {
        // console.log(`title: title, text: ${text}`)
        res.json({ message: 'success' })
    });
})

// app.get('/api/user/', (req, res) => {

//     const bearToken = req.headers['authorization']
//     const bearer = bearToken.split(' ')
//     const token = bearer[1]

//     jwt.verify(token, 'secret', (err, user) => {
//         if (err) {
//             return res.sendStatus(403)
//         } else {
//             return res.json({
//                 user
//             });
//         }
//     })
// });

//ログアウト機能
app.post('api/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/')
    })
})

app.listen(3000, () => console.log('Listening on port 3000...'));


