const queries = require('./queries')
const pagamentos = require('./pagamentosVendas')
//import moment from "moment";
module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {

        // alert('aqui')
        const insumo = {
            ...req.body
        }

        const insumoHistorico = insumo.historico

        console.log(insumo)
        if (req.params.id) insumo.id = req.params.id

        try {
            existsOrError(insumo.nome, 'Nome não informado')
            existsOrError(insumo.idFornecedor, 'Fornecedor não informado')
            //existsOrError(insumo.preco, 'Preço não informado')
            existsOrError(insumo.quantidade, 'Quantidade não informada')


        } catch (msg) {
            res.status(400).send(msg)
        }

        delete insumo.historico
        delete insumo.fornecedor
        delete insumo.deletedAt

        if (insumo.id) {

            app.db('insumo')
                .update(insumo)
                .where({
                    id: insumo.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('insumo')
                // .returning('id')
                .insert(insumo)
                // .then(function (response) {
                //     app.api.pagamentosinsumos.savePagamentos(response[0], pagamentos)
                // })
                .then(_ => res.status(204).send())
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

    const get = async (req, res) => {
        const page = req.query.page || 1

        app.db('insumo')
            .join('fornecedores', 'insumo.idFornecedor', '=', 'fornecedores.id')
            .select('insumo.*', 'fornecedores.nome as fornecedor')
            .whereNull('insumo.deletedAt')
            .orderBy('insumo.nome')
            .then(vendas => {
                res.json(vendas)
            })
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('insumo')
            .where('insumo.id', '=', req.params.id)
            .join('fornecedores', 'insumo.idFornecedor', '=', 'fornecedores.id')
            .select('insumo.*', 'fornecedores.nome as fornecedor')
            .first()
            .then(insumo => res.json(insumo))
            .catch(err => res.status(500).send(err))
    }

    const getPorFornecedor = (req, res) => {
        app.db('insumo')
            .where('insumo.idFornecedor', '=', req.params.id)
            .join('fornecedores', 'insumo.idFornecedor', '=', 'fornecedores.id')
            .select('insumo.*', 'fornecedores.nome as fornecedor')
            .then(vendas => res.json(vendas))
            .catch(err => res.status(500).send(err))
    }

    const getInsumoAcabando = async (req, res) => {
        app.db('insumo')
            .whereRaw('quantidadeMinima > quantidade')
            .then(insumos => {
                res.json(insumos)
            })
            .catch(err => res.status(500).send(err))
    }

    const updateEntradaSaida = (req, res) => {

        const historico = {
            ...req.body
        }

        console.log(historico)
        let estoque = {}
        let estoqueAtual

        console.log('1' + estoque)
        app.db('insumo')
            .select('*')
            .where('insumo.id', '=', historico.idInsumo)
            .whereNull('insumo.deletedAt')
            .first()
            .then(estoque => estoque)
            .catch(err => res.status(500).send(err))

        console.log('3' + estoque)
        if (historico.tipo == 'entrada') {
            console.log('aqui')
            estoque = estoque + historico.quantidade
        } else {
            this.estoque -= historico.quantidade
        }
        console.log(this.estoque)
        app.db('insumo')
            .where('id', '=', historico.idInsumo)
            .update({
                quantidade: this.estoque
            })

        app.db('insumo_historico')
            .insert(historico)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const getByName = (req, res) => {
        app.db('insumo')
            .select('*')
            .where('nome', 'like', '%' + req.params.nome + '%'
            )
            .then(insumo => res.json(insumo))
            .catch(err => res.status(500).send(err))
    }

    return {
        save,
        remove,
        get,
        getById,
        getPorFornecedor,
        updateEntradaSaida,
        getByName,
        getInsumoAcabando
    }
}