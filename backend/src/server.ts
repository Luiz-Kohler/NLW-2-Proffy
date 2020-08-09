//IMPORTANDO EXPRESS PARA CRIAR  NOSSA APLICAÇÃO
import express from 'express'

//IMPORTANDO CORS PARA SEGUNRAÇA DA NOSSA API
import cors  from 'cors'

//IMPORTANDO AS ROTAS QUE CRIAMOS PARA USAR NA NOSSA API
import routes from './routes'

const app = express()

//USANDO OS MODULOS EXPORTADOS NO NOSSO APP
app.use(cors())
app.use(express.json())
app.use(routes)

//DECLARANDO A PORTA
const port = 3333

//APLICAÇÃO VAI EXCUTAR A PORTA QUE NOS DECLARAMOS ALI EM CIMA EM "Port": LOCALHOST:3333
app.listen(port)