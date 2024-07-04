import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useValue } from '../ValueContext';

function HomeScreen() {
    const {currentValue, setCurrentValue} = useValue();

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.header}>Welcome to Kitchen Assistant!</Text>
                <Text style={styles.bodyText}>
                    To create or edit your grocery list, go to the Grocery List page.{'\n'}
                    To set or check on a timer, go to the Timers page.{'\n'}
                    To convert a measurement, go to the Measurement Converter page.{'\n'}
                    To find a common substitution for an ingredient, go to the Substitutions page.
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Please enter your name!"
                    onChangeText={(text) => {
                        setCurrentValue({...currentValue, username: text});
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0BBE4',
        padding: 10,
    },
    contentContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 16,
        textAlign: 'center',
    },
    inputContainer: {
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '60%',
        paddingHorizontal: 10,
    },
});

export default HomeScreen;
