import React from "react";
import { View, Text, TouchableOpacity, FlatList, Button, StyleSheet } from "react-native";
const styles = require("../pages/stylesheets/styles");

export default function ListTypeItems(props) {
  return (
    <View  style={thispage.view}>
      <FlatList
        data={props.listTypeItems}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={{
                padding: 15,
                backgroundColor: "#f8f8f8",
                borderBottomWidth: 1,
                borderColor: "#eee",
                width: 300,
                marginTop: 5,
                justifyContent: "space-between",
                flexDirection: "row",
                display: "flex",
              }}
            >
              <Text> {item.type}</Text>
              <Button
                title="Delete"
                onPress={() => {
                  props.deleteTypeItem(item.id);
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
