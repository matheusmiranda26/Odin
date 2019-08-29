const queries = require('./queries')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation


    const savePagamentos = (id, pagamentos) => {
        for (var k in pagamentos) {
            pagamentos[k].idVendas = id
            app.db('pagamentos_vendas')
                .insert(pagamentos[k])
                // .then(console.log('deu certo'))
                .catch(err => console.log(err))
        }
    }

    const save = (req, res) => {
        const pagamentoVenda = {
            ...req.body
        }
        if (req.params.id) pagamentoVenda.id = req.params.id

        try {
            // existsOrError(pagamentoVenda.valorTotal, 'Valor total não informado')
            // existsOrError(pagamentoVenda.data, 'Data não informado')
            // existsOrError(pagamentoVenda.quantidade, 'Quantidade total não informada')
            // existsOrError(pagamentoVenda.idCliente, 'Cliente não informado')
            // existsOrError(pagamentoVenda.formaPagamento, 'Forma de Pagamento não informado')
            // existsOrError(pagamentoVenda.condicaoPagamento, 'Condição de Pagamento não informada.')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (pagamentoVenda.id) {
            app.db('pagamentos_vendas')
                .update(pagamentoVenda)
                .where({
                    id: pagamentoVenda.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {

            app.db('pagamentos_vendas')
                .insert(pagamentoVenda)
                .then(
                    _ => res.status(204).send()
                )
                .catch(err => console.log(err))


            app.db('pagamentos_vendas')
                .insert(pagamentos)
                .then(
                    _ => res.status(204).send()
                )
                .catch(err => console.log(err))

        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('pagamentos_vendas')
                .where({
                    id: req.params.id
                }).del()

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

    const get = async (req, res) => {

        app.db('pagamentos_vendas')
            .then(pagamentos_vendas => res.json(pagamentos_vendas))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        let pagamento = app.db('pagamentos_vendas').where({
            idVendas: req.params.idVendas
        })

        app.db('pagamentos_vendas')
            .select('*')
            .where({
                idVendas: req.params.id
            })
            // .whereNull('deletedAt')
            // .first()
            .then(pagamentoVenda => res.json(pagamentoVenda))
            .catch(err => res.status(500).send(err))
    }


    return {
        save,
        remove,
        get,
        getById,
        savePagamentos
    }
}