const queries = require('./queries')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation


    const savePagamentos = (id, pagamentos) => {
        console.log(id)
        // console.log(pagamentos)
        // pagamentos.forEach(element => {
        //     element.idVenda = id
        // });
        // console.log(pagamentos)
        for(var k in pagamentos) {
            pagamentos[k].idVendas = id
            app.db('pagamentos_vendas')
            .insert(pagamentos[k])
            // .then(console.log('deu certo'))
            .catch(err => console.log(err))
         }
         console.log(pagamentos)

       

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
        // console.log(pagamentoVenda.pagamentosVendas)
        // let pagamentos = {
        //     ...pagamentoVenda.pagamentosVendas,
        // }

        // console.log(pagamentos)
        // delete pagamentoVenda.pagamentosVendas
        // console.log(pagamentoVenda)
        if (pagamentoVenda.id) {
            app.db('pagamentos_vendas')
                .update(pagamentoVenda)
                .where({
                    id: pagamentoVenda.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            // console.log(pagamentoVenda)
            app.db('pagamentos_vendas')
                .insert(pagamentoVenda)
                // .returning('id')
                .then(
                    _ => res.status(204).send()
                )
                .catch(err => console.log(err))


            app.db('pagamentos_vendas')
                .insert(pagamentos)
                // .returning('id')
                .then(
                    _ => res.status(204).send()
                )
                .catch(err => console.log(err))

            let idVenda = app.db('pagamentos_vendas').max('id')
            // console.log(idVenda)

            // for (let i = 0; i < pagamentos.quantidade; i++) {
            //     // pagamentos[i].idVenda = id
            //     console.log("aqui")
            //     pagamentos[i].idVendas = idVenda
            // }
            // app.db('pagamentos_vendas')
            //     .insert(pagamentos)


            // let idVenda = app.db.raw('SELECT LAST_INSERT_ID()').toSql()


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

    // const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        // const result = await app.db('pagamentos_vendas').count('id').first()
        // const count = parseInt(result.count)

        app.db('pagamentos_vendas')
            //  .join('clientes', 'pagamentos_vendas.idCliente', '=', 'clientes.id').select('pagamentos_vendas.*', 'clientes.nomeCliente as nomeCliente')
            // .limit(limit).offset(page * limit - limit)
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