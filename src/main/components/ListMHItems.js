import React from "react";
import { View, Text, TouchableOpacity, FlatList, Button, StyleSheet } from "react-native";
const styles = require("../pages/stylesheets/styles");

export default function ListMHItems(props) {
  return (
    <View  style={thispage.view}>
      <FlatList
        data={props.listMHItems}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderColor: "#eee",
                width: 300,
                marginTop: 5,
                justifyContent: "space-between",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Text> {item.impact}</Text>
              <Button
                title="Delete"
                onPress={() => {
                  props.deleteMHItem(item.id);
                }}
              ></Button>
            </TouchableOpacity>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const thispage = StyleSheet.create({
  view: {
    width: 350,
    height: 350,
    backgroundColor: "lightgrey",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14,
    fontSize: 18,
    fontWeight: "500",
  },
});
