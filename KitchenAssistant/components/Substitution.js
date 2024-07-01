import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, StyleSheet } from 'react-native';
import axios from 'axios'; 
import open_api_key from './open_api_key';

const Substitution = () => {
    const [data,setData] = useState([]);
    const [ingredientText,setIngredientText] = useState("");
    const [quantityText,setQuantityText] = useState("");
    const [prompt,setPrompt] = useState("What is a common substitute for brown sugar?");
    const [loading,setLoading] = useState(true);
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
                        Authorization: 'Bearer ' +APIKey,
                    },
                };
                const prefix =
                    "You are a substitution guide for when a user is cooking and doesn't" +
                    " have an ingredient in their recipe. The user asks for a" +
                    " substitution for this ingredient in this quantity: ";
    
                const msg_data = {
                    'model': 'gpt-3.5-turbo',
                    'messages': [{'role': 'user', 'content': prefix+prompt}],
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
    }, [prompt]);
    


    useEffect(() => {getResponse()}, [prompt])

    useEffect(() => {
        const handler = setTimeout(() => {
            getResponse();
        }, 500); // pause 500ms, was having problems with sending too many requests

        return () => {
            clearTimeout(handler);
        };
    }, [prompt, getResponse]);

    const ChatReponse = ({role,content}) => (
        <View style={{backgroundColor:'lightblue',margin:10,padding:20,}}>
            <Text>ChatGPT Response to the prompt is:</Text>
            <Text style={{backgroundColor:'white'}}>{content}</Text>
        </View>
    );

    const debugging = true;
    return(
        <SafeAreaView style={{flex:1, fontSize:24, margin:30}}>
            <Text style={{marginTop:30}}>Ingredient: </Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setIngredientText(text)}
                value={ingredientText}
            />
            <Text>Quantity:</Text>
            <TextInput 
                style={styles.input}
                onChangeText = {text => setQuantityText(text)}
                value = {quantityText}
            />

            <Button
                onPress={() => {setLoading(true); setData({choices:[]}); setPrompt(quantityText+" "+ingredientText);}}
                title={loading?'awaiting response':"Ask GPT"}
                color="#841584"
                accessibilityLabel="Send"
            />

            
            {debugging && 
            <Text>
                {JSON.stringify(data.choices) }
            </Text>}
            
            
            <FlatList
                data={data.choices}
                keyExtractor={({ index }) => index}
                renderItem={({item}) => (
                    <ChatReponse {...item.message} />
                   
                    
                )}
            />   

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        padding:10, 
        margin:10
    },
});

export default Substitution;