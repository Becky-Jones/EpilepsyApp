import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Patient } from "../components/Patient";
//pull in common stylesheet and stylesheet for this page
const styles = require("./stylesheets/styles");
const patientDetailsStyle = require("./stylesheets/patientDetailsStyle");

export default function PatientDetail({ route, navigation }) {
  const params = route.params;
  const patient = params.Patient;
  const User = params.User;
  const details = patient.patient_details;
  const movies = params.Movies;

  const user = new Patient(
    patient._id,
    patient.user_type,
    patient.first_name,
    patient.surname,
    patient.date_of_birth,
    patient.email,
    patient.password,
    patient.gender,
    patient.address1,
    patient.address2,
    patient.postcode,
    details.practitioner_id,
    details.seizure_triggers,
    details.seizure_type,
    details.seizure_monthly_frequency,
    details.years_suffered,
    details.mental_health_issues
  );

  function loadPatientDetails() {
    function updatePatient() {
      console.log("NEW PATIENT INFO: " + JSON.stringify(user));
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
            alert("Details Successfully Updated - Changes will be reflected when you next sign in");
            navigation.navigate("Home", { User: User, Movies: movies });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={patientDetailsStyle.title}>
            {user.getFirstName()}'s Details:
          </Text>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>First Name: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                defaultValue={user.getFirstName()}
                onChangeText={(text) => user.setFirstName(text)}
              ></TextInput>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Surname: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                defaultValue={user.getSurname()}
                onChangeText={(text) => user.setSurname(text)}
              ></TextInput>
            </View>
          </View>

          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Gender: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                defaultValue={user.getGender()}
                onChangeText={(text) => user.setGender(text)}
              ></TextInput>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Postcode: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                defaultValue={user.getAddress().getPostcode()}
                onChangeText={(text) => user.Address.setPostcode(text)}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Email: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.inputs}
                defaultValue={user.getEmail()}
                onChangeText={(text) => user.setEmail(text)}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Date of Birth: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.inputs}
                defaultValue={user.getDOB()}
                onChangeText={(text) => user.setDOB(text)}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Address: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.inputs}
                defaultValue={user.getAddress().getAddressLine()}
                onChangeText={(text) => user.Address.setAddressLine(text)}
              ></TextInput>
            </View>
          </View>

          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>City: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.inputs}
                defaultValue={user.getAddress().getCity()}
                placeholderTextColor="black"
                onChangeText={(text) => user.Address.setCity(text)}
              ></TextInput>
            </View>
          </View>
          <View>
            <View style={patientDetailsStyle.box}>
              <View style={{ flex: 4 }}>
                <Text style={patientDetailsStyle.field}>Seizure Type(s): </Text>
              </View>
              <View style={{ flex: 4 }}>
                <TextInput
                  style={patientDetailsStyle.longInputs}
                  defaultValue={user
                    .getSeizureDetails()
                    .getSeizureTypes()
                    .toString()}
                    onChangeText={(text) => user.getSeizureDetails().setSeizureTypes(text.split(","))}
                ></TextInput>
              </View>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Years Suffered: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                defaultValue={user
                  .getSeizureDetails()
                  .getYearsSuffered()
                  .toString()}
                  onChangeText={(text) => user.getSeizureDetails().setYearsSuffered(text)}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Seizure Freq: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                defaultValue={user
                  .getSeizureDetails()
                  .getSeizureFreq()
                  .toString()}
                  onChangeText={(text) => user.getSeizureDetails().setSeizureFreq(text.split(","))}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Seizure Trigger(s) </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.longInputs}
                defaultValue={user
                  .getSeizureDetails()
                  .getSeizureTriggers()
                  .toString()}
                  onChangeText={(text) => user.getSeizureDetails().setSeizureTriggers(text.split(","))}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>
                Mental Health issue(s)
              </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.longInputs}
                defaultValue={user.getSeizureDetails().getMHIssues().toString()}
              ></TextInput>
            </View>
          </View>
        </View>
        <Button
          style={styles.btn}
          title="Save Changes"
          onPress={() => updatePatient()}
        />
      </ScrollView>
    );
  }

  //display the page
  return (
    <>
      <ScrollView>{loadPatientDetails()}</ScrollView>
    </>
  );
}
