import { View, Text} from 'react-native';
import { styles } from '../styles/stylesheet';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

//Explanation on Anxiety Screen
export function Anxiety() {
    return (
        <View>
            <Text> This is the page for explaining about Anxiety </Text>
        </View>
    )
};

//Explanation on the Symptoms of Anxiety Screen
export function Symptoms() {
    return (
        <View>
            <Text> This is the page for explaining about the Symptoms Associated </Text>
        </View>
    )
};

//Explanation on the Treatment Methods Screen
export function Treatment() {
    return (
        <View>
            <Text> This is the page for explaining about the Treatement Methods </Text>
        </View>
    )
};

export default function HomeScreen ({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.intro}>
                
                <Text > This is a text box explanining what should be put in here</Text>
            </View>
            <View style={styles.homeCont}>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Anxiety");
                }}
                >
                    <Text style={styles.titles}> What is Anxiety </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.homeCont}>
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Symptoms");
                }}
                >
                    <Text style={styles.titles}> Symptoms Associated </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.homeCont}
            >
                <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Treatment");
                }}>
                    <Text style={styles.titles}> Treatment Methods Available </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

