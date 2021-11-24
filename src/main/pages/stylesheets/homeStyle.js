import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  container: {
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  header: {
    fontSize: 30,
    color: "black",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    color: "black",
    textAlign: "left",
    marginLeft: 100,
  },
  table: {
    alignItems: "center",
    justifyContent: "center",
  },
  smallInputs : {
    borderRadius: 14,
    width: 85,
    height: 30,
    backgroundColor: "white",
    // padding: 8,
    fontSize: 14,
  },
  inputs : {
    borderRadius: 14,
    width: 150,
    height: 30,
    backgroundColor: "white",
    padding: 8,
    fontSize: 12,
  },
  field : {
    fontSize: 12,
    color: "grey",
    width: 80,
  },
  box : {
    flexDirection:'row',
    width: window.width, 
    margin: 10, 
    padding:4, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
  btns : {
    flexDirection:'row',
    width: window.width, 
    margin: 10, 
    padding:4, 
    alignItems:'center', 
    justifyContent:'center', 
    // backgroundColor: "white",
    borderWidth: 1,
  },
  box1 : {
    // flexDirection:'row',
    width: window.width, 
    margin: 10, 
    padding:4, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  }
});
