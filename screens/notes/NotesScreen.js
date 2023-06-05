import { useLayoutEffect, useContext, useEffect } from "react"
import { Pressable, Text, View } from "react-native"
import {Ionicons} from '@expo/vector-icons'
import { NotesContext } from "../../store/NotesStore"
import NoteList from "../../components/notes/NotesList"

function NotesScreen({route, navigation}){

    const notesContext = useContext(NotesContext)


    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: true,
            headerRight: ({size})=>{
                return <Pressable onPress={()=>{
                    navigation.navigate('Note')
                }}>
                    <Ionicons name="add" size={30}/>
                </Pressable>
              }
        })
    }, [navigation])

    return (
        <View style={{flex: 1}}>
            <NoteList notesData={notesContext.notes}/>
        </View>
    )
}

export default NotesScreen