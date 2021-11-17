import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AsyncStorage } from 'react-native';

import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";

const commonstyles = require("./stylesheets/loginStyles");

function LoginScreen({ navigation }) {
  // static clear([callback]: ?(error: ?Error) => void)// - ON LOGOUT THIS NEEDS TO BE CALLED
  AsyncStorage.clear();
  const [S_Email, setEmail] = useState("");
  const [S_Password, setPassword] = useState("");

  const CheckLogin = () => {
    var url = "http://192.168.0.7:4000/user/" + S_Email;
    url
    fetch(url, {
      method: "GET",
    })
    .then((response) => response.text())
      .then((data) => {
        var json = JSON.parse(data);
        if(json.user.length == 0) {
          alert("Invalid email or password, please try again");
          return;
        }
        const user = json.user[0];

        console.log("checking password " + S_Password + " Against db " + user.password);
        if (user.password == S_Password) {
          console.log("User Successfully logged in");
          console.log(user);

          AsyncStorage.setItem("user_id", user._id);
          AsyncStorage.setItem("first_name", user.first_name);
          AsyncStorage.setItem("surname", user.surname);
          AsyncStorage.setItem("email", user.email);
          AsyncStorage.setItem("user_type", user.user_type);
          AsyncStorage.setItem("DOB", user.date_of_birth);
          AsyncStorage.setItem("gender", user.gender);
          AsyncStorage.setItem("address", user.address1);
          AsyncStorage.setItem("city", user.address2);
          AsyncStorage.setItem("postcode", user.postcode);

          if(user.user_type == "Patient"){
            const details = user.patient_details;
            
            AsyncStorage.setItem("seizure_type", details.seizure_type.toString());
            AsyncStorage.setItem("years_suffered", JSON.stringify(details.years_suffered));
            AsyncStorage.setItem("seizure_triggers", details.seizure_triggers.toString());
            AsyncStorage.setItem("seizure_monthly_frequency", JSON.stringify(details.seizure_monthly_frequency));
            AsyncStorage.setItem("mental_health_issues", details.mental_health_issues.toString());
            AsyncStorage.setItem("practitioner_id", details.practitioner_id);
          }
          navigation.navigate("Home");
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
