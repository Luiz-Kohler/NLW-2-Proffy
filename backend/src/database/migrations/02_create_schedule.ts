//IMPORTANDO KNEX PARA CONFIGURAÇÃO DAS MIGRATIONS
import Knex from 'knex'

//O METODO  IRA SUBIR NO BANCO...
export async function up(knex: Knex){
    //TABELA "class_schedule"
    return knex.schema.createTable('class_schedule', table => {
        //COLUNA ID VAI SER AUTO  INCREMENT
        table.increments('id').primary();

        //COLUNAS VAI SER UM INTEIRO E NÃO PODE SER NULL
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        //CRIANDO A FK
        table.integer('class_id')
        //NÃO PODE SER NULL
        .notNullable()
        //COLUNA ID
        .references('id')
        //DA TABELA classes
        .inTable('classes')
        //DELETE NO MODO CASCADE
        .onDelete('CASCADE')
        //UPDATE NO MODO CASCADE
        .onUpdate('CASCADE')
    })
}

//CASO DE ALGO ERRADO PODEMOS REMOVER AS MUDANÇAS COM ESTE METODO
export async function down(knex: Knex){
    //IRA REMOVER A TABELA
    return knex.schema.dropTable('class_schedule');
}