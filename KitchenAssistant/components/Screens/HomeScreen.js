import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useValue} from '../ValueContext';

function HomeScreen() {
    const {currentValue, setCurrentValue} = useValue();

    return (
        <View style={{...styles.container, flexDirection: 'column'}}>
            <View style={{...styles.container, flex: 5}}>
                <Text style={styles.header}>Welcome to Kitchen Assistant!</Text>
                <Text style={styles.bodyText}>
                    To create or edit your grocery list, go to the Grocery List page.{'\n'}
                    To set or check on a timer, go to the Timers page.{'\n'}
                    To convert a measurement, go to the Measurement Converter page.{'\n'}
                    To find a common substitution for an ingredient, go to the Substitutions page.
                </Text>
            </View>
            <View style={{...styles.container, flex: 4, justifyContent: 'flex-start'}}>
                <Text style={styles.bodyText}>
                    Please log in or sign up to continue:
                </Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Username"
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
        textAlign: 'center',
        margin: 10
    },
    header: {
        fontWeight: "bold",
        fontSize: '140%',
    },
    bodyText: {
        fontSize: '100%',
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        marginBottom: 10,
    },
})

export default HomeScreen;