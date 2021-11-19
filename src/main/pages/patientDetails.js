import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from "react-native-simple-table";


//pull in common stylesheet and stylesheet for this page
const styles = require("./stylesheets/styles");
const patientDetailsStyle = require("./stylesheets/patientDetailsStyle");

export default function PatientDetail({ navigation }) {
  const [id, setId] = useState("");
  const [first_name, setFName] = useState("");
  const [surname, setSName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  // Patient Details
  const [seizureType, setSeizureType] = useState("");
  const [seizureTriggers, setSeizureTriggers] = useState("");
  const [yearsSuffered, setYearsSuffered] = useState("");
  const [seizureFreq, setSeizureFreq] = useState("");
  const [mentalHealthIssues, setMHIssues] = useState("");
  const [practitionerId, setPractitionerId] = useState("");

  // const getData = async () => {
  //   await AsyncStorage.getItem("patientEmail")
  //   .then((res) => {
  //     setEmail(res.get("patientEmail"));
  //     var url = "http://192.168.0.7:4000/user/" + email;
  //     fetch(url, {
  //       method: "GET",
  //     })
  //       .then((response) => response.text())
  //       .then((data) => {
  //         var json = JSON.parse(data);
  //         if (json.user.length == 0) {
  //           return;
  //         }
  //         const user = json.user[0];
  //         console.log("USER RECEIVED: " + user);
  //         setId(user._id);
  //         setFName(user.first_name);
  //         setSName(user.surname);
  //         setType(user.user_type);
  //         setDOB(ser.date_of_birth);
  //         setGender(user.gender);
  //         setAddress(user.address1);
  //         setCity(user.address2);
  //         setPostcode(user.postcode);

  //         const details = user.patient_details;

  //         setSeizureType(details.seizure_type.toString());
  //         setYearsSuffered(JSON.stringify(details.years_suffered));
  //         setSeizureTriggers(details.seizure_triggers.toString());
  //         setSeizureFreq(JSON.stringify(details.seizure_monthly_frequency));
  //         setMHIssues(details.mental_health_issues.toString());
  //         setPractitionerId(details.practitioner_id);
  //       })
  //       .catch((error) => {
  //         alert("An error occurred, please try again");
  //         console.error(error);
  //       });
  //   })
  //   .catch((error) => {});
  // }

  // getData();
  // TODO - get patient details for that id and display on page

  //Patient Table Setup
  const { columnsPatientTable, dataSourcePatientTable } = setupPatientTable();

  //Media Table Setup
  const { columnsMediaTable, dataSourceMediaTable } = setupMediaTable();

  //Create patient details
  const patientDetail = (
    <View style={styles.container}>
      <Text style={patientDetailsStyle.title}> {first_name}'s Details</Text>
      <View style={patientDetailsStyle.table}>
        <Table
          height={420}
          columnWidth={150}
          columns={columnsPatientTable}
          dataSource={dataSourcePatientTable}
        />
      </View>
    </View>
  );

  //Create media list
  const mediaList = (
    <View style={styles.container}>
      <Text style={patientDetailsStyle.title}>Media Details</Text>
      <View style={patientDetailsStyle.table}>
        <Table
          height={420}
          columnWidth={150}
          columns={columnsMediaTable}
          dataSource={dataSourceMediaTable}
        />
      </View>
    </View>
  );

  //display the page
  return (
    <>
    <ScrollView>
      {displayNav(navigation)}
      {patientDetail}
      {mediaList}
      </ScrollView>
    </>
  );

  function setupMediaTable() {
    //Creating tables for Media Table
    const columnsMediaTable = [
      {
        title: "Media Name",
        dataIndex: "mediaName",
        width: 105,
      },
      {
        title: "Media Link",
        dataIndex: "mediaLink",
        width: 105,
      },
    ];
    //Values for Media table are hardcoded for now. Will be populated after reading from database
    const dataSourceMediaTable = [
      {
        mediaName: "John Wick",
        mediaLink: (
          <Button
            title="View Details"
            onPress={() => navigation.navigate("Media Details")}
          />
        ),
      },
      {
        mediaName: "John Wick 2",
        mediaLink: (
          <Button
            title="View Details"
            onPress={() => navigation.navigate("Media Details")}
          />
        ),
      },
      {
        mediaName: "John Wick 3",
        mediaLink: (
          <Button
            title="View Details"
            onPress={() => navigation.navigate("Media Details")}
          />
        ),
      },
      {
        mediaName: "Toy Story 1",
        mediaLink: (
          <Button
            title="View Details"
            onPress={() => navigation.navigate("Media Details")}
          />
        ),
      },
      {
        mediaName: "Toy Story 2",
        mediaLink: (
          <Button
            title="View Details"
            onPress={() => navigation.navigate("Media Details")}
          />
        ),
      },
      {
        mediaName: "Toy Story 3",
        mediaLink: (
          <Button
            title="View Details"
            onPress={() => navigation.navigate("Media Details")}
          />
        ),
      },
    ];
    return { columnsMediaTable, dataSourceMediaTable };
  }

  function setupPatientTable() {
    //Creating columns for Patient Table
    const columnsPatientTable = [
      {
        title: "Key",
        dataIndex: "key",
        width: 105,
      },
      {
        title: "Value",
        dataIndex: "value",
        width: 105,
      },
    ];
    //Values for Patient table are hardcoded for now. Will be populated after reading from database
    const dataSourcePatientTable = [
      { key: "First Name", value: first_name },
      { key: "Last Name", value: surname },
      { key: "Gender", value: gender },
      { key: "Date of Birth", value: DOB },
      { key: "Address", value: address },
      { key: "City", value: city },
      { key: "Postcode", value: postcode },
      { key: "Email", value: email },
      { key: "Seizure Types(s)", value: seizureType },
      { key: "Seizure Trigger(s)", value: seizureTriggers },
      { key: "Year(s) suffered)", value: yearsSuffered },
      { key: "Seizure freq", value: seizureFreq },
      { key: "Mental Health Impact", value: mentalHealthIssues },
    ];
    return { columnsPatientTable, dataSourcePatientTable };
  }
}
