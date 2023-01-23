import { View ,TouchableOpacity, Text, Alert, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/stylesheet';
import React, { useEffect, useState } from "react";
import moment from 'moment'; 
import axios from "axios";

export function Journal({ navigation }) {

    const [entry_title, setTitle] = useState("");
    const [entry_desc, setDesc] = useState("");
    var entry_date = moment().format("YYYY,MM,DD");
    const [entries, setEntries] = React.useState([]);
    const [added, setAdded] = useState(false);
    var user_ID = global.user_ID;
    
    //Send user entered data to database
    const journalSubmit = () => {
        axios.post('http://192.168.0.15:19007/sendEntry', {
          entry_title: entry_title,
          entry_desc: entry_desc,
          entry_date: entry_date,
          user_ID: global.user_ID,
        }).then(() => {
            setTitle("");
            setDesc("");
            setAdded(true)
          Alert.alert("Success", "Entry has been saved!");
        }).catch((error) => console.log(error));
      };

    //On screen load, call entry data
    useEffect(() => {
        axios.get('http://192.168.0.15:19007/getEntries', {
            params: {
            user_ID: {user_ID},
        },
        }).then((response) => {
            setEntries(response.data); 
            setAdded(false);    
        }).catch((error) => console.log(error));
    },[added]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
            <Text> 
                The journal is a great way of conceptualising thoughts and putting them onto paper. This provides a proven method of helping to understand what exactly you are thinking and feeling at any given moment.
            </Text>       

            <Text> New Journal Entry </Text>
                <View style={styles.row}>
                    <TextInput
                        placeholder='Entry Title'
                        onChangeText={setTitle}
                        value={entry_title}
                    />
                    <Text> {entry_desc.length}/250 characters</Text>  
                </View>
                <TextInput style={styles.journalEntry}
                multiline
                numberOfLines={3}
                maxLength={250}
                placeholder='I am feeling this way'
                onChangeText={setDesc}
                value={entry_desc}/>
            <TouchableOpacity
                onPress={journalSubmit}>
                <Text> Submit Entry</Text>
            </TouchableOpacity>
                <Text> Previous Entries </Text>
                { entries.map((entry)=>(
                <View key={entry.entry_ID}>
                    <View>
                        <View style={styles.row}>
                            <Text > { entry.entry_title } </Text>
                            <Text> {entry.entry_date} </Text>
                        </View>
                        <Text> {entry.entry_desc} </Text>
                    </View>
                </View>)
            )}
            </ScrollView>
        </View>
    )
};

export default function Tools({ navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Journal")}>
                    <Text> Journal</Text>
            </TouchableOpacity>
        </View>
    );
};