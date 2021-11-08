import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
  },
    test:{
      flexDirection:'row', 
      width: window.width, 
      margin: 10, padding:4,borderWidth:4, borderRadius:10,    backgroundColor: "#42A5F5",
      color: "white",
    },
    items: {
      backgroundColor: "#42A5F5",
      color: "white",
      width: 100,
      height: 30,
      backgroundColor: "#42A5F5",
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
      fontSize: 10,
      fontWeight: "500",
    },
    signupBtn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    listInput: {
      // flex: 4,
      width: 220,
      // height: 55,
      backgroundColor: "#42A5F5",
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
      fontSize: 14,
      fontWeight: "500",
    },
  });
