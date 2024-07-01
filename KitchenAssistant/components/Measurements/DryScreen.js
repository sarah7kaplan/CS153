import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

function DryScreen() {
    const [grams, setGrams] = useState(0);
    const [ounces, setOunces] = useState(0);

    const convToOunces = () => {
        if (grams != 0) {
            const oz = parseFloat(grams) * 0.03527;
            setOunces(oz.toFixed(2));
        }
    };

    const convToGrams = () => {
        if (ounces != 0) {
          const g = parseFloat(ounces) / 0.03527;
          setGrams(g.toFixed(2));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Enter grams: 
            </Text>
            <TextInput
                style={styles.input}
                value={grams}
                onChangeText={(text) => setGrams(parseFloat(text))}
                keyboardType="numeric"
            />
            <Text style={styles.label}>
                Or enter ounces:
            </Text>
            <TextInput
                style={styles.input}
                value={ounces}
                onChangeText={(text) => setOunces(parseFloat(text))}
                keyboardType="numeric"
            />
            <View style={{...styles.container, flexDirection: 'row'}}>
                <View style={{marginRight: 10}}>
                    <Button title="Convert to Ounces" onPress={convToOunces} />
                </View>
                <View>
                    <Button title="Convert to Grams" onPress={convToGrams} />
                </View>
            </View>
            {grams != 0 && (
                <Text style={styles.result}>
                    {grams} grams{'\n\n'}=
                </Text>
            )}
            {ounces != 0 && (
                <Text style={styles.result}>
                    {ounces} ounces
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
    result: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
});

export default DryScreen;
