//IMPORTANDO KNEX PARA CONFIGURAÇÃO DO DB
import knex from "knex";

//IMPORTANDO PATH PARA CONTROLE DE CAMINHO
import path from "path";

//DECLARANDO O BANCO DE DADOS TOTALMENTE CONFIGURADO
const db = knex({
  client: "sqlite3",
  connection: {
    //CAMINHO PARA O BANCO
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

//EXPORTANDO CONST QUE DECLARAMOS NA LINHA 7
export default db;