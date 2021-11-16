import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from "react-native-simple-table";
import { AsyncStorage } from 'react-native';

const styles = require("./stylesheets/styles");
const homeStyle = require("./stylesheets/homeStyle");
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 105,
  },
  {
    title: "DOB",
    dataIndex: "dob",
    width: 105,
  },
  {
    title: "Link",
    dataIndex: "link",
  },
];

export default function Home({ navigation }) {
  var id = AsyncStorage.getItem("user_id");

  console.log("USER SESSION: " + id);

  const dataSource = [
    {
      name: "Matt Dryhurst",
      dob: "20/04/2000",
      link: (
        <Button
          title="View Patient Details"
          onPress={() => navigation.navigate("Patient Details")}
        />
      ),
    },
    {
      name: "Graham Daniels",
      dob: "27/02/1977",
      link: "View Patient Page",
    },
  ];
  return (
    <>
      <View style={homeStyle.container}>
        <Text style={homeStyle.header}>Home Screen</Text>
        <Button
          stlye={styles.btn}
          title="Go to Create Patient"
          onPress={() => navigation.navigate("Create Patient")}
        />
        <Button
          stlye={styles.btn}
          title="Go to Create Admin"
          onPress={() => navigation.navigate("Create Practitioner")}
        />
      </View>
      <View style={styles.container}>
        <Text style={homeStyle.title}>Patients</Text>
        <View style={homeStyle.table}>
          <Table
            height={420}
            columnWidth={150}
            columns={columns}
            dataSource={dataSource}
          />
        </View>
      </View>
    </>
  );
}
