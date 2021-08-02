
import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const CarDetails = ({route,navigation}) => {
    const [car,setCar] = useState({});

    useEffect(() => {
        setCar(route.params.car[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setCar({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditCar skærmen og sender bilen videre med
        const car = route.params.car
        navigation.navigate('Edit Car', { car });
    };

    console.log(route.params.car[1],"cardetails")

    // Vi spørger brugeren om han er sikker
    const confirmDelete = () => {
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the car?', [
                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        } else {
            if(confirm('Er du sikker på du vil slette denne bil?')){
                handleDelete()
            }
        }
    };


    // Vi sletter den aktuelle bil
    const  handleDelete = () => {
        const id = route.params.car[0];
        try {
            firebase
                .database()
                // Vi sætter bilens ID ind i stien
                .ref(`/Cars/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
        } catch (error) {
            Alert.alert(error.message);
        }

    };


    if (!car) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            <View style={styles.row}>
                <Text style={styles.label}>Brand </Text>
                <Text style={styles.value}>{car.brand}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Model</Text>
                <Text style={styles.value}>{car.model}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Year</Text>
                <Text style={styles.value}>{car.year}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>License Plate</Text>
                <Text style={styles.value}>{car.licensePlate}</Text>
            </View>
        </View>
    );
}

export default CarDetails;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start' },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { width: 100, fontWeight: 'bold' },
    value: { flex: 1 },
});
