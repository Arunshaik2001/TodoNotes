import { View} from "react-native"
import { TodosContext } from "../../store/TodosStore"
import { useContext, useEffect } from "react"
import NotesList from "../../components/notes/NotesList"
import * as Notifications from 'expo-notifications'


function TodosScreen({route, navigation}){

    const todosContext = useContext(TodosContext)
    return (
        <View style={{flex: 1}}>
            <NotesList notesData={todosContext.todos.filter((item)=> item.todoState !== 'completed')}/>
        </View>
    )
}

export default TodosScreen