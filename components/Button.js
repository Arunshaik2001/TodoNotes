import { Pressable, View, Text, StyleSheet } from "react-native"

function Button({ children, onPress, height, width }) {
    return (
        <View style={{
            width: '100%',
            alignItems: 'center',
            margin: 10
        }}>
            <View style={[styles.buttonContainer, {height: height ?? 50, width: width ?? 100}]}>
                <Pressable onPress={onPress} android_ripple={true} style={({ pressed }) => [pressed && { opacity: 0.5 }]}>
                    <Text style={styles.textStyle}>{children}</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: 'red',
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        overflow: 'hidden'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold'
    }
})