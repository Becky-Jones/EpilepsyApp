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
  const patient = params.Patient;

  //Patient Table Setup
  // const { columnsPatientTable, dataSourcePatientTable } =
  //   setupPatientTable(patient);

  //Media Table Setup
  // const { columnsMediaTable, dataSourceMediaTable } = setupMediaTable();

  // //Create patient details
  // const patientDetail = (
  //   <View style={styles.container}>
  //     <Text style={patientDetailsStyle.title}>
  //       {" "}
  //       {patient.first_name}'s Details
  //     </Text>
  //     <View style={patientDetailsStyle.table}>
  //       <Table
  //         height={420}
  //         columnWidth={150}
  //         columns={columnsPatientTable}
  //         dataSource={dataSourcePatientTable}
  //       />
  //     </View>
  //   </View>
  // );

  // //Create media list
  // const mediaList = (
  //   <View style={styles.container}>
  //     <Text style={patientDetailsStyle.title}>Media Details</Text>
  //     <View style={patientDetailsStyle.table}>
  //       <Table
  //         height={420}
  //         columnWidth={150}
  //         columns={columnsMediaTable}
  //         dataSource={dataSourceMediaTable}
  //       />
  //     </View>
  //   </View>
  // );

  // function setupMediaTable() {
  //   //Creating tables for Media Table
  //   const columnsMediaTable = [
  //     {
  //       title: "Media Name",
  //       dataIndex: "mediaName",
  //       width: 105,
  //     },
  //     {
  //       title: "Media Link",
  //       dataIndex: "mediaLink",
  //       width: 105,
  //     },
  //   ];
  //   //Values for Media table are hardcoded for now. Will be populated after reading from database
  //   const dataSourceMediaTable = [
  //     {
  //       mediaName: "John Wick",
  //       mediaLink: (
  //         <Button
  //           title="View Details"
  //           onPress={() => navigation.navigate("Media Details")}
  //         />
  //       ),
  //     },
  //     {
  //       mediaName: "John Wick 2",
  //       mediaLink: (
  //         <Button
  //           title="View Details"
  //           onPress={() => navigation.navigate("Media Details")}
  //         />
  //       ),
  //     },
  //     {
  //       mediaName: "John Wick 3",
  //       mediaLink: (
  //         <Button
  //           title="View Details"
  //           onPress={() => navigation.navigate("Media Details")}
  //         />
  //       ),
  //     },
  //     {
  //       mediaName: "Toy Story 1",
  //       mediaLink: (
  //         <Button
  //           title="View Details"
  //           onPress={() => navigation.navigate("Media Details")}
  //         />
  //       ),
  //     },
  //     {
  //       mediaName: "Toy Story 2",
  //       mediaLink: (
  //         <Button
  //           title="View Details"
  //           onPress={() => navigation.navigate("Media Details")}
  //         />
  //       ),
  //     },
  //     {
  //       mediaName: "Toy Story 3",
  //       mediaLink: (
  //         <Button
  //           title="View Details"
  //           onPress={() => navigation.navigate("Media Details")}
  //         />
  //       ),
  //     },
  //   ];
  //   return { columnsMediaTable, dataSourceMediaTable };
  // }

  function loadPatientDetails(patient) {
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

    const details = patient.patient_details;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={patientDetailsStyle.title}>{patient.first_name}'s Details:</Text>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>First Name: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                value={patient.first_name}
              ></TextInput>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Surname: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                value={patient.surname}
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
                value={patient.gender}
              ></TextInput>
            </View>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Postcode: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                value={patient.postcode}
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
                value={patient.email}
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
                value={patient.date_of_birth}
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
                value={patient.address1}
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
                value={patient.address2}
                placeholderTextColor="black"
              ></TextInput>
            </View>
          </View>
           <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Seizure Type(s): </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.inputs}
                placeholder={details.seizure_type.toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Years Suffered: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.smallInputs}
                placeholder={details.years_suffered.toString()}
                placeholderTextColor={"black"}
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
                placeholder={details.seizure_monthly_frequency.toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Seizure Trigger(s) </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.inputs}
                placeholder={details.seizure_triggers.toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
          <View style={patientDetailsStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={patientDetailsStyle.field}>Mental Health issue(s) </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={patientDetailsStyle.inputs}
                placeholder={details.mental_health_issues.toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View> 
        </View>
      </ScrollView>
    );
  }

  //display the page
  return (
    <>
      <ScrollView>
        {/* {displayNav(navigation)} */}
        {loadPatientDetails(patient)}
        {/* {mediaList} */}
      </ScrollView>
    </>
  );
}
