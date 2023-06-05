import { View } from "react-native"
import { useContext } from "react"
import { TodosContext } from "../../store/TodosStore"
import NotesList from "../../components/notes/NotesList"

function CompletedTodoScreen(){
    const todosContext = useContext(TodosContext)

    return (
        <View style={{flex: 1}}>
            <NotesList notesData={todosContext.todos.filter((item)=> item.todoState !== 'todo')}/>
        </View>
    )
}

export default CompletedTodoScreen