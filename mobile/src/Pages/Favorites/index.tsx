import React, { useState } from 'react'
import { View } from 'react-native'
import {useFocusEffect} from '@react-navigation/native'

import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import { ScrollView } from 'react-native-gesture-handler'

function Favorites(){ 

    const [favorites, setFavorites] = useState([])

    function load_favorites(){
        AsyncStorage.getItem('favorites').then(resp => {
            if (resp) {
                const favoritedTeachers = JSON.parse(resp);
                setFavorites(favoritedTeachers);
            }
        })
    }

    useFocusEffect(()=> {
        load_favorites();
    })

    return (
        <View style={styles.container}>
        <PageHeader title={`Meus proffys ${'\n'}favoritos`}/>
            

        <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16,
            }}>
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={true}
                        />
                    )
                })}

            </ScrollView>
        </View>
    )
}

export default Favorites;