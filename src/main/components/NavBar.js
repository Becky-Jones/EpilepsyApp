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

export default function displayNav(navigation) {
  return (
    <View style={navStyle.container}>
      <View style={navStyle.navButton}>
        <Button color="black" title="Home" disabled onPress={() => navigation.navigate("Home")} />
      </View>
      <View style={navStyle.navButton}>
        <Button
          title="My Details"
          color="black" onPress={() => navigation.navigate("Patient Details")}
        />
      </View>
      <View style={navStyle.navButton}>
        <Button
          color="black" title="Create Patient"
          onPress={() => navigation.navigate("Create Patient")}
        />
      </View>
      <View style={navStyle.navButton}>
        <Button color="black" title="Sign Out" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
}
