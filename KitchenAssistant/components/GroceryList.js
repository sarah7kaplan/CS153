import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

const Item = ({ item, onDelete }) => (
    <View style={styles.item}>
        <Text>{item.name}</Text>
        <Text> </Text>
        <Button title='Delete' onPress={() => onDelete(item)} />
    </View>
);

const GroceryList = () => {
    // const [recipe, setRecipe] = useState('');
    const [ingredient, setIngredient] = useState('');
    // const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [IDnum, setIDnum] = useState(0);
    const deleteIngredient = (ingr) => {
        setIngredients(ingredients.filter(ingredient => ingredient.ID !== ingr.ID));
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => setIngredient(text)}
                value={ingredient} />
            <Button
                title="Add Ingredient"
                onPress={() => {
                    if (ingredient != '') {
                        setIngredients([...ingredients, {name: ingredient, ID: IDnum}]);
                        setIDnum(IDnum+1);
                        setIngredient('');
                    }
                }} />
            {/* <TextInput 
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={text => setRecipe(text)}
                value={recipe} />
            <Button
                title="Add Recipe Name"
                onPress={() => {
                    setRecipes([...recipes, recipe]);
                    setRecipe('');
                }} /> */}
            <FlatList
                data={ingredients}
                renderItem={({item}) =>  <Item item={item} onDelete={deleteIngredient} /> }
                keyExtractor={item => item.ID.toString()}
             />
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    item: {
        backgroundColor: 'lightblue',
        padding: 20,
        margin: 10,
        alignItems: 'center',
    },
});

export default GroceryList;