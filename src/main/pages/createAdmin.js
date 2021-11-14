import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  View,
} from "react-native";

import { ScrollView } from "react-native-gesture-handler";
const commonstyles = require("./stylesheets/styles");

export default function createAdmin({ navigation }) {

      const [S_FName, setFName] = useState('');
      const [S_LName, setLName] = useState('');
      const [S_Gender, setGender] = useState('');
      const [S_DOB, setDOB] = useState('');
      const [S_Email, setEmail] = useState('');
      const [S_Password, setPassword] = useState('');
      const [S_City, setCity] = useState();
      const [S_Address, setAddress] = useState('');
      const [S_Postcode, setPostcode] = useState('');

    const InsertData = () => {
        fetch("http://192.168.0.7:4000/add-user", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: S_FName,
            surname: S_LName,
            date_of_birth: S_DOB,
            gender: S_Gender,
            email: S_Email,
            password: S_Password,
            address1: S_Address,
            address2: S_City,
            postcode: S_Postcode,
            user_type: "Admin",
          }),
        }).then((response) => {
            console.log("Admin created successfully");
            navigation.navigate("Home")
        }).catch(error => {
            console.log(error);
        })
    }
  return (
    <ScrollView>
      <Text style={commonstyles.text}>Practitioner Details:</Text>
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            placeholder="First Name"
            autoCapitalize="none"
            placeholderTextColor="white"
            style={commonstyles.smallinput}
            value={S_FName}
            onChangeText={(text) => setFName(text)}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Surname"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={S_LName}
            onChangeText={(text) => setLName(text)}
          />
        </View>
      </View>
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Date of birth"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={S_DOB}
            onChangeText={(text) => setDOB(text)}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Gender"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={S_Gender}
            onChangeText={(text) => setGender(text)}
          />
        </View>
      </View>
      <TextInput
        style={commonstyles.smallinput}
        placeholder="Postcode"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_Postcode}
        onChangeText={(text) => setPostcode(text)}
      />
      <TextInput
        style={commonstyles.input}
        placeholder="Address"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_Address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={commonstyles.input}
        placeholder="City"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_City}
        onChangeText={(text) => setCity(text)}
      />

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        style={commonstyles.smallinput}
        value={S_Email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={commonstyles.smallinput}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_Password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button
        style={{ flex: 4 }}
        title="Create Admin"
        onPress={InsertData}
      />
    </ScrollView>
  );
}
