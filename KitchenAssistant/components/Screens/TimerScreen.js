import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Timer from '../Timers';
import {useValue} from '../ValueContext';

function TimerScreen() {
    const {currentValue} = useValue();

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{currentValue['username']}'s Timers</Text>
        <Timer />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
        textAlign: 'center',
        backgroundColor: '#E0BBE4',
    },
    header: {
        fontWeight: "bold",
        fontSize: '110%',
    },
    bodyText: {
        fontSize: '80%',
        textAlign: 'center',
    },
})

export default TimerScreen;