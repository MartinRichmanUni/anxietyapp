import { View, Text} from 'react-native';
import { styles } from '../styles/stylesheet';
import React from 'react';

export function Anxiety() {
    return (
        <View>

        </View>
    )
};

export function Symptoms() {
    return (
        <View>
            
        </View>
    )
};

export function Treatment() {
    return (
        <View>
            
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
                <Text style={styles.titles}> What is Anxiety </Text>
            </View>
            <View style={styles.homeCont}>
                <Text style={styles.titles}> Symptoms Associated </Text>
            </View>
            <View style={styles.homeCont}>
                <Text style={styles.titles}> Treatment Methods Available </Text>
            </View>
        </View>
    );
}

