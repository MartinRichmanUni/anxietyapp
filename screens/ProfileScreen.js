import { View, Text, TouchableOpacity, Modal, TextInput, Alert} from 'react-native';
import { styles } from '../styles/stylesheet';
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileScreen ({ navigation }) {

    var user_ID = global.user_ID;
    const [profile, setProfile] = useState([]);
    const [modalchangeVisible, setModalChangeVisible] = useState(false);
    const [modalcheckVisible, setModalCheckVisible] = useState(false);
    const [newPass, setNewPassword] = useState();
    const [user_password, setPassword] = useState();

    //Check Current Password for User
    const checkPass = () => {
        axios.get('http://192.168.0.15:19007/getPassword', {
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

    //Change Password for User
    const changePass = () => {
        axios.post('http://192.168.0.15:19007/changePassword', {
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
        axios.get('http://192.168.0.15:19007/getUser', {
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
                        <TouchableOpacity
                        onPress={checkPass}>
                            <Text> Confirm </Text>
                        </TouchableOpacity>
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
                        <TouchableOpacity
                        onPress={changePass}>
                            <Text> Change Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

