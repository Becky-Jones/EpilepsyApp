import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from "react-native-simple-table";

//pull in common stylesheet and stylesheet for this page
const styles = require("./stylesheets/styles");
const patientDetailsStyle = require("./stylesheets/patientDetailsStyle");

export default function PatientDetail({ route, navigation }) {
  const params = route.params;
  const patient = params.patient;

  //Patient Table Setup
  const { columnsPatientTable, dataSourcePatientTable } =
    setupPatientTable(patient);

  //Media Table Setup
  const { columnsMediaTable, dataSourceMediaTable } = setupMediaTable();

  //Create header
  const header = (
    <View style={patientDetailsStyle.container}>
      <Text style={patientDetailsStyle.header}>Patient Details</Text>
      {/* <Button
        stlye={styles.btn}
        title="Go to Create Patient"
        onPress={() => navigation.navigate("Create Patient")}
      />
      <Button
        stlye={styles.btn}
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      /> */}
    </View>
  );

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
        {header}
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

  function setupPatientTable(patientEmail) {
    const dataSourcePatientTable = [];
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
    //Values for Patient table
    var url = "http://10.50.11.66:4000/user/" + patientEmail;
    url;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        var json = JSON.parse(data);

        const user = json.user[0];

        const details = user.patient_details;
        dataSourcePatientTable.push({
          key: "First Name",
          value: user.first_name,
        });
        dataSourcePatientTable.push({ key: "Last Name", value: user.surname });
        dataSourcePatientTable.push({ key: "Gender", value: user.gender });
        dataSourcePatientTable.push({
          key: "Date of Birth",
          value: user.date_of_birth,
        });
        dataSourcePatientTable.push({ key: "Email", value: user.email });
        dataSourcePatientTable.push({ key: "Address", value: user.address1 });
        dataSourcePatientTable.push({ key: "City", value: user.address2 });
        dataSourcePatientTable.push({ key: "Postcode", value: user.postcode });
        dataSourcePatientTable.push({
          key: "Seizure Type(s)",
          value: details.seizure_type,
        });
        dataSourcePatientTable.push({
          key: "Seizure Trigger(s)",
          value: details.seizure_triggers,
        });
        dataSourcePatientTable.push({
          key: "Seizure Frequency(s)",
          value: details.seizure_monthly_frequency,
        });
        dataSourcePatientTable.push({
          key: "Mental Health impact",
          value: details.mental_health_issues,
        });
        return { columnsPatientTable, dataSourcePatientTable };
      })
      .catch((error) => {
        alert("An error occurred, please try again");
        console.error(error);
      });
    // return { columnsPatientTable, dataSourcePatientTable };
  }
}
