
exports.up = function(knex, Promise) {
    return knex.schema.createTable('clients', table => {
        table.increments('id').primary()
        table.string("razaoSocial")
        table.string("nomeFantasia")
        table.string("nomeCliente")
        table.string("cnpj")
        table.string("cpf")
        table.string("inscricaoEstadual")
        table.string("rg")
        table.string("email")
        table.string("telefoneComercial")
        table.string("telefoneCelular")
        table.string("tipoCliente")
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clients')
};
