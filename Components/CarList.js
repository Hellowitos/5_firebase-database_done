
import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import CarListItem from './CarListItem';
import {useEffect, useState} from "react";

const CarList = ({navigation}) => {

    const [cars,setCars] = useState()

    useEffect(() => {
        if(!cars) {
            firebase
                .database()
                .ref('/Cars')
                .on('value', snapshot => {
                        setCars(snapshot.val())
                });
        }
    });

    // Vi viser ingenting hvis der ikke er data
    if (!cars) {
        return <Text>Loading...</Text>;
    }

   const handleSelectCar = id => {
        const car = Object.entries(cars).find( car => car[0] === id /*id*/)
        navigation.navigate('Car Details', { car });
    };
    // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
    const carArray = Object.values(cars);
    // Vi skal også bruge alle IDer, så vi tager alle keys også.
    const carKeys = Object.keys(cars);

    return (
        <View>
            <FlatList
                data={carArray}
                // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
                keyExtractor={(item, index) => carKeys[index]}
                renderItem={({ item, index }) => (
                    <CarListItem
                        car={item}
                        id={carKeys[index]}
                        onSelect={ () => handleSelectCar(carKeys[index])}
                    />
                )}
            />
        </View>
    );
}

export default CarList;
