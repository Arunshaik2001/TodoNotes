import { useContext, useState } from "react"
import NoteTextInput from "../../components/notes/NoteTextInput"
import { View, StyleSheet, Platform } from "react-native"
import Button from "../../components/Button"
import { NotesContext } from "../../store/NotesStore"

function Note({ route, navigation }) {

    const [titleText, setTitleText] = useState('')
    const [descriptionText, setDescriptionText] = useState('')
    const [titleTextError, setTitleTextError] = useState('')
    const [descriptionTextError, setDescriptionTextError] = useState('')
    const notesContext = useContext(NotesContext)

    function onChangeTitleText(value) {
        setTitleText(value)
    }

    function onChangeDescriptionText(value) {
        setDescriptionText(value)
    }

    async function onSubmitData() {
        if (titleText.trim() === '') {
            console.log('title is empty')
            setTitleTextError("Title is invalid")
        }
        else {
            setTitleTextError('')
        }

        if (descriptionText.trim() === '') {
            console.log('description is empty')
            setDescriptionTextError("Description is invalid")
        }
        else {
            setDescriptionTextError('')
        }

        if (titleText.trim() !== '' && descriptionText.trim() !== '') {
            notesContext.addNote({
                title: titleText,
                description: descriptionText
            })
            navigation.goBack()
        }
    }

    return (
        <View style={styles.noteContainer}>
            <NoteTextInput multiline={false} value={titleText} label="Title" onChangeText={onChangeTitleText} placeholder="Add title" isValid={titleTextError === '' ? true : false} errorMessage={titleTextError} />
            <NoteTextInput multiline={true} value={descriptionText} label="Description" onChangeText={onChangeDescriptionText} placeholder="Add Description" isValid={descriptionTextError === '' ? true : false} errorMessage={descriptionTextError} />
            <Button onPress={onSubmitData}>Submit</Button>
        </View>
    )
}

export default Note

const styles = StyleSheet.create({
    noteContainer: {
        flex: 1,
    }
})