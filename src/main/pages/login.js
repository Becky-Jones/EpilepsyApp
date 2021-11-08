import React from "react";
import SignupScreen from "./createPatient.js";

import { Text, View, Button, StyleSheet } from "react-native";

const styles = require('./stylesheets/styles.js');

function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button
        stlye={styles.btn}
        title="Go to Create Patient"
        onPress={() => navigation.navigate("Create Patient")}
      />
       <Button
        stlye={styles.btn}
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}

export default LoginScreen;

