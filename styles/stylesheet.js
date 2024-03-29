import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#edf2f4",
      alignItems: "center",
      justifyContent: "center",
    },
    infoBlock: {
      backgroundColor: '#C4ABFB', 
      borderWidth: 1, 
      padding: 15
    },
    infoBlock_Blue: {
      padding: 10, 
      borderBottomWidth: 2, 
      backgroundColor: "#C9EDFA"
    },
    toolCont: {
      borderBottomWidth: 1, 
      paddingHorizontal: 10, 
      paddingVertical: 5, 
      backgroundColor: '#F1F2F2'
    },
    AndroidSafeArea: {
      flex: 1,
      backgroundColor: "white",
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    intro: {
      flex: 2,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    contRow: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    inputView: {
      backgroundColor: "#8ecae6",
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
      backgroundColor: "#8ecae6",
    },
    journalEntry: {
      backgroundColor: "#C9EDFA",
      borderRadius: 15,
      padding: 15,
      textAlignVertical: 'top',
      fontSize: 20, 
      fontFamily: 'Oswald'
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
      backgroundColor: "#98c1d9",
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
      backgroundColor: '#8ecae6',
      alignItems: "center",
      justifyContent: "center",
    },
    titles: {
      fontSize: 35,
    }, 
    header: {
      fontSize: 25, 
      fontWeight: 'bold'
    },
    italicFont: {
      fontStyle: 'italic', 
      fontSize: 14
    },
    titleFont: {
      fontSize: 22, 
      fontWeight: 'bold'
    },
    rowCont: {
      flexDirection: 'row', 
      alignContent: 'space-between', 
      paddingBottom: 10, 
      paddingTop: 15
    },
    btnCont: {
      alignItems: "center", 
      paddingVertical: 10
    },
    btnSubmit: {
      backgroundColor: '#82CEDD', 
      borderWidth: 1, 
      padding: 15, 
      borderRadius: 15
    },
    btnText: {
      fontSize: 18, 
      fontWeight: 'bold'
    },
    entryCont: {
      padding: 5, 
      borderBottomWidth: 1
    },
    infoTxt: {
      fontFamily: 'Abel',
      fontSize: 16
    },
    oswaldFont: {
      fontSize: 18, 
      fontFamily: 'Oswald'
    },
    suppDetails: {
      backgroundColor: '#C1DEEB', 
      paddingVertical: 10, 
      paddingLeft: 5
    },
    suppTitleCont: {
      paddingVertical: 5
    },
    suppTitle: {
      fontSize: 20,
      paddingBottom: 5
    },
    dropdownCont: {
      paddingTop: 10, 
      width: 200
    },
    contBottomBdr: {
      paddingVertical: 10, 
      paddingHorizontal: 5, 
      borderBottomWidth: 2
    },
    font20: {
      fontSize: 20
    },
    font18: {
      fontSize: 18
    },
    oswald18: {
      fontSize: 18, 
      fontFamily: 'Oswald'
    },
    abel22: {
      fontFamily: 'Abel', 
      fontSize: 22, 
      paddingHorizontal: 5
    }
    });