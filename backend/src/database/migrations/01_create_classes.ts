//IMPORTANDO KNEX PARA CONFIGURAÇÃO DAS MIGRATIONS
import Knex from 'knex'

//O METODO  IRA SUBIR NO BANCO...
export async function up(knex: Knex){
    //TABELA "classes"
    return knex.schema.createTable('classes', table => {

        //COLUNA ID VAI SER AUTO  INCREMENT
        table.increments('id').primary();

        //A COLUNAS DA NOSSA CLASSE
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //CRIANDO A FK
        table.integer('user_id')
        //NÃO PODE SER NULL
        .notNullable()
        //REFERENCIA O ID
        .references('id')
        //NA TABELA users
        .inTable('users')
        //DELETE NO MODO CASCADE
        .onDelete('CASCADE')
        //UPDATE NO MODO CASCADE
        .onUpdate('CASCADE')
    })
}

//METODO DOWN PARA NOS TERMOS UM ROLLBACK
export async function down(knex: Knex){
    //IRA DERRUBAR A TABELA classes
    return knex.schema.dropTable('classes');
}