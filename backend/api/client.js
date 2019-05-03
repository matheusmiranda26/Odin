const queries = require('./queries')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        const client = {
            ...req.body
        }
        if (req.params.id) client.id = req.params.id

        try {
            existsOrError(client.nomeCliente, 'Nome Cliente não informado')
            existsOrError(client.cnpj_cpf, 'CNPJ/CPF não informado')
            existsOrError(client.inscricaoEstadual_rg, 'Inscrição Estadual não informada')
            existsOrError(client.email, 'E-mail não informado')
            existsOrError(client.cep, 'CEP não informado')
            existsOrError(client.endereco, 'Endereço não informado')
            existsOrError(client.numero, 'Número não informado')
            existsOrError(client.bairro, 'Bairro não informado')
            existsOrError(client.cidade, 'Cidade não informada')
            existsOrError(client.estado, 'Estado não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (client.id) {
            app.db('clients')
                .update(client)
                .where({
                    id: client.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('clients')
                .insert(client)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('clients')
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

    const limit = 10 // usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('clients').count('id').first()
        const count = parseInt(result.count)

        app.db('clients')
            .select('id', 'nomeCliente', 'nomeFantasia', 'cnpj_cpf', 'inscricaoEstadual_rg', 'email', 'dataFundacao', 'telefoneComercial', 'telefoneCelular', 'tipoCliente', 'observacoes', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'cidade', 'estado')
            .limit(limit).offset(page * limit - limit)
            .then(clients => res.json(clients))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('clients')
            .select('id', 'nomeCliente', 'nomeFantasia', 'cnpj_cpf', 'inscricaoEstadual_rg', 'email', 'dataFundacao', 'telefoneComercial', 'telefoneCelular', 'tipoCliente', 'observacoes', 'cep', 'endereco', 'numero', 'complemento', 'bairro', 'cidade', 'estado')
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