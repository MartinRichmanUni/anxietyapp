import { View, Text, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import { styles } from '../styles/stylesheet';
import React, { useState, useEffect } from "react";
import axios from "axios";


export default function ProfileScreen ({ navigation }) {

    var user_ID = global.user_ID;
    var url = global.url;
    const [profile, setProfile] = useState([]);
    const [modalchangeVisible, setModalChangeVisible] = useState(false);
    const [modalcheckVisible, setModalCheckVisible] = useState(false);
    const [newPass, setNewPassword] = useState();
    const [user_password, setPassword] = useState();

    //Check Current Password for User
    const checkPass = () => {
        axios.get(url + '/getPassword', {
            params: {
                user_ID: {user_ID},
                user_password: {user_password},
              },
        }).then((response) => {
            if (!Object.keys(response.data).length) {
              // if no data is found alert user
              Alert.alert("Error", "Passwords do not match");
            } else {
                setModalCheckVisible(!modalcheckVisible);
                setModalChangeVisible(true);
                setPassword("");
            }
        }).catch((error) => console.log(error)); 
    };

    //Return back to check Modal and display
    const switchModal = () => {
        setModalCheckVisible(true);
        setModalChangeVisible(!modalchangeVisible);
    };

    //Change Password for User
    const changePass = () => {
        //TO DO: Validate input(not empty)
    
        axios.post(url + '/changePassword', {
          newPass: newPass,
          user_ID: global.user_ID,
        }).then(() => {
            setNewPassword("");
            setModalChangeVisible(!modalchangeVisible);
          Alert.alert("Success", "Password has been successfully changed!");
        }).catch((error) => console.log(error));
    };

    //On screen load, call user data
    useEffect(() => {
        axios.get(url + '/getUser', {
          params: {
            user_ID: {user_ID},
          },
        }).then((response) => {
            setProfile(response.data);   
        }).catch((error) => console.log(error));
    },[]);

    return (
        <View style={styles.container}>
            { profile.map((uprofile)=>(
                <View key={uprofile.user_ID}>
                    <Text> First Name: { uprofile.user_fname} </Text>
                    <Text> Last Name: { uprofile.user_lname} </Text>
                    <Text> Email Address: { uprofile.user_email} </Text>
                </View>
            ))}

            <View>
                <TouchableOpacity>
                    <Text> Change E-mail Address</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => setModalCheckVisible(true)}>
                    <Text> Change Password</Text>
                </TouchableOpacity>
            </View>
            <Modal
            visible={modalcheckVisible}
            transparent={true}
            onRequestClose={() => {
                setModalCheckVisible(!modalcheckVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text> Confirm Current Password</Text>
                        <TextInput
                            placeholder='Current Password'
                            onChangeText={setPassword}
                            value={user_password}
                        />
                        <View >
                            <TouchableOpacity
                            onPress={() => {
                                setModalCheckVisible(!modalcheckVisible);
                              }}>
                                <Text> Cancel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={checkPass}>
                                <Text> Confirm </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
            visible={modalchangeVisible}
            transparent={true}
            onRequestClose={() => {
                setModalChangeVisible(!modalchangeVisible);
            }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text> Enter New Password</Text>
                        <TextInput
                            placeholder='New Password'
                            onChangeText={setNewPassword}
                            value={newPass}
                        />
                        <View >
                            <TouchableOpacity
                            onPress={switchModal}>
                                <Text> Cancel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            onPress={changePass}>
                                <Text> Change Password</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

