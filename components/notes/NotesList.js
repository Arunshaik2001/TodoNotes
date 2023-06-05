import { FlatList, View, Text, StyleSheet } from 'react-native';

function NoteList({item}){
    return (
        <View style={styles.itemContainer}>
            <View style={{flex: 1}}>
                <Text ellipsizeMode='tail' numberOfLines={1}  style={{color: 'grey', fontWeight: 'bold', fontSize: 20}}>{item.title}</Text>
                <Text ellipsizeMode='tail' numberOfLines={1} style={{color: 'white', fontWeight: 'bold'}}>{item.description}</Text>
            </View>
            <View>
                <Text style={{fontSize: 10}}>
                    {item.date}
                </Text>
            </View>
        </View>
    )
}

function NotesList({notesData}){

    return (
        <FlatList keyExtractor={(item, index)=> item.id} data={notesData} renderItem={NoteList}/>
    )
}

export default NotesList

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: '#ffb6c1',
        padding: 20,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        borderRadius: 20
    }
})