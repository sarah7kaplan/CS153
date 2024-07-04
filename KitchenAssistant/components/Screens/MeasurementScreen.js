import React from 'react';
import {View, StyleSheet} from 'react-native';
import Measurement from '../Measurements/Measurement';

function MeasurementScreen() {
    return (
      <View style={styles.container}>
        <Measurement />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        textAlign: 'center',
        backgroundColor: '#E0BBE4',
    },
})

export default MeasurementScreen;