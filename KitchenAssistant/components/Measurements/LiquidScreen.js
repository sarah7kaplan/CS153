import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

function LiquidScreen() {
    const [milliliters, setMilliliters] = useState(0);
    const [fluidOunces, setFluidOunces] = useState(0);

    const convMLtoFO = () => {
        if (milliliters != 0) {
            const fo = parseFloat(milliliters) * 0.03381;
            setFluidOunces(fo.toFixed(2));
        }
    }

    const convFOtoML = () => {
        if (fluidOunces != 0) {
            const ml = parseFloat(fluidOunces) / 0.03381;
            setMilliliters(ml.toFixed(2));
        }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
                Enter milliliters: 
            </Text>
            <TextInput
                style={styles.input}
                value={milliliters}
                onChangeText={(text) => setMilliliters(parseFloat(text))}
                keyboardType="numeric"
            />
            <Text style={styles.label}>
                Or enter fluid ounces:
            </Text>
            <TextInput
                style={styles.input}
                value={fluidOunces}
                onChangeText={(text) => setFluidOunces(parseFloat(text))}
                keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
                <View style={{marginBottom: 10}}>
                    <Button title="Convert to Fluid Ounces" onPress={convMLtoFO} color="darkmagenta" />
                </View>
                <View>
                    <Button title="Convert to Milliliters" onPress={convFOtoML} color="darkmagenta" />
                </View>
            </View>
            {milliliters != 0 && (
                <Text style={styles.result}>
                    {milliliters} milliliters{'\n\n'}=
                </Text>
            )}
            {fluidOunces != 0 && (
                <Text style={styles.result}>
                    {fluidOunces} fluid ounces
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#E0BBE4',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'col',
        width: '80%',
        marginBottom: 20,
    },
    result: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default LiquidScreen;
