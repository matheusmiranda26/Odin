const queries = require('./queries')
const pagamentos = require('./pagamentosVendas')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        // alert('aqui')
        const despesa = {
            ...req.body
        }
        if (req.params.id) despesa.id = req.params.id

        try {
            existsOrError(despesa.valor, 'Valor total não informado')
            existsOrError(despesa.data, 'Data não informado')
            existsOrError(despesa.quantidade, 'Quantidade total não informada')
            existsOrError(despesa.idCliente, 'Cliente não informado')
            existsOrError(despesa.formaPagamento, 'Forma de Pagamento não informado')
            existsOrError(despesa.condicaoPagamento, 'Condição de Pagamento não informada.')
            existsOrError(despesa.numeroPedido, 'Pedido não informado.')
            existsOrError(despesa.idTransportadora, 'Transportadora não informada.')
            existsOrError(despesa.valorTotal, 'Valor Total não informado.')
            existsOrError(despesa.desconto, 'Desconto não informado.')

        } catch (msg) {
            res.status(400).send(msg)
        }
        // console.log(despesa.pagamentosVendas)
        let pagamentos = {
            ...despesa.pagamentosVendas,
        }

        delete despesa.pagamentosVendas
        if (despesa.id) {
            app.db('despesas')
                .update(despesa)
                .where({
                    id: despesa.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('despesas')
                .returning('id')
                .insert(despesa)
                .then(function (response) {
                    app.api.pagamentosVendas.savePagamentos(response[0], pagamentos)
                }).then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }


    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('despesas')
                .update({
                    deletedAt: new Date()
                })
                .where({
                    id: req.params.id
                })

            try {
                existsOrError(rowsDeleted, 'Despesa não foi encontrada.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const get = async (req, res) => {

        app.db('despesas')
           // .join('clientes', 'despesas.idCliente', '=', 'clientes.id').select('despesas.*', 'clientes.nomeCliente as nomeCliente')
            .whereNull('despesas.deletedAt')
            .then(despesas => {
                res.json(despesas) //.then(v => vendatotal = v)
                // vendatotal = "2"
            })
            .catch(err => res.status(500).send(err))
    }

    const getLast = async (req, res) => {
        app.db('despesas').max('id as ultimoIdVenda')
            .then(idVenda => res.json(idVenda))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        // let pagamento = app.db('pagamentos_vendas').where({
        //     idVendas: req.params.idVendas
        // })


        // console.log(pagamento.json)

        app.db('despesas')
            // .select('*')            
            .where('despesas.id', '=', req.params.id)
            .join('clientes', 'despesas.idCliente', '=', 'clientes.id')
            .join('transportadoras', 'despesas.idTransportadora', '=', 'transportadoras.id')
            .select('despesas.*', 'clientes.nomeCliente as nomeCliente', 'clientes.id as idCliente', 'clientes.nomeFantasia as nomeFantasia', 'transportadoras.nome as transportadora')
            // .union(app.db('pagamentos_vendas')
            // .select('*')            
            // .where('pagamentos_vendas.idVendas','=', req.params.id))
            // .whereNull('deletedAt')
            // .first()
            // .then(despesas => app.db('pagamentos_vendas').where('idVendas','=', req.params.id))
            .then(despesas => res.json(despesas))
            .catch(err => res.status(500).send(err))
    }

    const getDespesasNoMes = (req, res) => {
        app.db('despesas')
            .sum('valor as quantidade')
            .whereRaw('MONTH(data) = MONTH(NOW())')
            .whereRaw('YEAR(data) = YEAR(NOW())')
            .then(venda => res.json(venda))
            .catch(err => res.status(500).send(err))
    }




    return {
        save,
        remove,
        get,
        getById,
        getLast,
        getDespesasNoMes
    }
}