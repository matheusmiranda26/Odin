
exports.up = function(knex, Promise) {
    return knex.schema.createTable('clientes', table => {
        table.increments('id').primary()
        table.string("nomeCliente")
        table.string("nomeFantasia")
        table.string("cnpj_cpf")
        table.string("inscricaoEstadual_rg")
        table.string("email")
        table.date("dataFundacao")
        table.string("telefoneComercial")
        table.string("telefoneCelular")
        table.string("tipoCliente")
        table.string("observacoes")
        table.string("cep")
        table.string("endereco")
        table.string("numero")
        table.string("complemento")
        table.string("bairro")
        table.string("cidade")
        table.string("estado")
        table.string("status")
        table.integer("idVendedor").unsigned().references('id').inTable('vendedores')
    })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('clientes')
};
