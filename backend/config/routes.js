const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        // .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/users/:id')
        // .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/clientes')
        .get(app.api.cliente.get)
        .post(app.api.cliente.save)

    app.route('/clientes/:id')
        .put(app.api.cliente.save)
        .delete(app.api.cliente.remove)
        .get(app.api.cliente.getById)

    app.route('/clientes/nome/:nome')
        .get(app.api.cliente.getByName)

    app.route('/vendedores')
        .get(app.api.vendedor.get)
        .post(app.api.vendedor.save)

    app.route('/vendedores/:id')
        .put(app.api.vendedor.save)
        .get(app.api.vendedor.getById)
        .delete(app.api.vendedor.remove)

    app.route('/vendas')
        .get(app.api.venda.get)
        .post(app.api.venda.save)

    app.route('/vendas/:id')
        .get(app.api.venda.getById)
        .post(app.api.venda.save)

    app.route('/ultimaVenda')
        .get(app.api.venda.getLast)

    app.route('/pagamentosVendas')
        .get(app.api.pagamentosVendas.get)
        .post(app.api.pagamentosVendas.save)
}