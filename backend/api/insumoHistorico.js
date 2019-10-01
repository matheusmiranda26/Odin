module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {

        // alert('aqui')
        const insumoHistorico = {
            ...req.body
        }
        console.log(insumoHistorico)
        if (req.params.id) insumoHistorico.id = req.params.id

        try {
            existsOrError(insumoHistorico.nome, 'Nome não informado')
            existsOrError(insumoHistorico.idFornecedor, 'Fornecedor não informado')
            //existsOrError(insumoHistorico.preco, 'Preço não informado')
            existsOrError(insumoHistorico.quantidade, 'Quantidade não informada')


        } catch (msg) {
            res.status(400).send(msg)
        }

        delete insumoHistorico.fornecedor
        delete insumoHistorico.deletedAt

        if (insumoHistorico.id) {
            app.db('insumo_Historico')
                .update(insumo_historico)
                .where({
                    id: insumoHistorico.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('insumo_historico')
                // .returning('id')
                .insert(insumoHistorico)
                // .then(function (response) {
                //     app.api.pagamentosinsumos.savePagamentos(response[0], pagamentos)
                // })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }


    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('insumo_historico')
                .update({
                    deletedAt: new Date()
                })
                .where({
                    id: req.params.id
                })

            try {
                existsOrError(rowsDeleted, 'Histórico não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const get = async (req, res) => {
        const page = req.query.page || 1

        app.db('insumo_historico')
            .select('insumo_historico.*')
            .then(insumoHistorico => {
                res.json(insumoHistorico) //.then(v => vendatotal = v)
                // vendatotal = "2"
            })
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('insumo_historico')
            .where('insumo_historico.idInsumo', '=', req.params.id)
            .select('*')
            .then(insumoHistorico => res.json(insumoHistorico))
            .catch(err => res.status(500).send(err))
    }

    const getPorCliente = (req, res) => {
        app.db('vendas')
            .where('vendas.idCliente', '=', req.params.id)
            //.join('clientes', 'vendas.idCliente', '=', 'clientes.id')
            .join('transportadoras', 'vendas.idTransportadora', '=', 'transportadoras.id')
            .select('vendas.*', 'transportadoras.nome as transportadora')
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
            .where('data', '>=', req.params.data)
            .where('data', '<', req.params.data)
            .then(venda => res.json(venda))
            .catch(err => res.status(500).send(err))
    }

    const getQuantidadeVendasNoMes = (req, res) => {
        app.db('vendas')
            .count('* as quantidade')
            .whereRaw('MONTH(data) = MONTH(NOW())')
            .whereRaw('YEAR(data) = YEAR(NOW())')
            .then(venda => res.json(venda))
            .catch(err => res.status(500).send(err))
    }

    const getVendaPorDia = (req, res) => {
        app.db('vendas')
            .select('data')
            .sum('quantidade as quantidade')
            .whereRaw('MONTH(data) = MONTH(NOW())')
            .whereRaw('YEAR(data) = YEAR(NOW())')
            .groupBy('data')
            .orderBy('data')
            .then(vendas => res.json(vendas))
            .catch(err => res.status(500).send(err))
    }


    return {
        save,
        remove,
        get,
        getById,
        getQuantidade,
        getPeriodo,
        getVendaPorDia,
        getQuantidadeVendasNoMes,
        getPorCliente
    }
}