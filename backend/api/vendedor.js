const queries = require('./queries')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        const vendedor = {
            ...req.body
        }
        if (req.params.id) vendedor.id = req.params.id

        try {
            existsOrError(vendedor.nome, 'Nome vendedor não informado')
            existsOrError(vendedor.cpf, 'CNPJ/CPF não informado')
            existsOrError(vendedor.rg, 'Inscrição Estadual não informada')
            // existsOrError(vendedor.email, 'E-mail não informado')
            // existsOrError(vendedor.cep, 'CEP não informado')
            existsOrError(vendedor.endereco, 'Endereço não informado')
            // existsOrError(vendedor.numero, 'Número não informado')
            existsOrError(vendedor.bairro, 'Bairro não informado')
            existsOrError(vendedor.cidade, 'Cidade não informada')
            existsOrError(vendedor.estado, 'Estado não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (vendedor.id) {
            app.db('vendedores')
                .update(vendedor)
                .where({
                    id: vendedor.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('vendedores')
                .insert(vendedor)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('vendedores')
                .where({
                    id: req.params.id
                }).del()

            try {
                existsOrError(rowsDeleted, 'vendedor não foi encontrado.')
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

        const result = await app.db('vendedores').count('id').first()
        // const count = parseInt(result.count)

        app.db('vendedores')
            .select('*')
            // .whereNot('status', '=', 1)
            // .limit(limit).offset(page * limit - limit)
            .then(vendedores => res.json(vendedores))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('vendedores')
            .select('*')
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