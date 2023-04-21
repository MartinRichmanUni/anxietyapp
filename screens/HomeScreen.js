import { View, Text} from 'react-native';
import { styles } from '../styles/stylesheet';
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Unorderedlist from 'react-native-unordered-list';

//Explanation on Anxiety Screen
export function Anxiety() {
    return (
    <ScrollView>
        <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
            <View style={styles.contBottomBdr}>
                <Text style={styles.font20}>
                    Anxiety is a mental health condition which affects millions of individuals worldwide.
                </Text>
            </View>
            <View style={styles.infoBlock_Blue}>
                <Text style={styles.header}>
                    Generalised Anxiety Disorder (GAD)
                </Text>
                <Text style={styles.oswald18}>
                    A condition in which a variety of issues and situations result in you feeling anxious. Usually lasts long-term.
                </Text>
                <Text style={styles.oswald18}>
                    While most people do feel anxious at some point in our lives, individuals who suffer from anxiety,
                    find it difficult to control and manage these anxious thoughts and worries.
                </Text>
            </View>
            <View style={styles.infoBlock_Blue}>
                <Text style={styles.header}>
                    Panic Disorder
                </Text> 
                <Text style={styles.oswald18}>
                    Characterised as an anxiety disorder in which unexpected, intense and recurrent panic attacks occur.
                </Text>
                <Text style={styles.oswald18}>
                    Individuals suffering from panic disorders may experience rapid breathing and heart rate, with a severe sense of terror or something terrible will happen.
                    These attacks can occur either as a result of a trigger or out of nowhere, seeminly for no apparent reason.
                </Text>
            </View>
            <View style={styles.infoBlock_Blue}>
                <Text style={styles.header}>
                    Agoraphobia
                </Text> 
                <Text style={styles.oswald18}>
                    A complex phobia in which an individual may suffer from the fear of leaving a safe space, such as their home.
                </Text>
                <Text style={styles.oswald18}>
                    The severity of agoraphobia varies wildly between each person, with some being housebound while others can be roombound. 
                    All of which can severely impact an individuals daily life as they struggle to leave their defined boundary.
                </Text>
            </View>
        </View>
    </ScrollView>
    )
};

//Explanation on the Symptoms of Anxiety Screen
export function Symptoms() {
    return (
    <ScrollView>
        <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
        <View style={{paddingBottom: 10}}>
            <Text style={styles.font20}>
                There are a number of symptoms associated with anxiety, though they may vary from person to person. 
                So while the list of symptoms tries to include the most common, there are some which you may experience or have difficulties with which are not included.
            </Text>
        </View>
            <View style={styles.infoBlock}>
                <Unorderedlist><Text style={styles.font18}>Low Mood and Depression</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.font18}>Feeling as though you can't stop worrying, feeling as though something will always go wrong</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.font18}>Feeling as though everyone is constantly looking at you, constantly judging</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.font18}>Constantly thinking about negative past experiences, overthinking the situation again and again</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.font18}>Unable to relax, always feeling tense and stressed which takes a physical toll on your body</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.font18}>Always fearing the worst and never finding the positives in any situation</Text></Unorderedlist>
            </View>
            <View style={{paddingTop: 10}}>
                <Text style={styles.font20}>
                    All of these symptoms can vary in how long they last, while some may disappear after a day, others might last for a long time.
                    Some of which may have a larger impact on your day-to-day life, affecting schoolwork, social life, work, and leisure time.
                </Text>
            </View>
        </View>
    </ScrollView>
    )
};

//Explanation on the Treatment Methods Screen
export function Treatment() {
    return (
    <ScrollView>
        <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
            <Text style={styles.font20}>Various treatment methods are available for individuals who may suffer from anxiety. </Text>

            <View style={styles.contBottomBdr}>
                <Text style={styles.font20}>These treatment methods include: </Text>
                <Unorderedlist><Text style={styles.font18}>Cognitive Behavioural Therapy (CBT)</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.font18}>Medication</Text></Unorderedlist>
            </View>
            <View style={styles.infoBlock_Blue}>
                <Text style={styles.header}>Cognitive Behavioural Therapy</Text>
                <Text style={styles.oswald18}>
                    CBT is a talk therapy, changing the way you behave and think to help in managing your issues.
                    Larger problems are broken down into smaller, more manageable parts helping to reduce the feeling of being overwhelmed.
                </Text>  
                <Text style={styles.oswald18}>
                    Treatment is usually offered in the form of sessions, working with a licensed professional to help identify and challenge
                    negative thoughts and behaviours.
                </Text>   
                <Text style={styles.oswald18}>
                    Usually a short-term treatment method as you'll complete a certain number of sessions, though this number can vary depending due to your reasons for CBT.
                </Text>  
            </View>
            <View style={styles.infoBlock_Blue}>
                <Text style={styles.header}>Medication</Text>
                <Text style={styles.oswald18}>
                    There are different types of medication available, with various uses, lengths of treatment, side effects and dosage.
                </Text>
                <Text style={styles.oswald18}>
                    Before being prescribed medication as treatment, your doctor or GP should first inform and discuss with you on the points
                    to ensure you have a good understanding of the important details.
                </Text>
                <Text style={styles.oswald18}>
                    The main medications offered for treatment of anxiety are as follows:
                </Text>
                <Unorderedlist><Text style={styles.oswald18}>Selective Serotonin Reuptake Inhibitors (SSRIs)</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.oswald18}>Serotonin and noradrenaline reuptake inhibitors (SNRIs)</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.oswald18}>Pregabalin</Text></Unorderedlist>
                <Unorderedlist><Text style={styles.oswald18}>Benzodiazepines</Text></Unorderedlist>
            </View>
        </View>
    </ScrollView>

    )
};

export default function HomeScreen ({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={{flex: 2, backgroundColor: '#C4ABFB'}}>
                <Text style={styles.abel22}> 
                    The app is designed with you in mind, providing a vital role in ensuring you are provided the most accurate information relating to anxiety and its counterparts.
                </Text>
                <Text style={styles.abel22}>
                    Not only information, but also a variety of tools have been provided with each one offering unique functionality to help support and manage your anxiety.
                </Text>
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

