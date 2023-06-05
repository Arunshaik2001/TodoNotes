import React, {useState} from 'react';
import {View, Platform, SafeAreaView , StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Button';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'


export default function DatePicker({onPickedDate}) {
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('time');
    const [isDisplayDate, setShow] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {
       const currentDate = selectedDate || mydate;
       setDate(currentDate);
       onPickedDate(currentDate)
    };
    const showMode = (currentMode) => {
        if(Platform.OS === 'android'){
            DateTimePickerAndroid.open({
                value: mydate,
                onChange: (event, date)=>{
                    console.log('event', date)
                    setDate(date || mydate)
                    onPickedDate(date)
                },
                mode: {currentMode},
                is24Hour: true,
                minimumDate: mydate
            })
        }
        else{
            setShow(true);
            setMode(currentMode);
        }
    };
    const displayTimepicker = () => {
       showMode('date');
    };
    return (
       <SafeAreaView style={styles.container}>
          <View>
             <Button onPress={displayTimepicker} children="Pick Date" height={50} width={100}/>
          </View>
          {isDisplayDate && (
             <DateTimePicker
                value={mydate}
                mode={displaymode}
                is24Hour={true}
                display="default"
                onChange={changeSelectedDate}
                minimumDate={mydate}
             />
          )}
          {
            Platform.OS === 'android' && (
                <Text>{mydate.toString()}</Text>
            )
          }
       </SafeAreaView>
    );
 };
 const styles = StyleSheet.create({
    container: {
       alignItems: "center",
       justifyContent: "center",
       margin: 10
    },
 });