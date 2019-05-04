const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')

app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api/auth.js')
    .then('./api/user.js')
    .then('./api/cliente.js')
    .then('./api/vendedor.js')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)

app.listen(4000, () => {
    console.log('Backend executando...')
})