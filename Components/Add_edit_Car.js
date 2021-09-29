import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const Add_edit_Car = ({navigation,route}) => {

    const initialState = {
        brand: '',
        model: '',
        year: '',
        licensePlate: ''
    }

    const [newCar,setNewCar] = useState(initialState);

    /*Returnere true, hvis vi er på edit car*/
    const isEditCar = route.name === "Edit Car";

    useEffect(() => {
        if(isEditCar){
            const car = route.params.car[1];
            setNewCar(car)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewCar(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewCar({...newCar, [name]: event});
    }

    const handleSave = () => {

        const { brand, model, year, licensePlate } = newCar;

        if(brand.length === 0 || model.length === 0 || year.length === 0 || licensePlate.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditCar){
            const id = route.params.car[0];
            try {
                firebase
                    .database()
                    .ref(`/Cars/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ brand, model, year, licensePlate });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const car = [id,newCar]
                navigation.navigate("Car Details",{car});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{

            try {
                firebase
                    .database()
                    .ref('/Cars/')
                    .push({ brand, model, year, licensePlate });
                Alert.alert(`Saved`);
                setNewCar(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newCar[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                {/*Hvis vi er inde på edit car, vis save changes i stedet for add car*/}
                <Button title={ isEditCar ? "Save changes" : "Add car"} onPress={() => handleSave()} />
            </ScrollView>
        </SafeAreaView>
    );
}

export default Add_edit_Car;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});
