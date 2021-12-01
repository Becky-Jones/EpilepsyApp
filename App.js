import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from './src/main/pages/login.js'
import CreateAdmin from './src/main/pages/createAdmin.js'
import SignupScreen from './src/main/pages/createPatient.js'
import Home from './src/main/pages/home.js'
import PatientDetails from './src/main/pages/patientDetails.js'
import PersonalDetails from './src/main/pages/personalDetails.js'
import MediaDetails from './src/main/pages/mediaDetails.js'
import Analytics from './src/main/pages/analytics.js'

import AllMedia from './src/main/pages/allMedia.js'
import EditMedia from './src/main/pages/editMedia.js'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {

  return (

  <NavigationContainer>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Create Patient" component={SignupScreen} />
      <Stack.Screen name="Create Practitioner" component={CreateAdmin} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Patient Details" component={PatientDetails} />
      <Stack.Screen name="Media Details" component={MediaDetails} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="All Media" component={AllMedia} />
      <Stack.Screen name="Edit Media" component={EditMedia} />
      <Stack.Screen name="Edit Personal Details" component={PersonalDetails} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 60,
  },

  image: {
    width: 20,
    height: 10,
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  signupBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "blue",
  },
});
