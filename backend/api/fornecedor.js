module.exports = app => {
    const {
        existsOrError
    } = app.api.validation

    const save = (req, res) => {
        const fornecedor = {
            ...req.body
        }

        if (req.params.id) fornecedor.id = req.params.id

        try {
            existsOrError(fornecedor.nome, 'Nome não informado')
            // existsOrError(fornecedor.cnpj_cpf, 'CNPJ/CPF não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (fornecedor.id) {
            app.db('fornecedores')
                .update(fornecedor)
                .where({
                    id: fornecedor.id
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('fornecedores')
                .insert(fornecedor)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('fornecedores')
                .where({
                    id: req.params.id
                }).del()

            try {
                existsOrError(rowsDeleted, 'Fornecedor não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }


    const get = async (req, res) => {
    
         const fornecedores = await app.db('fornecedores')
            .select('*')
            .then(fornecedores => res.json(fornecedores))
            .catch(err => res.status(500).send(err))
            // return res.json(fornecedores)
    }

    const getByName = (req, res) => {
        app.db('fornecedores')
            .select('*')
            .where('nome', 'like', '%' + req.params.nome + '%'
            )
            // .whereNull('deletedAt')
            // .first()
            .then(fornecedor => res.json(fornecedor))
            .catch(err => res.status(500).send(err))
    }
    
    const getById = (req, res) => {
        app.db('fornecedores')
            .select('*')
            .where({
                id: req.params.id
            })
            // .whereNull('deletedAt')
            .first()
            .then(fornecedor => res.json(fornecedor))
            .catch(err => res.status(500).send(err))
    }

    const getFornecedor = (req, res) => {
        app.db('fornecedores')
            .distinct('id','nome')
            .then(fornecedor => res.json(fornecedor))
            .catch(err => res.status(500).send(err))
    }


    return {
        save,
        remove,
        get,
        getById,
        getByName,
        getFornecedor
    }
}