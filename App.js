import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Text, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from "react";
import axios from "axios";
import { useFonts } from 'expo-font';

import {styles} from './styles/stylesheet';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Tools from './screens/Tools';
import { HelpfulThoughts, Journal, Supporters, Mood} from './screens/Tools';
import { Anxiety, Treatment, Symptoms } from './screens/HomeScreen';

const AuthContext = React.createContext();
// URL for connecting to Node Server
const url = 'http://192.168.0.15:19007';
// Creation of Global variable
global.url = url;

/*
  Boolean based on if TextInput is empty or not
*/
function emptyCheck(user_input) {
  if (user_input.trim())
  {
    return true;
  } 
  else
  {
    return false;
  }
}

/*
  Regex Check for Uppercase letter, number and special character
*/
export function checkPasswordRegex(str)
{
    var passRegex =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,250}$/;
    return passRegex.test(str);
}

function LoginScreen({ navigation }) {

  const [user_email, setEmail] = useState();
  const [user_password, setPassword] = useState();

  const { signIn } = React.useContext(AuthContext);

  const loginCheck = () => {
    axios.get(url + '/login', {
      params: {
        user_email: {user_email},
        user_password: {user_password},
      },
    })
    .then((response) => 
    { 
        if (!Object.keys(response.data).length)
        // if no data is found alert user
        {
          Alert.alert("Login", "Email address or password is incorrect");
        } 
        else 
        {
          //Create Global User ID variable and Sign In
          {response.data.map((user) => (
            global.user_ID = user.user_ID      
          ))}
          signIn({ user_email, user_password })
        }
    })
    .catch((error) => console.log(error)); 
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

  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcheck, setPassCheck] = useState("");

  const emailRegExp = new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$");

  /*
    Return Boolean based on specified regex
  */
  function validateEmail(email) {
      return emailRegExp.test(email);
  }

  /* 
    Check validation of all fields to ensure they aren't empty
    Check validation of user inputted email, matches regex
    Check validation of password, matches regex and is at least 7 characters long
    Check validation that password and check password matches
  */
  function onSubmit() {
    let validCheck = 1;

    if (!emptyCheck(fname) || !emptyCheck(lname) || !emptyCheck(email) || !emptyCheck(password) || !emptyCheck(passcheck)) {
      Alert.alert("Error", "Some fields may be empty");
      validCheck = 0;
    }else if (!validateEmail(email)) {
      Alert.alert("Error", "Email is not in the specified format");
      validCheck = 0;
    }else if (!checkPasswordRegex(password)) {
      Alert.alert("Error", "Password requires a letter, number and special character and at least 7 characters long");
      validCheck = 0;
    }else if (password != passcheck) {
      Alert.alert("Error", "Passwords do not match");
      validCheck = 0;
    }
    
    if (validCheck) {
      addUser();
      Alert.alert("Account Created", "Account successfully created!");
      navigation.navigate("Login");
    }
  }

  const addUser = () => {
    axios.post(url + '/register', {
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
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const customHeaderStyle = {
  headerStyle: {
    backgroundColor: '#219ebc',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

function LoginStackScreen() {
  return (
    <LoginStack.Navigator 
    screenOptions={customHeaderStyle}>
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Register" component={RegisterScreen} />
    </LoginStack.Navigator>
  );
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator 
    screenOptions={customHeaderStyle}>
      <HomeStack.Screen name ="Home" component={HomeScreen} />
      <HomeStack.Screen name ="Anxiety" component={Anxiety} />
      <HomeStack.Screen name ="Symptoms" component={Symptoms} />
      <HomeStack.Screen name ="Treatment" component={Treatment} />
    </HomeStack.Navigator>
  );
};

function ToolStackScreen() {
  return (
    <ToolStack.Navigator
    screenOptions={customHeaderStyle}>
      <ToolStack.Screen name="Tools" component={Tools} />
      <ToolStack.Screen name="Journal" component={Journal} />
      <ToolStack.Screen name="Helpful Thoughts" component={HelpfulThoughts} />
      <ToolStack.Screen name="Supporters" component={Supporters} />
      <ToolStack.Screen name="Mood Tracker" component={Mood} />
    </ToolStack.Navigator>
  );
};

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
    screenOptions={customHeaderStyle}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  )
};

function AppTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, }}>
        <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
        <Tab.Screen name="ToolsScreen" component={ToolStackScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileStackScreen} />
  </Tab.Navigator>
  );
};

export default function App() {

  /* 
    Credit to https://blog.logrocket.com/adding-custom-fonts-react-native/
    Load custom fonts from the assets folder for use
  */
  const [found] = useFonts({
      Oswald: require('./assets/fonts/Oswald-Regular.ttf'),
      Abel: require('./assets/fonts/Abel-Regular.ttf'),
  });

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // Fetch the token from storage then navigate to our appropriate place
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  /*
    Specification of token and case type based on option chosen,
    via https://reactnavigation.org/docs/auth-flow/
  */
  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async () => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );


  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer >
        {state.userToken == null ? <LoginStackScreen /> : <AppTab /> }
      </NavigationContainer>
    </AuthContext.Provider> 
  );
};

