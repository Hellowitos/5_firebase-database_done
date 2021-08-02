
import * as React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


const CarListItem = (props) => {

    const handlePress = () => {
        // Her pakker vi ting ud fra props
        const {id, onSelect} = props
        // Kalder den onSelect prop vi får, med det ID vi har fået som argument.
        onSelect(id)
    };

    const { car } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
            <Text style={styles.label}>
                {car.brand} {car.model}
            </Text>
        </TouchableOpacity>
    );
}

export default CarListItem;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});
