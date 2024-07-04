import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios'; 
import open_api_key from './open_api_key';

const Substitution = () => {
    const [data, setData] = useState({ choices: [] });
    const [ingredientText, setIngredientText] = useState("");
    const [quantityText, setQuantityText] = useState("");
    const [prompt, setPrompt] = useState("What is a common substitute for brown sugar?");
    const [loading, setLoading] = useState(true);
    const APIKey = open_api_key;

    const getResponse = useCallback(async () => {
        const maxRetries = 5;
        let retries = 0;
    
        while (retries < maxRetries) {
            try {
                const url = 'https://api.openai.com/v1/chat/completions';
                const config = {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + APIKey,
                    },
                };
                const prefix =
                    "You are a substitution guide for when a user is cooking and doesn't" +
                    " have an ingredient in their recipe. The user asks for a" +
                    " substitution for this ingredient in this quantity: ";
    
                const msg_data = {
                    'model': 'gpt-3.5-turbo',
                    'messages': [{ 'role': 'user', 'content': prefix + prompt }],
                    'temperature': 0.7,
                };
    
                const response = await axios.post(url, msg_data, config);
                
                const result = response.data;
                setLoading(false);
                setData(result);
                break; // Exit the loop if the request is successful
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    retries += 1;
                    const retryAfter = error.response.headers['retry-after'] || 2 ** retries;
                    await new Promise(res => setTimeout(res, retryAfter * 1000));
                } else {
                    console.error(error);
                    break; // Exit the loop if it's a different error
                }
            } finally {
                setLoading(false);
            }
        }
    }, [prompt, APIKey]);    

    useEffect(() => {
        getResponse();
    }, [prompt, getResponse]);

    const ChatResponse = ({ role, content }) => (
        <View style={styles.chatContainer}>
            <Text style={styles.chatRole}>{role}</Text>
            <Text style={styles.chatContent}>{content}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>Ingredient:</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setIngredientText(text)}
                value={ingredientText}
                placeholder="Enter ingredient"
            />
            <Text style={styles.label}>Quantity:</Text>
            <TextInput 
                style={styles.input}
                onChangeText={text => setQuantityText(text)}
                value={quantityText}
                placeholder="Enter quantity"
            />

            <Button
                onPress={() => {
                    setLoading(true);
                    setData({ choices: [] });
                    setPrompt(quantityText + " " + ingredientText);
                }}
                title={loading ? 'Awaiting response' : 'Ask GPT'}
                disabled={loading || !ingredientText || !quantityText}
                color="darkmagenta"
            />

            <FlatList
                data={data.choices}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <ChatResponse {...item.message} />}
                style={styles.flatList}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E0BBE4',
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
    flatList: {
        width: '100%',
        marginTop: 20,
    },
    chatContainer: {
        backgroundColor: 'lightblue',
        marginVertical: 10,
        padding: 10,
        borderRadius: 8,
        width: '100%',
    },
    chatRole: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    chatContent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
    },
});

export default Substitution;
