import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from 'react-native-simple-table';

const styles = require("./stylesheets/styles");
const patientDetailsStyle = require("./stylesheets/patientDetailsStyle");

export default function MediaDetails({ navigation }) {
    const columnsMediaTable = [
        {
          title: 'Media Name',
          dataIndex: 'mediaName',
          width: 105
        },
        {
          title: 'Trigger Start Time',
          dataIndex: 'triggerStart',
          width: 105
        },
        {
            title: 'Trigger End Time',
            dataIndex: 'triggerEnd',
            width: 105
          }
      ];
      const dataSourceMediaTable = [
        {mediaName:"John Wick",triggerStart: "00:03:11",triggerEnd: "00:04:21" },
        {mediaName:"John Wick",triggerStart: "00:07:32",triggerEnd: "00:07:55" },
        {mediaName:"John Wick",triggerStart: "00:14:31",triggerEnd: "00:14:31" },
        {mediaName:"John Wick",triggerStart: "00:21:32",triggerEnd: "00:21:34" },
        {mediaName:"John Wick",triggerStart: "00:33:11",triggerEnd: "00:33:21" },
        {mediaName:"John Wick",triggerStart: "00:41:54",triggerEnd: "00:42:00" },
        {mediaName:"John Wick",triggerStart: "00:58:54",triggerEnd: "01:00:01" }
      ];


    return (
    <>
        <View style={patientDetailsStyle.container}>
            <Text style={patientDetailsStyle.header}>Media Details</Text>
            <Button
                stlye={styles.btn}
                title="Go to Create Patient"
                onPress={() => navigation.navigate("Create Patient")} 
            />
            <Button
                stlye={styles.btn}
                title="Go to Home"
                onPress={() => navigation.navigate("Home")} 
            />

        </View>
        <View style={styles.container}>
            <Text style={patientDetailsStyle.title}>Media Details</Text>
            <View style={patientDetailsStyle.table}>
            <Table height={420} columnWidth={150} columns={columnsMediaTable} dataSource={dataSourceMediaTable} />
            </View>
        </View>
    </>
  );
}
