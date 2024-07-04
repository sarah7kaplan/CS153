import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import LiquidScreen from './LiquidScreen';
import DryScreen from './DryScreen';

function Measurement() {
    const [isLiquidMode, setIsLiquidMode] = useState(true);

    const toggleMode = () => {
        setIsLiquidMode(!isLiquidMode);
    };

    return (
        <View style={styles.container}>
            <Button
                title={isLiquidMode ? 'Switch to Dry Ingredients' : 'Switch to Liquid Ingredients'}
                onPress={toggleMode}
                color="darkmagenta"
                style={styles.button}
            />
            {isLiquidMode ? <LiquidScreen /> : <DryScreen />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0BBE4',
        padding: 20,
    },
    button: {
        marginBottom: 20,
    },
});

export default Measurement;
