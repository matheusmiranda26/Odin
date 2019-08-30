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

    const get = async (req, res) => {

        const clientes = await app.db('clientes').join('vendedores', 'clientes.idVendedor', '=', 'vendedores.id').select('clientes.*', 'vendedores.nome as nomeVendedor', 'vendedores.apelido as apelido')
        return res.json(clientes)
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

    const getByName = (req, res) => {
        app.db('clientes')
            .select('*')
            .where('nomeCliente', 'like', '%' + req.params.nome + '%'
            )
            // .whereNull('deletedAt')
            // .first()
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