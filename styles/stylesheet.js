import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
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
    }
    });