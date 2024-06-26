import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Substitution from '../Substitution';

function SubstitutionScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Substitution Helper</Text>
        <Substitution />
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

export default SubstitutionScreen;