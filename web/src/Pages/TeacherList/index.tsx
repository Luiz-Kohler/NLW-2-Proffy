import React, { useState, FormEvent } from 'react';
import './styles.css'

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

export default function TeacherList(){

    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function handle_search_teachers(event: FormEvent){
        event.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

       setTeachers(response.data)
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os Proffys disponíveis." >

                <form id="search-teachers" onSubmit={handle_search_teachers}>

                <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        options={[
                            {value: 'Artes', label:'Artes'},
                            {value: 'Biologia', label:'Biologia'},
                            {value: 'Fisíca', label:'Fisíca'},
                            {value: 'Química', label:'Química'},
                            {value: 'Português', label:'Português'},
                            {value: 'Inglês', label:'Inglês'},
                            {value: 'História', label:'História'},
                            {value: 'Educação Física', label:'Educação Física'},
                            {value: 'Geografia', label:'Geografia'},
                        ]}
                    />

                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        value={week_day}
                        onChange={(e) => setWeek_day(e.target.value)}
                        options={[
                            {value: '0', label:'Segunda-Feira'},
                            {value: '1', label:'Terça-Feira'},
                            {value: '2', label:'Quarta-Feira'},
                            {value: '3', label:'Quinta-Feira'},
                            {value: '4', label:'Sexta-Feira'},
                            {value: '5', label:'Sabado'},
                            {value: '6', label:'Domingo'},
                        ]}
                    />

                    <Input 
                        type="time"
                        name="time" 
                        label="Hora"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <button type="submit">Buscar</button>

                </form>

            </PageHeader>

            <main>

            {teachers.map((teacher: Teacher) => {
                return  <TeacherItem key={teacher.id} teacher={teacher}/>
            })}         

            </main>

        </div>
    )
}