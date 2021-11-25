import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Pressable,
} from "react-native";

const navStyle = require("../pages/stylesheets/navStyle");

export default function displayNav(navigation, user, movies) {

  return (
    <View style={navStyle.container}>
      <View style={navStyle.navButton}>
        <Button
          // color="black"
          title="Home"
          onPress={() =>
            navigation.navigate("Home", { User: user, Movies: movies })
          }
        />
      </View>
      <View style={navStyle.navButton}>
        <Button
          title="Media"
          // color="black"
          onPress={() =>
            navigation.navigate("All Media", { User: user, Movies: movies })
          }
        />
      </View>
      <View style={navStyle.navButton}>
        <Button
          // color="black"
          title="Sign Out"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}
