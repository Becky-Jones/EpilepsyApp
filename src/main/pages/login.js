import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Patient } from "../components/Patient";
import { Admin } from "../components/Admin";

import { Text, TouchableOpacity, TextInput, View } from "react-native";

const commonstyles = require("./stylesheets/loginStyles");

function LoginScreen({ navigation }) {
  const [S_Email, setEmail] = useState("");
  const [S_Password, setPassword] = useState("");

  const CheckLogin = () => {
    var url = "http://192.168.0.7:4000/user/" + S_Email;
    url;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        var json = JSON.parse(data);
        if (json.user.length == 0) {
          alert("Invalid email or password, please try again");
          return;
        }
        const user = json.user[0];

        console.log(
          "checking password " + S_Password + " Against db " + user.password
        );
        if (user.password == S_Password) {
          console.log("User Successfully logged in");
          console.log(user);
          console.log(user._id + " is a " + user.user_type);

          if (user.user_type == "Patient") {
            const details = user.patient_details;
            let patient = new Patient(
              user._id,
              user.user_type,
              user.first_name,
              user.surname,
              user.date_of_birth,
              user.email,
              user.password,
              user.gender,
              user.address1,
              user.address2,
              user.postcode,
              details.seizure_triggers,
              details.seizure_type,
              details.seizure_monthly_frequency,
              details.years_suffered,
              details.mental_health_issues
            );
            navigation.navigate("Home", { User: patient });
          } else {
            let admin = new Admin(
              user._id,
              user.user_type,
              user.first_name,
              user.surname,
              user.date_of_birth,
              user.email,
              user.password,
              user.gender,
              user.address1,
              user.address2,
              user.postcode
            );
          
            navigation.navigate("Home", { User: admin });
          }
        } else {
          alert("Invalid email or password, please try again");
          console.log("password incorrect");
        }
      })
      .catch((error) => {
        alert("An error occurred, please try again");
        console.error(error);
      });
  };

  return (
    <View style={commonstyles.container}>
      <Text style={commonstyles.Text}>WCFB Epilepsy App Login</Text>
      <StatusBar style="auto" />
      <View style={commonstyles.inputView}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          style={commonstyles.input}
          value={S_Email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={commonstyles.inputView}>
        <TextInput
          style={commonstyles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          value={S_Password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={commonstyles.loginBtn} onPress={CheckLogin}>
        <Text style={commonstyles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
