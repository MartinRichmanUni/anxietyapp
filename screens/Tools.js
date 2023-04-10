import { View ,TouchableOpacity, Text, Alert, ScrollView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import { styles } from '../styles/stylesheet';
import React, { useEffect, useState } from "react";
import { DataTable } from 'react-native-paper';
import moment from 'moment'; 
import axios from "axios";

export function Journal() {

    const [entry_title, setTitle] = useState("");
    const [entry_desc, setDesc] = useState("");
    var entry_date = moment().format("YYYY,MM,DD");
    const [entries, setEntries] = useState([]);
    const [added, setAdded] = useState(false);
    var user_ID = global.user_ID;
    var url = global.url;
    
    //Send user entered data to database
    const journalSubmit = () => {
        axios.post(url + '/sendEntry', {
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
        axios.get(url + '/getEntries', {
            params: {
            user_ID: {user_ID},
        },
        }).then((response) => {
            setEntries(response.data); 
            setAdded(false);    
        }).catch((error) => console.log(error));
    },[added]);

    return (
            <ScrollView>
                <View style={styles.infoBlock}>
                        <Text style={{fontFamily: 'Abel', fontSize: 18}}> 
                        The journal is a great way of conceptualising thoughts and putting them onto paper. This provides a method of helping to understand what exactly you are thinking and feeling at any given moment.
                    </Text> 
                </View>  
                <View style={styles.toolCont}>
                    <Text style={styles.header}> New Journal Entry </Text>
                <View style={styles.rowCont}>
                    <View style={{flex: 2, borderBottomWidth: .5}}>
                    <TextInput style={styles.titleFont}
                        placeholder='Entry Title'
                        onChangeText={setTitle}
                        value={entry_title}
                    />
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.italicFont}> {entry_desc.length}/250 characters</Text>    
                    </View>
                    
                </View>
                        <TextInput style={styles.journalEntry}
                        multiline
                        numberOfLines={3}
                        maxLength={250}
                        placeholder='I am feeling this way'
                        onChangeText={setDesc}
                        value={entry_desc}/>
                    <View style={styles.btnCont}>
                        <TouchableOpacity style={styles.btnSubmit}
                            onPress={journalSubmit}>
                            <Text style={styles.btnText}> Submit Entry</Text>
                        </TouchableOpacity>
                    </View>  
                </View>
                <View>
                <Text style={styles.header}> Previous Entries </Text>
                        { entries.map((entry)=>(
                            <View key={entry.entry_ID} style={styles.entryCont}>
                                    <View style={styles.rowCont}>
                                        <View style={{flex: 2}}>
                                            <Text style={styles.titleFont}> { entry.entry_title } </Text>
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text style={styles.italicFont}> {entry.entry_date} </Text>
                                        </View>
                                    </View>
                                    <View style={styles.journalEntry}>
                                        <Text style={styles.oswaldFont}> {entry.entry_desc} </Text>
                                    </View>
                                </View>
                        ))}
                </View>
                    
            </ScrollView>
    )
};

export function Goals() {

    const [goals, setGoals] = useState([]);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        axios.get(url + '/getGoals', {
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
        axios.post(url + '/sendSupporter', {
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
        axios.get(url + '/getSupporters', {
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
        axios.get(url + '/getRelationships')
        .then((response) => {

            // Loaded data formatted for drop-down list
            let relArray = response.data.map((item) => {
                return {key: item.relationship_ID, value: item.relationship_title}
              })

            setRelationships(relArray);     
        }).catch((error) => console.log(error));
    },[]);

    return (
        <ScrollView>
            <View style={styles.infoBlock}>
                <Text style={{fontFamily: 'Abel', fontSize: 18}}> Adding supporters is a great way of visualing your support group. Especially important in times where you may feel isolated and alone, it helps provide that knowledge that there are people there for you</Text>
            </View>
            <View style={styles.toolCont}>
                <Text style={styles.header}> Add New Supporter </Text>
                <TextInput
                style={styles.titleFont}
                onChangeText={setSuppFName}
                placeholder='Supporter Name'
                value={supporter_fname}
                />
                <View style={{paddingVertical: 10}}>
                    <SelectList 
                    setSelected={setRelationshipID} 
                    data={relationships} 
                    />
                </View>
                <View style={styles.btnCont}>
                        <TouchableOpacity style={styles.btnSubmit}
                            onPress={supporterSubmit}>
                            <Text style={styles.btnText}> Add New Supporter </Text>
                        </TouchableOpacity>
                    </View> 
            </View>
            <View >
                <Text style={styles.header}> Supporters </Text>
                { supporter.map((supporter)=>(
                            <View key={supporter.supporter_ID} style={styles.toolCont}>
                                <View style={styles.suppTitleCont}>
                                    <Text style={styles.suppTitle}> Supporter's Name </Text>
                                </View>
                                <View style={styles.suppDetails}>
                                    <Text style={styles.oswaldFont}> {supporter.supporter_fname } </Text>
                                </View>
                                <View style={styles.suppTitleCont}>
                                    <Text style={styles.suppTitle}> Supporter's Relationship </Text>
                                </View>
                                <View style={styles.suppDetails}> 
                                    <Text style={styles.oswaldFont}> {supporter.relationship_title } </Text>
                                </View>   
                            </View>
                        ))}
            </View>
        
        </ScrollView>
        
    );
};

export function Mood() {

    const [moods, setMoods] = useState([]);
    const [userMoods, setUserMoods] = useState([]);
    const [mood_ID, setMoodID] = useState();
    var tracker_date = moment().format("YYYY,MM,DD");
    const [tracker_influence, setInfluence] = useState();
    const [added, setAdded] = useState(false);
    const time = [
        "00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00",
        "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"
    ];
    const [tracker_time , setTime] = useState();

    const moodSubmit = () => {
        axios.post(url + '/sendMood', {
          tracker_date: tracker_date,
          tracker_time: tracker_time,
          tracker_influence: tracker_influence,
          mood_ID: mood_ID,
          user_ID: global.user_ID,
        }).then(() => {
            setAdded(true);
          Alert.alert("Success", "Mood has been saved!");
        }).catch((error) => console.log(error));
    };

    useEffect(() => {
        // Load moods data and set Array for drop-down list
        axios.get(url + '/getMoods')
        .then((response) => {

            // Loaded data formatted for drop-down list
            let moodArray = response.data.map((item) => {
                return {key: item.mood_ID, value: item.mood_title}
              })

            setMoods(moodArray);   
            setAdded(false);  
        }).catch((error) => console.log(error));

        // Load user moods data and set Array for table
        axios.get(url + '/getUserMoods', {
            params: {
            user_ID: {user_ID},
        },
        }).then((response) => {
            setUserMoods(response.data); 
            setAdded(false);    
        }).catch((error) => console.log(error));
    },[added]);

    return (
        <ScrollView>
            <View style={styles.infoBlock}>
                <Text> Being able to track ones mood throughout the day provides a better understanding of what times of day may affect an individuals mood the most, such as early morning due to the need to get to work or school.</Text>
                <Text> This can help to identify specific triggers or causes of anxiety and help in managing those triggers so they occur less or are less impactful</Text>
            </View>
            <View style={styles.entryCont}>
                <Text style={styles.header}> Add New Mood</Text>
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
                        <Text> Add New Mood </Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
            <DataTable>
                <DataTable.Header >
                    <DataTable.Title >Title</DataTable.Title>
                    <DataTable.Title >Influence</DataTable.Title>
                    <DataTable.Title>Time</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                </DataTable.Header>

                { userMoods.map((userMoods)=>(
                        <DataTable.Row key={userMoods.tracker_ID}>
                            <DataTable.Cell>{userMoods.mood_title}</DataTable.Cell>
                            <DataTable.Cell>{userMoods.tracker_influence}</DataTable.Cell>
                            <DataTable.Cell>{userMoods.tracker_time}</DataTable.Cell>
                            <DataTable.Cell>{userMoods.tracker_date}</DataTable.Cell>
                        </DataTable.Row>
                    ))}

            </DataTable>
            </View>
        </ScrollView>
                
         
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