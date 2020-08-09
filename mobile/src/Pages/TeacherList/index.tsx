import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'

import { Feather } from '@expo/vector-icons'

import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [teachers, setTeachers] = useState([])

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    const [favorites, setFavorites] = useState<number[]>([])

    function handle_toggle_isFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handle_search_teachers() {
        load_favorites()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)
        setIsFiltersVisible(false)
    }

    function load_favorites(){
        AsyncStorage.getItem('favorites').then(resp => {
            if (resp) {
                const favoritedTeachers = JSON.parse(resp);
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {return teacher.id})

                setFavorites(favoritedTeachersId);
            }
        })
    }

    return (
        <View style={styles.container}>
            <PageHeader title={`Proffys ${'\n'}disponíveis`} headerRight={(
                <BorderlessButton>
                    <Feather name="filter" size={20} color="#fff" onPress={handle_toggle_isFiltersVisible} />
                </BorderlessButton>
            )}>
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput style={styles.input} placeholder="Qual a matéria?" placeholderTextColor="#d4c2ff" value={subject} onChangeText={txt => setSubject(txt)} />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput style={styles.input} placeholder="Qual o dia?" placeholderTextColor="#d4c2ff" value={week_day} onChangeText={txt => setWeek_day(txt)} />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput style={styles.input} placeholder="Qual horário?" placeholderTextColor="#d4c2ff" value={time} onChangeText={txt => setTime(txt)} />
                            </View>

                        </View>

                        <RectButton style={styles.submitButton} onPress={handle_search_teachers}>
                            <Text style={styles.submitButtonText}>Buscar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}>
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}

            </ScrollView>

        </View>
    )
}

export default TeacherList;