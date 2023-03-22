// サーバー接続時
const express = require('express')
const app = express()
app.get('/', function (req, res) {
    res.send('hello')
})
app.listen(5000, function () {
    console.log('Example app listening on port http://localhost:5000!')
})