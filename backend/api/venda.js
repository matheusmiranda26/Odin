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
            existsOrError(venda.quantidade, 'Quantidade total não informada')
            existsOrError(venda.idCliente, 'Cliente não informado')
            existsOrError(venda.formaPagamento, 'Forma de Pagamento não informado')
            existsOrError(venda.condicaoPagamento, 'Condição de Pagamento não informada.')

        } catch (msg) {
            res.status(400).send(msg)
        }
        let pagamentos = {
            ...venda.pagamentosVendas
        }

        // console.log(pagamentos)
        delete venda.pagamentosVendas
        // console.log(venda)
        if (venda.id) {
            app.db('vendas')
                .update(venda)
                .where({
                    id: venda.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            console.log(venda)
            app.db('vendas')
                .insert(venda)
                // .returning('id')
                .then(
                    _ => res.status(204).send()
                )
                .catch(err => console.log(err))
            // console.log(idVenda)

            // for(let i = 0; i < pagamentos.length; i++){
            //     pagamentos[i].idVenda = id
            // } 
            // console.log(pagamentos)
            // app.db('pagamentos_vendas')
            // .insert(pagamentos)
            // .then(_ => res.status(204).send())
            // .catch(err => res.status(500).send(err))  


            // pagamentos = JSON.stringify(pagamentos)
            // console.log(pagamentos)
            // app.db('pagamentos_vendas')
            //     .insert(pagamentos)
            //     .then(_ => res.status(204).send())
            //     .catch(err => res.status(500).send(err))
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
            .join('clientes', 'vendas.idCliente', '=', 'clientes.id').select('vendas.*', 'clientes.nomeCliente as nomeCliente')
            // .limit(limit).offset(page * limit - limit)
            .then(vendas => res.json(vendas))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {

        let pagamento = app.db('pagamentos_vendas').where({
            idVendas: req.params.idVendas
        })

        app.db('vendas')
            .select('*')
            .where({
                id: req.params.id
            })
            // .whereNull('deletedAt')
            .first()
            .then(venda => res.json({
                venda,
                pagamento
            }))
            .catch(err => res.status(500).send(err))
    }


    return {
        save,
        remove,
        get,
        getById
    }
}