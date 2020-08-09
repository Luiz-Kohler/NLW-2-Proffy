//IMPORTANDO KNEX PARA FAZER AS MIGRATIONS
import Knex from 'knex'

//METODO PARA O QUE VAI SUBIR PARA O BANCO
export async function up(knex: Knex){
    //O QUE O METODO IRA RETORNAR, CRIAR UMA TABELA CHAMADA "connections"
    return knex.schema.createTable('connections', table => {

        //ID VAI SER AUTO INCREMENT
        table.increments('id').primary();

        //COLUNA user_id DECLARANDO A FK
        table.integer('user_id')
        //NÃO PODE SER NULL
        .notNullable()
        //SE REFERENCIA A COLUNA ID
        .references('id')
        //DA TABELA USERS
        .inTable('users')
        //DELETE NO MODO CASCADE
        .onDelete('CASCADE')
        //UPDATE NO MODO CASCADE
        .onUpdate('CASCADE')

        //COLUNA PARA MOSTRAR QUANDO FOI CRIADA A CONEXÃO
        table.timestamp('created_at')
        //VALOR DEFAULT É A HORA QUE ELE FOR INSERIDO
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
        //POR REDUNDANCIA ELE NÃO PODE SER NULL
        .notNullable();
    })
}

//CASO DE ALGUM ERRO PODEMOS REMOVER O QUE FOI CRIADO NESTA MIGRATION
export async function down(knex: Knex){
    //IRA DERRUBAR A TAEBLA connections
    return knex.schema.dropTable('connections');
}