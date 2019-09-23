const queries = require('./queries')
const pagamentos = require('./pagamentosVendas')
//import moment from "moment";
module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        // alert('aqui')
        const venda = {
            ...req.body
        }
        if (req.params.id) venda.id = req.params.id

        try {
            existsOrError(venda.valor, 'Valor total não informado')
            existsOrError(venda.data, 'Data não informado')
            existsOrError(venda.quantidade, 'Quantidade total não informada')
            existsOrError(venda.idCliente, 'Cliente não informado')
            existsOrError(venda.formaPagamento, 'Forma de Pagamento não informado')
            existsOrError(venda.condicaoPagamento, 'Condição de Pagamento não informada.')
            existsOrError(venda.numeroPedido, 'Pedido não informado.')
            existsOrError(venda.idTransportadora, 'Transportadora não informada.')
            existsOrError(venda.valorTotal, 'Valor Total não informado.')
            existsOrError(venda.desconto, 'Desconto não informado.')

        } catch (msg) {
            res.status(400).send(msg)
        }
        // console.log(venda.pagamentosVendas)
        let pagamentos = {
            ...venda.pagamentosVendas,
        }

        delete venda.pagamentosVendas
        if (venda.id) {
            app.db('vendas')
                .update(venda)
                .where({
                    id: venda.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('vendas')
                .returning('id')
                .insert(venda)
                .then(function (response) {
                    app.api.pagamentosVendas.savePagamentos(response[0], pagamentos)
                }).then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }


    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('vendas')
                .update({
                    deletedAt: new Date()
                })
                .where({
                    id: req.params.id
                })

            try {
                existsOrError(rowsDeleted, 'Venda não foi encontrada.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    // const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        // const result = await app.db('vendas').count('id').first()
        // const count = parseInt(result.count)
        app.db('vendas')
            .join('clientes', 'vendas.idCliente', '=', 'clientes.id').select('vendas.*', 'clientes.nome as nomeCliente')
            .whereNull('vendas.deletedAt')
            .then(vendas => {
                res.json(vendas) //.then(v => vendatotal = v)
                // vendatotal = "2"
            })
            .catch(err => res.status(500).send(err))
    }

    const getLast = async (req, res) => {
        app.db('vendas').max('id as ultimoIdVenda')
            .then(idVenda => res.json(idVenda))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        // let pagamento = app.db('pagamentos_vendas').where({
        //     idVendas: req.params.idVendas
        // })


        // console.log(pagamento.json)

        app.db('vendas')
            // .select('*')            
            .where('vendas.id', '=', req.params.id)
            .join('clientes', 'vendas.idCliente', '=', 'clientes.id')
            .join('transportadoras', 'vendas.idTransportadora', '=', 'transportadoras.id')
            .select('vendas.*', 'clientes.nomeCliente as nomeCliente', 'clientes.id as idCliente', 'clientes.nomeFantasia as nomeFantasia', 'transportadoras.nome as transportadora')
            // .union(app.db('pagamentos_vendas')
            // .select('*')            
            // .where('pagamentos_vendas.idVendas','=', req.params.id))
            // .whereNull('deletedAt')
            // .first()
            // .then(vendas => app.db('pagamentos_vendas').where('idVendas','=', req.params.id))
            .then(vendas => res.json(vendas))
            .catch(err => res.status(500).send(err))
    }

    const getQuantidade = (req, res) => {
        app.db('vendas')
            .count('* as quantidade')
            .then(venda => res.json(venda))
            .catch(err => res.status(500).send(err))
    }

    const getPeriodo = (req, res) => {
        app.db('vendas')
            .where('data','>=',req.params.data)
            .where('data','<',req.params.data)
            .then(venda => res.json(venda))
            .catch(err => res.status(500).send(err))
    }


    return {
        save,
        remove,
        get,
        getById,
        getLast,
        getQuantidade,
        getPeriodo
    }
}