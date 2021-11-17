import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from 'react-native-simple-table';
import displayNav from "../components/NavBar";
   
const styles = require("./stylesheets/styles");
const homeStyle = require("./stylesheets/homeStyle");

export default function Home({ navigation }) {
    const { columns, dataSource } = setupTable(navigation);
    return (
      <>
       {displayNav(navigation)}
        <View style={styles.container}>
          <Text style={homeStyle.title}>Patients</Text>
          {displayTable(columns, dataSource)}
        </View>
      </>
  );
}

function displayTable(columns, dataSource) {
  return <View style={homeStyle.table}>
    <Table height={420} columnWidth={150} columns={columns} dataSource={dataSource} />
  </View>;
}

function setupTable(navigation) {
  const dataSource = [
    {
      name: "Matt Dryhurst",
      dob: "20/04/2000",
      link: <Button title="View Patient Details" onPress={() => navigation.navigate("Patient Details")} />
    },
    {
      name: "Graham Daniels",
      dob: "27/02/1977",
      link: "View Patient Page"
    }
  ];
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 105
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      width: 105
    },
    {
      title: 'Link',
      dataIndex: 'link'
    }
  ];
  return { columns, dataSource };
}

