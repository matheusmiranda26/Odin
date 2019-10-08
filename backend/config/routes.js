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

    app.route('/quantidadeClientes')
        .get(app.api.cliente.getQuantidade)

    app.route('/vendedores')
        .get(app.api.vendedor.get)
        .post(app.api.vendedor.save)

    app.route('/vendedores/:id')
        .put(app.api.vendedor.save)
        .get(app.api.vendedor.getById)
        .delete(app.api.vendedor.remove)

    app.route('/vendedores/nome/:nome')
        .get(app.api.vendedor.getByName)

    app.route('/vendas')
        .get(app.api.venda.get)
        .post(app.api.venda.save)

    app.route('/vendaPorDia')
        .get(app.api.venda.getVendaPorDia)

    app.route('/quantidadeVendaMes')
        .get(app.api.venda.getQuantidadeVendasNoMes)

    app.route('/vendaPorCliente/:id')
        .get(app.api.venda.getPorCliente)

    app.route('/vendas/:id')
        .get(app.api.venda.getById)
        .put(app.api.venda.save)
        .delete(app.api.venda.remove)

    app.route('/vendasPeriodo/:data')
        .get(app.api.venda.getPeriodo)


    app.route('/quantidadeVendas')
        .get(app.api.venda.getQuantidade)

    app.route('/ultimaVenda')
        .get(app.api.venda.getLast)

    app.route('/pagamentosVendas')
        .get(app.api.pagamentosVendas.get)

    app.route('/pagamentosVendas/:id')
        .get(app.api.pagamentosVendas.getById)
        .put(app.api.pagamentosVendas.save)

    app.route('/pagamentosVendas/vendas/:id')
        .get(app.api.pagamentosVendas.getById)
        .post(app.api.pagamentosVendas.save)

    app.route('/transportadoras')
        .get(app.api.transportadora.get)
        .post(app.api.transportadora.save)

    app.route('/transportadoras/:id')
        .get(app.api.transportadora.getById)
        .put(app.api.transportadora.save)
        .delete(app.api.transportadora.remove)

    app.route('/transportadoras/nome/:nome')
        .get(app.api.transportadora.getByName)

    app.route('/fornecedores')
        .get(app.api.fornecedor.get)
        .post(app.api.fornecedor.save)

    app.route('/fornecedoresNome')
        .get(app.api.fornecedor.getFornecedor)

    app.route('/fornecedores/:id')
        .get(app.api.fornecedor.getById)
        .put(app.api.fornecedor.save)
        .delete(app.api.fornecedor.remove)

    app.route('/fornecedores/nome/:nome')
        .get(app.api.fornecedor.getByName)

    app.route('/insumos')
        .get(app.api.insumo.get)
        .post(app.api.insumo.save)

    app.route('/insumos/:id')
        .get(app.api.insumo.getById)
        .post(app.api.insumo.save)

    app.route('/insumosAcabando')
        .get(app.api.insumo.getInsumoAcabando)

    app.route('/insumosHistorico')
        .get(app.api.insumoHistorico.get)
        //.post(app.api.insumo.updateEntradaSaida)
        .post(app.api.insumoHistorico.save)

    app.route('/insumosHistorico/:id')
        .get(app.api.insumoHistorico.getById)
        .post(app.api.insumoHistorico.save)

    app.route('/insumosFornecedor/:id')
        .get(app.api.insumo.getPorFornecedor)
        .post(app.api.insumo.save)

    app.route('/insumo/nome/:nome')
        .get(app.api.insumo.getByName)

    app.route('/quantidadeDespesas')
        .get(app.api.despesa.getQuantidade)

    app.route('/despesas')
        .get(app.api.despesa.get)
}