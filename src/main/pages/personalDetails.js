import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
//pull in common stylesheet and stylesheet for this page
const styles = require("./stylesheets/styles");
const personalDetailsStyle = require("./stylesheets/personalDetailsStyle");

export default function PersonalDetails({ route, navigation }) {
  const params = route.params;
  const user = params.User;
  const movies = params.Movies;
  function updateUser() {
    if (user.getType() == "Patient") {
      const json = {
        first_name: user.getFirstName(),
        surname: user.getSurname(),
        date_of_birth: user.getDOB(),
        gender: user.getGender(),
        email: user.getEmail(),
        password: user.password,
        address1: user.Address.getAddressLine(),
        address2: user.Address.getCity(),
        postcode: user.Address.getPostcode(),
        user_type: user.getType(),
        patient_details: {
          seizure_type: user.getSeizureDetails().seizureTypes,
          years_suffered: user.getSeizureDetails().getYearsSuffered(),
          seizure_triggers: user.getSeizureDetails().seizureTriggers,
          seizure_monthly_frequency: user.getSeizureDetails().getSeizureFreq(),
          mental_health_issues: user.getSeizureDetails().MHIssues,
          practitioner_id: user.getPractitionerId(),
        },
      };
      console.log(JSON.stringify(json));
      if (inputsValid) {
        var url = "http://192.168.0.7:4000/edit-user/" + user.getId();
        console.log(url);
        fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        })
          .then((response) => {
            console.log("Details successfully Updated: " + response.status);
            alert("Details Successfully Updated");
            navigation.navigate("Home", { User: user, Movies: movies });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      const json = {
        first_name: user.getFirstName(),
        surname: user.getSurname(),
        date_of_birth: user.getDOB(),
        gender: user.getGender(),
        email: user.getEmail(),
        password: user.password,
        address1: user.Address.getAddressLine(),
        address2: user.Address.getCity(),
        postcode: user.Address.getPostcode(),
        user_type: user.getType(),
      };
      console.log(JSON.stringify(json));
      if (inputsValid) {
        var url = "http://192.168.0.7:4000/edit-user/" + user.getId();
        console.log(url);
        fetch(url, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        })
          .then((response) => {
            console.log("Details successfully Updated: " + response.status);
            alert("Details Successfully Updated");
            navigation.navigate("Home", { User: user, Movies: movies });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={personalDetailsStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>First Name: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.smallInputs}
              defaultValue={user.firstName}
              onChangeText={(text) => user.setFirstName(text)}
            ></TextInput>
          </View>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>Surname: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.smallInputs}
              defaultValue={user.surname}
              onChangeText={(text) => user.setSurname(text)}
            ></TextInput>
          </View>
        </View>

        <View style={personalDetailsStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>Gender: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.smallInputs}
              defaultValue={user.gender}
              onChangeText={(text) => user.setGender(text)}
            ></TextInput>
          </View>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>Postcode: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.smallInputs}
              defaultValue={user.Address.postcode}
              onChangeText={(text) => user.setPostcode(text)}
            ></TextInput>
          </View>
        </View>
        <View style={personalDetailsStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>Email: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.inputs}
              defaultValue={user.email}
              onChangeText={(text) => user.setEmail(text)}
            ></TextInput>
          </View>
        </View>
        <View style={personalDetailsStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>Date of Birth: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.inputs}
              defaultValue={user.dob}
              onChangeText={(text) => user.setDOB(text)}
            ></TextInput>
          </View>
        </View>
        <View style={personalDetailsStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>Address: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.inputs}
              defaultValue={user.Address.address}
              onChangeText={(text) => user.Address.setAddress(text)}
            ></TextInput>
          </View>
        </View>

        <View style={personalDetailsStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={personalDetailsStyle.field}>City: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={personalDetailsStyle.inputs}
              defaultValue={user.Address.city}
              onChangeText={(text) => user.Address.setCity(text)}
              placeholderTextColor="black"
            ></TextInput>
          </View>
        </View>
      </View>
      <Button
        style={styles.btn}
        title="Save Changes"
        onPress={() => updateUser()}
      />
    </ScrollView>
  );
}
