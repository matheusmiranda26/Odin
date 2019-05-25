const queries = require('./queries')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        const venda = {
            ...req.body
        }
        if (req.params.id) venda.id = req.params.id

        try {
            existsOrError(venda.valorTotal, 'Valor total não informado')
            existsOrError(venda.data, 'Data não informado')
            existsOrError(venda.quantidadeTotal, 'Quantidade total não informada')
            existsOrError(venda.idCliente, 'Cliente não informado')
            existsOrError(venda.formaPagamento, 'Forma de Pagamento não informado')
            existsOrError(venda.condicaoPagamento, 'Condição de Pagamento não informada.')

        } catch (msg) {
            res.status(400).send(msg)
        }

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
                .insert(venda)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('vendas')
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

    // const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        // const result = await app.db('vendas').count('id').first()
        // const count = parseInt(result.count)

        app.db('vendas')
            .select('*')
            // .limit(limit).offset(page * limit - limit)
            .then(vendas => res.json(vendas))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        let pagamento = app.db('pagamentos_vendas').where({idVendas : req.params.idVendas})

        app.db('vendas')
            .select('*')
            .where({
                id: req.params.id
            })
            // .whereNull('deletedAt')
            .first()
            .then(venda => res.json({venda, pagamento}))
            .catch(err => res.status(500).send(err))
    }


    return {
        save,
        remove,
        get,
        getById
    }
}