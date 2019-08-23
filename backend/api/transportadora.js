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
            existsOrError(cliente.nome, 'Nome não informado')
            // existsOrError(cliente.cnpj_cpf, 'CNPJ/CPF não informado')
           

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
        // const page = req.query.page || 1

        // const result = await app.db('clientes').count('id').first()
        // const count = parseInt(result.count)

         const clientes = await app.db('transportadoras')
            .select('*')
            // .limit(limit).offset(page * limit - limit)
            // .replace(clientes => clientes.dataFundacao = "teste")   
            // .forEach(element => {
            //     dataFundacao = "teste"
            // // })        
            .then(transportadoras => res.json(transportadoras))
            .catch(err => res.status(500).send(err))

            // clientes.forEach(element => {
            //     console.log(element.dataFundacao.split("T")[0])
            // });

            // console.log(clientes)
            return res.json(clientes)
    }

    const getByName = (req, res) => {
        app.db('transportadoras')
            .select('*')
            .where('nome', 'like', '%' + req.params.nome + '%'
            )
            // .whereNull('deletedAt')
            // .first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('clientes')
            .select('*')
            .where({
                id: req.params.id
            })
            // .whereNull('deletedAt')
            .first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }

    return {
        save,
        remove,
        get,
        getById,
        getByName
    }
}