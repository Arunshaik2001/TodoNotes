import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Pressable } from 'react-native';
import { useContext, useEffect, useLayoutEffect } from "react"
import { Ionicons } from '@expo/vector-icons'
import TodosScreen from './TodosScreen';
import CompletedTodoScreen from './CompletedTodoScreen';
import * as Notifications from 'expo-notifications'
import { TodosContext } from '../../store/TodosStore';


const TopTabs = createMaterialTopTabNavigator()


function TodoTabScreen({ route, navigation }) {

    const todosContext = useContext(TodosContext)


    useEffect(()=>{
        Notifications.addNotificationReceivedListener((event)=>{
            const todoId = event.request.content.data.id;            
            if(todosContext.todos.length > 0){
                todosContext.updateTodo(todoId, {
                    todoState: 'completed'
                })
            }
        })
    }, [todosContext.todos])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: ({ size }) => {
                return <Pressable onPress={() => {
                    navigation.navigate('TodoEdit')
                }}>
                    <Ionicons name="add" size={30} />
                </Pressable>
            }
        })
    }, [navigation])

    return <TopTabs.Navigator screenOptions={{
        tabBarLabelStyle: {
            color: 'white',
            fontWeight: "bold"
        },
        tabBarIndicatorStyle: {
            backgroundColor: 'blue'
        },
        tabBarStyle: {
            backgroundColor: '#ffb6c1'
        }
    }}>
        <TopTabs.Screen name='Todo' component={TodosScreen} />
        <TopTabs.Screen name='Completed' component={CompletedTodoScreen} />
    </TopTabs.Navigator>
}

export default TodoTabScreen