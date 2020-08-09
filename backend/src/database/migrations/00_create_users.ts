//IMPORTANDO KNEX PARA CRIAÇÃO DAS MIGRATIONS
import Knex from 'knex'

//AS ALTERAÇÕES IRA SUBIR PARA O BANCO
export async function up(knex: Knex){
    //NOVA TABELA CHAMADA users
    return knex.schema.createTable('users', table => {
        //ID VAI SER AUTO INCREMENT E A PK
        table.increments('id').primary();

        //DELCARANDO AS COLUNAS DA TABELA
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    })
}

//METODO ROLLBACK
export async function down(knex: Knex){
    //VAI REMOVER A TABELA "users"
    return knex.schema.dropTable('users');
}