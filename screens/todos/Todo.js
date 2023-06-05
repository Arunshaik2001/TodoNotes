
import { Text, View, StyleSheet } from "react-native";
import NoteTextInput from "../../components/notes/NoteTextInput";
import Button from "../../components/Button";
import { useContext, useState } from "react"
import { TodosContext } from "../../store/TodosStore";
import TimePicker from "../../components/todos/TimePicker";
import DatePicker from "../../components/todos/DatePicker";
import * as Notifications from 'expo-notifications';


function Todo({route, navigation}){

    const [titleText, setTitleText] = useState('')
    const [descriptionText, setDescriptionText] = useState('')
    const [titleTextError, setTitleTextError] = useState('')
    const [descriptionTextError, setDescriptionTextError] = useState('')
    const todosContext = useContext(TodosContext) 
    const [pickedTime, setPickedTime] = useState(new Date())
    const [pickedDate, setPickedDate] = useState(new Date())

    function onChangeTitleText(value){
        setTitleText(value)
    }

    function onChangeDescriptionText(value){
        setDescriptionText(value)
    }

    async function onSubmitData(){
        if(titleText.trim() === ''){
            console.log('title is empty')
            setTitleTextError("Title is invalid")
        }
        else{
            setTitleTextError('')
        }

        if(descriptionText.trim() === ''){
            console.log('description is empty')
            setDescriptionTextError("Description is invalid")
        }
        else{
            setDescriptionTextError('')
        }

        if(titleText.trim() !== '' && descriptionText.trim() !== ''){
            var selectedDateSecs = (pickedDate.getTime() - pickedTime.getTime()) / 1000

            if(selectedDateSecs < 0){
                selectedDateSecs = selectedDateSecs * -1
            }
            else if(selectedDateSecs === 0){
                selectedDateSecs = 1
            }

            console.log('dateTime', selectedDateSecs)
            const id = todosContext.addTodo({
                title: titleText,
                description: descriptionText,
                scheduledDate: selectedDateSecs
            })
            await triggerNotifications(id ,titleText, descriptionText , selectedDateSecs)
            navigation.goBack()
        }
    }

    const triggerNotifications = async (id, title, description, time) => {
        if(Platform.OS === 'ios'){
            Notifications.requestPermissionsAsync().then((statusObj) => {
                if (statusObj.status !== 'granted') {
                    return Notifications.requestPermissionsAsync()
                }
                return statusObj
            }).then((statusObj)=>{
                if(statusObj.status === 'granted'){
                    Notifications.scheduleNotificationAsync({
                        content: {
                            title: title,
                            body:  description,
                            data: { id: id },
                        },
                        trigger: { seconds: 5 },
                    });
                }
            })
        }
        else{
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: title,
                    body:  description,
                    data: { id: id },
                },
                trigger: { seconds: time },
            });
        }
    }

    function onPickedTime(time){
        setPickedTime(time)
    }

    function onPickedDate(date){
        setPickedDate(date)
    }

    return (
        <View style={styles.todoContainer}>
            <NoteTextInput multiline={false} value={titleText} label="Title" onChangeText={onChangeTitleText} placeholder="Add title" isValid={titleTextError === '' ? true : false} errorMessage={titleTextError}/>
            <NoteTextInput multiline={true}  value={descriptionText} label="Description" onChangeText={onChangeDescriptionText} placeholder="Add Description" isValid={descriptionTextError === '' ? true : false} errorMessage={descriptionTextError}/>
            <TimePicker onPickedTime={onPickedTime}/>
            <DatePicker onPickedDate={onPickedDate}/>
            <Button onPress={onSubmitData}>Submit</Button>
        </View>
    )
}

export default Todo

const styles = StyleSheet.create({
    todoContainer: {
        flex: 1,
    }
})