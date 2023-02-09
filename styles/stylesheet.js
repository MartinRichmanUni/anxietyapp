import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
    },
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    intro: {
      flex: 2,
    },
    contRow: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10,
    },
    inputView: {
      backgroundColor: "#FFC0CB",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
      textAlign: "center",
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#FF1493",
    },
    journalEntry: {
      backgroundColor: "#DEEDEE",
      borderRadius: 15,
      padding: 15,
      textAlignVertical: 'top',
      fontSize: 20,
      flexShrink: 1,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'space-between',
    },
    scroll: {
      marginHorizontal: 10,
    },
    toolThumb: {
      width: '50%',
      backgroundColor: "#DEEDEE",
      height: 200,
      padding: 10,
      borderWidth: 3,
    },
    homeCont: {
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      height: 200,
      borderColor: 'grey',
      borderWidth: 1,
      backgroundColor: '#6a779c',
      alignItems: "center",
      justifyContent: "center",
    },
    titles: {
      fontSize: 35,
    }
    });