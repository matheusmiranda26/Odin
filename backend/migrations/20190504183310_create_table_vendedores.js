
exports.up = function(knex, Promise) {
    return knex.schema.createTable('vendedores', table => {
        table.increments('id').primary()
        table.string('nome')
        table.string('email')
        table.string('endereco')
        table.string('bairro')
        table.string('numero')
        table.string('cep')
        table.string('complemento')
        table.string('cidade')
        table.string('estado')
        table.string('cpf')
        table.string('rg')
        table.string('status')
        table.string('observacoes')
    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('vendedores')
};
