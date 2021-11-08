import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from 'react-native-simple-table';

//pull in common stylesheet and stylesheet for this page
const styles = require("./stylesheets/styles");
const patientDetailsStyle = require("./stylesheets/patientDetailsStyle");

export default function PatientDetail({ navigation }) {
  
  //Patient Table Setup
  const { columnsPatientTable, dataSourcePatientTable } = setupPatientTable();

  //Media Table Setup
  const { columnsMediaTable, dataSourceMediaTable } = setupMediaTable();

  //Create header
  const header = <View style={patientDetailsStyle.container}>
    <Text style={patientDetailsStyle.header}>Patient Details</Text>
    <Button
      stlye={styles.btn}
      title="Go to Create Patient"
      onPress={() => navigation.navigate("Create Patient")} />
    <Button
      stlye={styles.btn}
      title="Go to Home"
      onPress={() => navigation.navigate("Home")} />
  </View>;
  
  //Create patient details
  const patientDetail = <View style={styles.container}>
    <Text style={patientDetailsStyle.title}>Matt's Details</Text>
    <View style={patientDetailsStyle.table}>
      <Table height={420} columnWidth={150} columns={columnsPatientTable} dataSource={dataSourcePatientTable} />
    </View>
  </View>;
  
  //Create media list
  const mediaList = <View style={styles.container}>
    <Text style={patientDetailsStyle.title}>Media Details</Text>
    <View style={patientDetailsStyle.table}>
      <Table height={420} columnWidth={150} columns={columnsMediaTable} dataSource={dataSourceMediaTable} />
    </View>
  </View>;
    
  //display the page
  return (
    <>
      {header}
      {patientDetail}
      {mediaList}
    </>
  );

  function setupMediaTable() {
    //Creating tables for Media Table
    const columnsMediaTable = [
      {
        title: 'Media Name',
        dataIndex: 'mediaName',
        width: 105
      },
      {
        title: 'Media Link',
        dataIndex: 'mediaLink',
        width: 105
      }
    ];
    //Values for Media table are hardcoded for now. Will be populated after reading from database
    const dataSourceMediaTable = [
      { mediaName: "John Wick", mediaLink: <Button title="View Details" onPress={() => navigation.navigate("Media Details")} /> },
      { mediaName: "John Wick 2", mediaLink: <Button title="View Details" onPress={() => navigation.navigate("Media Details")} /> },
      { mediaName: "John Wick 3", mediaLink: <Button title="View Details" onPress={() => navigation.navigate("Media Details")} /> },
      { mediaName: "Toy Story 1", mediaLink: <Button title="View Details" onPress={() => navigation.navigate("Media Details")} /> },
      { mediaName: "Toy Story 2", mediaLink: <Button title="View Details" onPress={() => navigation.navigate("Media Details")} /> },
      { mediaName: "Toy Story 3", mediaLink: <Button title="View Details" onPress={() => navigation.navigate("Media Details")} /> },

    ];
    return { columnsMediaTable, dataSourceMediaTable };
  }

  function setupPatientTable() {
    //Creating columns for Patient Table
    const columnsPatientTable = [
      {
        title: 'Key',
        dataIndex: 'key',
        width: 105
      },
      {
        title: 'Value',
        dataIndex: 'value',
        width: 105
      }
    ];
    //Values for Patient table are hardcoded for now. Will be populated after reading from database
    const dataSourcePatientTable = [
      { key: "First Name", value: "Matt" },
      { key: "Last Name", value: "null" },
      { key: "Gender", value: "null" },
      { key: "Address", value: "null" },
      { key: "Postcode", value: "null" },
      { key: "Email", value: "null" },
      { key: "Seizure Details", value: "null" },
      { key: "Mental Health Impact", value: "null" }
    ];
    return { columnsPatientTable, dataSourcePatientTable };
  }
}
