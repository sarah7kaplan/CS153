import React from 'react';
import {View, StyleSheet} from 'react-native';
import Substitution from '../Substitution';

function SubstitutionScreen() {
    return (
      <View style={styles.container}>
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
        backgroundColor: '#E0BBE4',
    },
    bodyText: {
        fontSize: '80%',
        textAlign: 'center',
    },
})

export default SubstitutionScreen;