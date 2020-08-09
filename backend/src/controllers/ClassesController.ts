//IMPORTANDO AS REQUEST E RESPONSE DE EXPRESS PARA O TYPESCRIPT
import {Request, Response} from 'express'

//IMPORTANDO DB QUE CRIAMOS PARA CONECTAR PARA O BANCO
import db from '../database/connection';

//IMPORTANDO METODO  QUE CONVERTE HORAS PARA MINUTOS
import convertHourToMinutes from '../utils/convertHourToMinutes';

//INTERFACE PARA MAP / CRIAÇÃO
interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

//VAI EXPORTAR A CLASSE "ClassesController"
export default class ClassesController{

    //METODO INDEX PARA BUSCAR AS CLASSES
    async index(request: Request, response: Response){

        //BUSCANDO OS FILTROS PELA QUERY DA REQUISIÇÃO
        const filters = request.query;

        //COLOCANDO OS FILTROS EM CONSTANTES STRINGS
        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        //VERIFICANDO SE ALGUM FILTRO FOI SELECIONADO
        if(!week_day || !subject || !time){
            //CASO NENHUM FILTRO FOR SELECIONADO VAI RETORNAR
            return response.status(400).json({error: "Missing filters to search classes"})
        }

        //CONVERTENDO HORA DO FILTRO EM MINUTOS
        const timeInMinutes = convertHourToMinutes(time)

        //QUERY PARA O BANCO
        const classes = await db('classes')
                        //VERIFICAR SE EXISTE
                        .whereExists(function(){
                            this.select('class_schedule.*')
                            .from('class_schedule')
                            .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                            .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                            .whereRaw('`class_schedule`.`from` <= ??', [Number(timeInMinutes)])
                            .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
                        })
                        .where('classes.subject', '=', subject)
                        .join('users', 'classes.user_id', '=', 'users.id')
                        .select(['classes.*', 'users.*'])
        return response.json(classes)
    }

    async create(request : Request, response : Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body
    
        const userEntity = {
            name: name,
            avatar: avatar,
            whatsapp: whatsapp,
            bio: bio
        }
    
        //DECLARANDO TRANSACTION SCOPE
        const trx = await db.transaction()
    
    
        try{
            const insertedUsersIds = await trx('users').insert(userEntity)
    
            const user_id = insertedUsersIds[0]
        
            const classEntity = {
                subject: subject,
                cost: cost,
                user_id: user_id
            }
        
            const insertedClassesIds = await trx('classes').insert(classEntity)
        
            const class_id = insertedClassesIds[0]
        
            const classScheduleEntity = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                }
            })
        
            await trx('class_schedule').insert(classScheduleEntity)
            
            //COMITAR AS MUDANÇAS NO BANCO
            await trx.commit()
        
            return response.status(201).send()
        }
        catch(err){
            //CASO DE ALGUM ERRO RETORNAR TUDO
            await trx.rollback();
            return response.status(400).json({error: "Unexpected error while creating new class"})
        }
    }
}