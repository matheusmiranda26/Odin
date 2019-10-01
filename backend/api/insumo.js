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
            .select('insumo.*','fornecedores.nome as fornecedor')
            .whereNull('insumo.deletedAt')
            .orderBy('insumo.nome')
            .then(vendas => {
                res.json(vendas)             })
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
            //.join('clientes', 'vendas.idCliente', '=', 'clientes.id')
            .join('fornecedores', 'insumo.idFornecedor', '=', 'fornecedores.id')
            .select('insumo.*','fornecedores.nome as fornecedor')
            .then(vendas => res.json(vendas))
            .catch(err => res.status(500).send(err))
    }

    return {
        save,
        remove,
        get,
        getById,
        getPorFornecedor
    }
}