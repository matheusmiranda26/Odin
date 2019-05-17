const queries = require('./queries')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        const cliente = {
            ...req.body
        }
        if (req.params.id) cliente.id = req.params.id

        try {
            existsOrError(cliente.nomeCliente, 'Nome Cliente não informado')
            existsOrError(cliente.cnpj_cpf, 'CNPJ/CPF não informado')
            existsOrError(cliente.inscricaoEstadual_rg, 'Inscrição Estadual não informada')
            // existsOrError(cliente.email, 'E-mail não informado')
            existsOrError(cliente.cep, 'CEP não informado')
            existsOrError(cliente.endereco, 'Endereço não informado')
            existsOrError(cliente.numero, 'Número não informado')
            existsOrError(cliente.bairro, 'Bairro não informado')
            existsOrError(cliente.cidade, 'Cidade não informada')
            existsOrError(cliente.estado, 'Estado não informado')
            existsOrError(cliente.estado, 'Estado não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (cliente.id) {
            app.db('clientes')
                .update(cliente)
                .where({
                    id: cliente.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('clientes')
                .insert(cliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('clientes')
                .where({
                    id: req.params.id
                }).del()

            try {
                existsOrError(rowsDeleted, 'Cliente não foi encontrado.')
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

        const result = await app.db('clientes').count('id').first()
        // const count = parseInt(result.count)

        app.db('clientes')
            .select('id', 'nomeCliente', 'nomeFantasia', 'cnpj_cpf', 'inscricaoEstadual_rg', 'email', 'dataFundacao', 'telefoneComercial', 'telefoneCelular', 'tipoCliente', 'observacoes', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'idVendedor')
            .limit(limit).offset(page * limit - limit)
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('clientes')
            .select('id', 'nomeCliente', 'nomeFantasia', 'cnpj_cpf', 'inscricaoEstadual_rg', 'email', 'dataFundacao', 'telefoneComercial', 'telefoneCelular', 'tipoCliente', 'observacoes', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'idVendedor')
            .where({
                id: req.params.id
            })
            // .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }


    return {
        save,
        remove,
        get,
        getById
    }
}