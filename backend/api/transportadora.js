const queries = require('./queries')

module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        const transportadora = {
            ...req.body
        }
        if (req.params.id) transportadora.id = req.params.id

        try {
            existsOrError(transportadora.nome, 'Nome não informado')
            // existsOrError(transportadora.cnpj_cpf, 'CNPJ/CPF não informado')
           

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (transportadora.id) {
            app.db('transportadoras')
                .update(transportadora)
                .where({
                    id: transportadora.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('transportadoras')
                .insert(transportadora)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('transportadoras')
                .where({
                    id: req.params.id
                }).del()

            try {
                existsOrError(rowsDeleted, 'Transportadora não foi encontrada.')
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

        // const result = await app.db('transportadoras').count('id').first()
        // const count = parseInt(result.count)

         const transportadoras = await app.db('transportadoras')
            .select('*')
            // .limit(limit).offset(page * limit - limit)
            // .replace(transportadoras => transportadoras.dataFundacao = "teste")   
            // .forEach(element => {
            //     dataFundacao = "teste"
            // // })        
            .then(transportadoras => res.json(transportadoras))
            .catch(err => res.status(500).send(err))

            // transportadoras.forEach(element => {
            //     console.log(element.dataFundacao.split("T")[0])
            // });

            // console.log(transportadoras)
           // return res.json(transportadoras)
    }

    const getByName = (req, res) => {
        app.db('transportadoras')
            .select('*')
            .where('nome', 'like', '%' + req.params.nome + '%'
            )
            // .whereNull('deletedAt')
            // .first()
            .then(transportadora => res.json(transportadora))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('transportadoras')
            .select('*')
            .where({
                id: req.params.id
            })
            // .whereNull('deletedAt')
            .first()
            .then(transportadora => res.json(transportadora))
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