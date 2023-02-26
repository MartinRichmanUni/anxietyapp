import { View ,TouchableOpacity, Text, Alert, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import { styles } from '../styles/stylesheet';
import React, { useEffect, useState } from "react";
import moment from 'moment'; 
import axios from "axios";

export function Journal() {

    const [entry_title, setTitle] = useState("");
    const [entry_desc, setDesc] = useState("");
    var entry_date = moment().format("YYYY,MM,DD");
    const [entries, setEntries] = useState([]);
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
                            </View>
                        ))}
            </ScrollView>
        </View>
    )
};

export function Goals() {

    const [goals, setGoals] = useState([]);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        axios.get('http://192.168.0.15:19007/getGoals', {
            params: {
            
        },
        }).then((response) => {
            setGoals(response.data); 
            setAdded(false);    
        }).catch((error) => console.log(error));
    },[added]);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Text> Setting Goals and Objectives is a great way of setting targets to measure progress. </Text>
                
            </ScrollView>
        </View>
    );
};

export function Supporters() {

    const [supporter, setSupporter] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [added, setAdded] = useState(false);
    const [supporter_fname, setSuppFName] = useState();
    const [relationship_ID, setRelationshipID] = useState();

    const supporterSubmit = () => {
        axios.post('http://192.168.0.15:19007/sendSupporter', {
          supporter_fname: supporter_fname,
          relationship_ID: relationship_ID,
          user_ID: global.user_ID,
        }).then(() => {
            setAdded(true)
            setSuppFName("");
            setRelationshipID();
          Alert.alert("Success", "Supporter has been saved!");
        }).catch((error) => console.log(error));
    };

    
    useEffect(() => {
        axios.get('http://192.168.0.15:19007/getSupporters', {
            params: {
                user_ID: {user_ID},
            },
        })
        .then((response) => {
            setSupporter(response.data); 
            setAdded(false);    
        }).catch((error) => console.log(error));
    },[added]);
    

    // Load relationship data and set Array
    useEffect(() => {
        axios.get('http://192.168.0.15:19007/getRelationships')
        .then((response) => {

            // Loaded data formatted for drop-down list
            let relArray = response.data.map((item) => {
                return {key: item.relationship_ID, value: item.relationship_title}
              })

            setRelationships(relArray);     
        }).catch((error) => console.log(error));
    },[]);

    return (
        <View style={styles.container}>
            <Text> Adding supporters is a great way of visualing your support group. Especially important in times where you may feel isolated and alone, it helps provide that knowledge that there are people there for you</Text>
            <View>
                <Text> Add New Supporter </Text>
                <TextInput
                onChangeText={setSuppFName}
                placeholder='Supporter Name'
                value={supporter_fname}
                />
                <SelectList 
                setSelected={setRelationshipID} 
                data={relationships} 
                />
                <TouchableOpacity
                    style
                    onPress={supporterSubmit}>
                        <Text> Add New Supporter </Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text> Supporters </Text>
                { supporter.map((supporter)=>(
                            <View key={supporter.supporter_ID}>
                                <View>
                                    <Text > {supporter.supporter_fname } </Text>
                                </View>   
                            </View>
                        ))}
            </View>
        </View>
    );
};

export function Mood() {

    const [moods, setMoods] = useState([]);
    const [mood_ID, setMoodID] = useState();
    var tracker_date = moment().format("YYYY,MM,DD");
    const [tracker_influence, setInfluence] = useState();
    const time = [
        "00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
        "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"
    ];
    const [tracker_time , setTime] = useState();

    const moodSubmit = () => {
        axios.post('http://192.168.0.15:19007/sendMood', {
          tracker_date: tracker_date,
          tracker_time: tracker_time,
          tracker_influence: tracker_influence,
          mood_ID: mood_ID,
          user_ID: global.user_ID,
        }).then(() => {
          Alert.alert("Success", "Mood has been saved!");
        }).catch((error) => console.log(error));
    };

    // Load moods data and set Array
    useEffect(() => {
        axios.get('http://192.168.0.15:19007/getMoods')
        .then((response) => {

            // Loaded data formatted for drop-down list
            let moodArray = response.data.map((item) => {
                return {key: item.mood_ID, value: item.mood_title}
              })

            setMoods(moodArray);     
        }).catch((error) => console.log(error));
    },[]);

    return (
            <View style={styles.container}>
            <View> 
                <Text> Mood Tracker </Text>
            </View>
                <Text> Being able to track ones mood throughout the day provides a better understanding of what times of day may affect an individuals mood the most, such as early morning due to the need to get to work or school.</Text>
                <Text> This can help to identify specific triggers or causes of anxiety and help in managing those triggers so they occur less or are less impactful</Text>
                <View>
                    <Text>Time of day:</Text>
                    <SelectList 
                    setSelected={setTime}
                    data={time} 
                    />
                    <Text>How I am feeling:</Text>
                    <SelectList 
                    setSelected={setMoodID}
                    data={moods} 
                    save="key"
                    />
                    <Text> What has influenced my mood:</Text>
                    <TextInput style={styles.journalEntry}
                        multiline
                        numberOfLines={3}
                        maxLength={100}
                        placeholder='My mood has been influenced by'
                        onChangeText={setInfluence}
                        value={tracker_influence}/>
                    <TouchableOpacity
                        style
                        onPress={moodSubmit}>
                            <Text> Add New Supporter </Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
};

export default function Tools({ navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.contRow}>
                <TouchableOpacity
                    style={styles.toolThumb}
                    onPress={() => navigation.navigate("Journal")}>
                        <Text> Journal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.toolThumb}
                    onPress={() => navigation.navigate("Goals")}>
                        <Text> Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.toolThumb}
                    onPress={() => navigation.navigate("Supporters")}>
                        <Text> Supporters</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.toolThumb}
                    onPress={() => navigation.navigate("Mood Tracker")}>
                        <Text> Mood Tracker</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};