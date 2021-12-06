import React, { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";
import DatePicker from "react-native-datepicker";
import { ScrollView } from "react-native-gesture-handler";
const commonstyles = require("./stylesheets/styles");
var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
import displayNav from "../components/NavBar";

export default function createAdmin({ navigation, route }) {
  const params = route.params;
  const user = params.User;
  const movies = params.Movies;
  const analyticsInfo = params.Patients;
  const [date, setDate] = useState("15-11-2021");

  const [S_FName, setFName] = useState("");
  const [S_LName, setLName] = useState("");
  const [S_Gender, setGender] = useState("");
  const [S_Email, setEmail] = useState("");
  const [S_Password, setPassword] = useState("");
  const [S_CPassword, setCPassword] = useState("");
  const [S_City, setCity] = useState();
  const [S_Address, setAddress] = useState("");
  const [S_Postcode, setPostcode] = useState("");

  inputsValid = () => {
    if (S_Password != S_CPassword) {
      // Error, passwords don't match
      alert("Validation Error - Passwords don't match!");
      return false;
    }

    if (format.test(S_FName) || format.test(S_LName)) {
      // Error, name can't contain special character
      alert(
        "Validation Error - First and Surname can't contain special characters!"
      );
      return false;
    }
    return true;
  };

  const InsertData = () => {
    if (inputsValid()) {
      fetch("http://192.168.0.7:4000/add-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: S_FName,
          surname: S_LName,
          date_of_birth: date,
          gender: S_Gender,
          email: S_Email,
          password: S_Password,
          address1: S_Address,
          address2: S_City,
          postcode: S_Postcode,
          user_type: "Admin",
        }),
      })
        .then((response) => {
          console.log("Admin created successfully");
          alert("Admin created Successfully");
          navigation.navigate("Home", {
            User: user,
            Movies: movies,
            Patients: analyticsInfo,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <ScrollView>
      {displayNav(navigation, user, movies, analyticsInfo)}
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
            style={commonstyles.input}
            placeholder="Date of Birth:"
            autoCapitalize="none"
            placeholderTextColor="white"
          />
        </View>
        <View style={{ flex: 4 }}>
          <DatePicker
            style={commonstyles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-1921"
            maxDate="01-01-2022"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 35,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>
      </View>
      <TextInput
        style={commonstyles.smallinput}
        placeholder="Gender"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_Gender}
        onChangeText={(text) => setGender(text)}
      />
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
      <TextInput
        style={commonstyles.smallinput}
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_CPassword}
        onChangeText={(text) => setCPassword(text)}
      />
      <Button style={{ flex: 4 }} title="Create Admin" onPress={InsertData} />
    </ScrollView>
  );
}
