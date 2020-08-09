//IMPORTANDO EXPRESS DA NOSSA APLICAÇÃO
import express from 'express'

//IMPORTANDO OS CONTROLLERS
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'

//BUSCANDO AS ROTAS DO EXPRESS/APP PARA UMA CONTS
const routes = express.Router();

//DECLARANDO OS CONTROLLER QUE CRIAMOS
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();

//CRIANDO AS ROTAS DA CLASSES
routes.post('/classes', classesController.create)
routes.get('/classes', classesController.index)

//CRIANDO AS ROTAS DAS CONNECTIONS
routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

//EXPORTANDO AS ROTAS QUE ACABAMOS DE CRIAR
export default routes;