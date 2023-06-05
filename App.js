import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NotesScreen from './screens/notes/NotesScreen';
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import Note from './screens/notes/Note';
import Todo from './screens/todos/Todo';
import TodoTabScreen from './screens/todos/TodoTabScreen';
import NotesContextProvider from './store/NotesStore';
import TodosContextProvider from './store/TodosStore';
import * as Notifications from 'expo-notifications'
import { useEffect, useState, useCallback } from 'react';
import { init } from './utils/database/TodoDatabase';
import * as SplashScreen from 'expo-splash-screen';
import { initNoteDB } from './utils/database/NoteDatabase';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true
    }
  }
})

const BottomTabs = createMaterialBottomTabNavigator()
const Stack = createNativeStackNavigator()


function NotesStack() {
  return <NotesContextProvider>
    <Stack.Navigator>
      <Stack.Screen name='Notes' component={NotesScreen} />
      <Stack.Screen name='Note' component={Note} />
    </Stack.Navigator>
  </NotesContextProvider>
}

function TodosStack() {
  return <TodosContextProvider>
    <Stack.Navigator>
      <Stack.Screen name='Todos' component={TodoTabScreen} options={{
        title: 'Reminder'
      }} />
      <Stack.Screen name='TodoEdit' component={Todo} />
    </Stack.Navigator>
  </TodosContextProvider>
}



export default function App() {

  const [isDBInitialsed, setIsDBInitialsed] = useState(false)
  const [isNoteDBInitialsed, setIsNoteDBInitialsed] = useState(false)

  useEffect(()=>{
    Promise.all([init(), initNoteDB()])
      .then(() => {
        setIsDBInitialsed(true);
        setIsNoteDBInitialsed(true);
        SplashScreen.hideAsync();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  if(!isDBInitialsed || !isNoteDBInitialsed){
    return null
  }

  return (<>
    <StatusBar style="auto" />
    <NavigationContainer>
      <BottomTabs.Navigator>
        <BottomTabs.Screen name='NotesScreen' component={NotesStack} options={
          {
            title: 'Notes',
            tabBarIcon: ({ focused, color, size }) => {
              return <Foundation name="clipboard-notes" size={24} color={focused ? '#8B0000' : color} />
            }
          }
        } />
        <BottomTabs.Screen name='TodosScreen' component={TodosStack} options={
          {
            title: 'Todos',
            tabBarIcon: ({ focused, color, size }) => {
              return <MaterialCommunityIcons name="reminder" size={24} color={focused ? '#8B0000' : color} />
            }
          }
        } />
      </BottomTabs.Navigator>
    </NavigationContainer>
  </>
  );
}
