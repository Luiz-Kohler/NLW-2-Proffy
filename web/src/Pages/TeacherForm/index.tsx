import React, { useState, FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import Input from '../../components/Input'

import {useHistory} from 'react-router-dom'

import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/TextArea'
import Select from '../../components/Select'
import api from '../../services/api'

export default function TeacherForm() {

    const history = useHistory();

    const defaultScheduleValue = {
        week_day: 0,
        from: '0:00 AM',
        to: '0:00 AM'
    }

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [bio, setBio] = useState('');
    const [whatsapp, setWhatsapp] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([defaultScheduleValue])

    function add_new_schedule_item() {
        setScheduleItems([...scheduleItems, defaultScheduleValue])
    }

    function handle_create_class(event: FormEvent) {

        event.preventDefault()

        api.post('classes',
            {
                name,
                avatar,
                whatsapp,
                bio,
                subject,
                cost: Number(cost),
                schedule: scheduleItems
            }).then(() => {
                history.push('/')
                alert('Cadastro realizado com sucesso')
            }).catch((err) => {
                alert('Erro no cadastro')
            })
    }

    function set_schedule_item_value(position: number, field: string, value: string) {

        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {

            if (index === position) {
                //Troca o nome da var informada por parametros na entidade e coloca o valor informado
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems)
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrivel que você quer dar aulas."
                description="O primeiro passo, é preencher este formulário de inscrição"
            />

            <main>

                <form onSubmit={handle_create_class}>

                    <fieldset>

                        <legend>Seus dados</legend>

                        <Input name="name"
                            label="Nome completo"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(event) => setAvatar(event.target.value)}
                        />

                        <Input
                            name="whatsapp"
                            label="WhatsApp"
                            value={whatsapp}
                            onChange={(event) => setWhatsapp(event.target.value)}
                        />

                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(event) => setBio(event.target.value)}
                        />

                    </fieldset>

                    <fieldset>

                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Fisíca', label: 'Fisíca' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Inglês', label: 'Inglês' },
                                { value: 'História', label: 'História' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Geografia', label: 'Geografia' },
                            ]}
                        />

                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(event) => setCost(event.target.value)}
                        />

                    </fieldset>

                    <fieldset>

                        <legend>

                            Horários disponíveis
                        <button type="button" onClick={add_new_schedule_item}>+ Novo horário</button>

                        </legend>


                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="shedule-item">

                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => set_schedule_item_value(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Segunda-Feira' },
                                            { value: '1', label: 'Terça-Feira' },
                                            { value: '2', label: 'Quarta-Feira' },
                                            { value: '3', label: 'Quinta-Feira' },
                                            { value: '4', label: 'Sexta-Feira' },
                                            { value: '5', label: 'Sabado' },
                                            { value: '6', label: 'Domingo' },
                                        ]}
                                    />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => set_schedule_item_value(index, 'from', e.target.value)}
                                    />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => set_schedule_item_value(index, 'to', e.target.value)}
                                    />

                                </div>
                            )
                        })}

                    </fieldset>


                    <footer>

                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante!
                        <br />
                        Preencha todos os dados
                    </p>

                        <button type="submit">Salvar cadastro</button>
                    </footer>

                </form>

            </main>

        </div>
    )
}