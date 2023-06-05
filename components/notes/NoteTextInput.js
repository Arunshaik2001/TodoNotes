import { TextInput, View, Text, StyleSheet} from "react-native"

function NoteTextInput({label, placeholder, value, onChangeText, isValid, errorMessage, multiline}){
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{label}</Text>
            <TextInput multiline={multiline} placeholder={placeholder} onChangeText={onChangeText} style={[styles.inputStyle]} value={value}/>
            {!isValid && <Text style={styles.errorTextStyle}>{errorMessage}</Text>}
        </View>
    )
}


export default NoteTextInput

const styles = StyleSheet.create({
    textContainer: {
        margin: 10
    },
    titleText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginVertical: 10
    },
    inputStyle: {
        backgroundColor: '#ffb6c1',
        borderRadius: 10,
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        marginTop: 5
    }
})