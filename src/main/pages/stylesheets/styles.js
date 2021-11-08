import { StyleSheet } from 'react-native';

module.exports = StyleSheet.create({
    input: {
      width: 350,
      height: 40,
      backgroundColor: "#42A5F5",
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
      fontSize: 14,
      fontWeight: "500",
    },
    btn: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    inlineInput:{
      flexDirection:'row',
      width: window.width, 
      margin: 10, 
      padding:4, 
      alignItems:'center', 
      justifyContent:'center', 
    },
    smallinput:{
      backgroundColor:"#42A5F5",
      margin: 10,
      padding: 8,
      color: "white",
      borderRadius: 14,
    },
    text:{
      alignItems:'center',
      textAlign: 'center', 
      justifyContent:'center', 
      fontSize: 16
    }
  });
