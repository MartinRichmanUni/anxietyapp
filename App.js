import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from "react";
import axios from "axios";
import {styles} from './styles/stylesheet';

import HomeScreen from './screens/HomeScreen';


function LoginScreen({ navigation }) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginCheck = () => {
    axios.get('http://192.168.0.15:19007/login', {
      params: {
        email: {email},
        password: {password},
      },
    }).then((response) => {
        if (!Object.keys(response.data).length) {
          // if no data is found alert user
          Alert.alert("Login", "Email address or password is incorrect");
        } else {
          navigation.navigate("Home");
        }
    }).catch((error) => console.log(error)); 
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <TextInput 
        style={styles.inputView} 
        onChangeText={setEmail} 
        placeholderTextColor="#003f5c"
        placeholder='Email'/>
        <TextInput style={styles.inputView} 
        onChangeText={setPassword} 
        placeholderTextColor="#003f5c"
        placeholder='Password'/>
        <TouchableOpacity
        onPress={() => navigation.navigate("Home")}>
          <Text> Forgotten Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style = {styles.loginBtn}
        onPress={loginCheck}
        >
          <Text style={{fontSize: 30}}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigation.navigate("Register")}>
          <Text> Create an Account</Text>
        </TouchableOpacity>
    </View>
  );
};

function RegisterScreen({navigation}) {

  const emailRegExp = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

  const [fname, setFName] = useState();
  const [lname, setLName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passcheck, setPassCheck] = useState();

  function checkPasswords() {
    if (password == passcheck) {
      return 1;
    } else {
      return 0;
    }
  }

  function validatePassword() {
    if (password.length > 15 || password.length < 6) {
      return 0;
    } else {
      return 1;
    }
  }

  function validateEmail() {
    if (email == null) {
      Alert.alert("Alert", "Email address is required");
    } else {
      return emailRegExp.test(email);
    }
  }

  //Validation check
  function onSubmit() {
    let validCheck = 1;

    if (validCheck) {
      addUser();
      Alert.alert("Account Created", "Account successfully created!")
      navigation.navigate("Login");
    }
  }

  const addUser = () => {
    axios.post('http://192.168.0.15:19007/register', {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
    }).then(() => {
      console.log("success");
    }).catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <TextInput 
      onChangeText={setFName}
      style={styles.inputView} 
      placeholder="First Name"
      value ={fname}/>
      <TextInput 
      onChangeText={setLName}
      style={styles.inputView} 
      placeholder="Last Name"
      value ={lname}/>
      <TextInput 
      onChangeText={setEmail}
      style={styles.inputView} 
      placeholder="Email Address"
      value ={email}/>
      <TextInput 
      onChangeText={setPassword}
      secureTextEntry={true}
      style={styles.inputView} 
      placeholder="Password"
      value ={password}/>
      <TextInput 
      onChangeText={setPassCheck}
      secureTextEntry={true}
      style={styles.inputView} 
      placeholder="Confirm Password"
      value ={passcheck}/>
      <TouchableOpacity
        onPress={() => onSubmit()}
        style = {styles.loginBtn}
      >
        <Text style={{fontSize: 30}}> Create Account </Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

