import React, {useState} from 'react';
import {View, Platform, SafeAreaView , StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Button';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker'


export default function TimePicker({onPickedTime}) {
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('time');
    const [isDisplayDate, setShow] = useState(false);
    const changeSelectedDate = (event, selectedDate) => {
       const currentDate = selectedDate || mydate;
       setDate(currentDate);
       onPickedTime(currentDate)
    };
    const showMode = (currentMode) => {
      if(Platform.OS === 'android'){
         DateTimePickerAndroid.open({
             value: mydate,
             onChange: (event, date)=>{
                 console.log('event', date)
                 setDate(date || mydate)
                 onPickedTime(date)
             },
             mode: 'time',
             is24Hour: true
         })
     }
     else{
         setShow(true);
         setMode(currentMode);
     }
    };
    const displayTimepicker = () => {
       showMode('time');
    };
    return (
       <SafeAreaView style={styles.container}>
          <View>
             <Button onPress={displayTimepicker} children="Pick Time" height={50} width={100}/>
          </View>
          {isDisplayDate && (
             <DateTimePicker
                value={mydate}
                mode={displaymode}
                is24Hour={true}
                display="default"
                onChange={changeSelectedDate}
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