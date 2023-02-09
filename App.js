import 'react-native-gesture-handler';
import {  SafeAreaProvider} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from "react";
import axios from "axios";
import {styles} from './styles/stylesheet';

import HomeScreen from './screens/HomeScreen';
import { Journal } from './screens/Tools';
import { Goals } from './screens/Tools';
import { Supporters } from './screens/Tools';
import { Mood } from './screens/Tools';
import Tools from './screens/Tools';

function LoginScreen({ navigation }) {

  const [user_email, setEmail] = useState();
  const [user_password, setPassword] = useState();

  const loginCheck = () => {
    axios.get('http://192.168.0.15:19007/login', {
      params: {
        user_email: {user_email},
        user_password: {user_password},
      },
    }).then((response) => {
        if (!Object.keys(response.data).length) {
          // if no data is found alert user
          Alert.alert("Login", "Email address or password is incorrect");
          
        } else {

          {response.data.map((user) => (
            global.user_ID = user.user_ID      
          ))}
          //Testing purposes
          console.log(global.user_ID);
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
        onPress={()=> navigation.navigate("Home")}>
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

const LoginStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ToolStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Register" component={RegisterScreen} />
        <LoginStack.Screen name="Home" component={HomeTab} />
    </LoginStack.Navigator>
  );
};

function ToolStackScreen() {
  return (
    <ToolStack.Navigator screenOptions={{ headerShown: false }}>
      <ToolStack.Screen name="Tools" component={Tools} />
      <ToolStack.Screen name="Journal" component={Journal} />
      <ToolStack.Screen name="Goals" component={Goals} />
      <ToolStack.Screen name="Supporters" component={Supporters} />
      <ToolStack.Screen name="Mood Tracker" component={Mood} />
    </ToolStack.Navigator>
  );
}

function HomeTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="ToolsScreen" component={ToolStackScreen} />
  </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.AndroidSafeArea}>
      <NavigationContainer>
      <LoginStackScreen />
    </NavigationContainer>
    </SafeAreaProvider>
    
  );
};

