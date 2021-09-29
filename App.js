import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import CarList from "./Components/CarList";
import Add_edit_Car from "./Components/Add_edit_Car";
import CarDetails from "./Components/CarDetails";
import Ionicons from "react-native-vector-icons/Ionicons";




export default function App() {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const firebaseConfig = {
        apiKey: "AIzaSyASNfvVVVdRszY-ymthux_LHlfUhw_6KE4",
        authDomain: "fir-advanced-99de4.firebaseapp.com",
        databaseURL: "https://fir-advanced-99de4-default-rtdb.firebaseio.com",
        projectId: "fir-advanced-99de4",
        storageBucket: "fir-advanced-99de4.appspot.com",
        messagingSenderId: "911562934749",
        appId: "1:911562934749:web:d7962e40a59c25cd630e34",
        measurementId: "G-6WQV0JJ6LB"
    };


    // Vi kontrollerer at der ikke allerede er en initialiseret instans af firebase
    // Så undgår vi fejlen Firebase App named '[DEFAULT]' already exists (app/duplicate-app).

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const StackNavigation = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen name={'Car List'} component={CarList}/>
                <Stack.Screen name={'Car Details'} component={CarDetails}/>
                <Stack.Screen name={'Edit Car'} component={Add_edit_Car}/>
            </Stack.Navigator>
        )
    }

    return (
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
              <Tab.Screen name={'Add'} component={Add_edit_Car} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
}
