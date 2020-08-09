//IMPORTANDO PATH PARA TRABALHAR COM CAMINHOS
import path from "path";

//EXPORTANDO TAL OBJETOS
//OBS: FORMA ANTIGA DE EXPORTAR NO JS
module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};