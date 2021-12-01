import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
const styles = require("../pages/stylesheets/styles");

export default function addWarningItem(props) {
  const [item, setItem] = useState("");
  return (
    <View>
      <TextInput
        onChangeText={(textVal) => {
          setItem(textVal);
        }}
        style={styles.input}
        placeholder="Warning in format. 1:00 2:00"
        placeholderTextColor="white"
      ></TextInput>
      <Button
        style={thispage.btn}
        onPress={() => {
          props.addWarningItem(item);
        }}
        title="Add warning"
      ></Button>
    </View>
  );
}

const thispage = StyleSheet.create({
  view: {
    width: 350,
    height: 500,
    backgroundColor: "lightgrey",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
  textBox: {
    backgroundColor: "white",
    width: 350,
    height: 30,
    margin: 10,
    padding: 8,
    color: "black",
    borderRadius: 14,
    fontSize: 12,
    fontWeight: "500",
  },
  textInput: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  View: {
    width: 350,
    margin: 10,
    backgroundColor: "lightgrey",
    borderRadius: 14,
  },
  btn: {
    width: 200,
    borderRadius: 14,
    color: "red",
  },
});
