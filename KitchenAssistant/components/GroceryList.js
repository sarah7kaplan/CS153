import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Modal, Pressable } from 'react-native';
import { useValue } from './ValueContext';

const Item = ({ item, onDelete }) => (
    <View style={styles.item}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text> </Text>
        <Button title='Delete' onPress={() => onDelete(item)} color="red" />
    </View>
);

const GroceryList = () => {
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [IDnum, setIDnum] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const {currentValue, setCurrentValue} = useValue();

    useEffect(() => {
        setIngredients(currentValue.groceries || []);
        const maxID = Math.max(...(currentValue.groceries || []).map(item => item.ID), 0);
        setIDnum(maxID + 1);
    }, [currentValue]);

    const deleteIngredient = (ingr) => {
        const updatedIngredients = ingredients.filter(item => item.ID !== ingr.ID);
        setIngredients(updatedIngredients);
        setCurrentValue({...currentValue, groceries: updatedIngredients});
    };

    const addIngredient = () => {
        if (ingredient !== '') {
            const newIngredient = {name: ingredient, ID: IDnum};
            const updatedIngredients = [...ingredients, newIngredient];
            setIngredients(updatedIngredients);
            setIDnum(IDnum + 1);
            setIngredient('');
            setModalVisible(false);
            setCurrentValue({...currentValue, groceries: updatedIngredients});
        }
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>Add Ingredient</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setIngredient(text)}
                            value={ingredient}
                            placeholder="Enter Ingredient"
                        />
                        <View style={styles.buttonContainer}>
                            <Button title="Add" onPress={addIngredient} color={'darkmagenta'} />
                            <View style={styles.buttonSpacer} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
                        </View>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={ingredients}
                renderItem={({ item }) => <Item item={item} onDelete={deleteIngredient} />}
                keyExtractor={item => item.ID.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: '#E0BBE4',
    },
    item: {
        backgroundColor: '#C291C2',
        padding: 20,
        margin: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    itemText: {
        color: 'white',
        fontSize: 17,
    },
    addButton: {
        backgroundColor: 'darkmagenta',
        padding: 10,
        margin: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: '#C79BD3',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#7F00FF',
        borderWidth: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
    },
    buttonSpacer: {
        width: 10,
    },
});

export default GroceryList;