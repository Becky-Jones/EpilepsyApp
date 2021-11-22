import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from "react-native-simple-table";

const styles = require("./stylesheets/styles");
const patientDetailsStyle = require("./stylesheets/patientDetailsStyle");

export default function MediaDetails({ navigation }) {
  const columnsMediaTable = setupTable();
  const dataSourceMediaTable = getMediaDetails();

  return (
    <>
      <View style={patientDetailsStyle.container}>
        <Text>Nav Bar will be here</Text>
      </View>
      <View style={styles.container}>
        <Text style={patientDetailsStyle.title}>Media Details</Text>
        {displayMediaTable(columnsMediaTable, dataSourceMediaTable)}
      </View>
    </>
  );
}

function displayMediaTable(columnsMediaTable, dataSourceMediaTable) {
    const dataSourceMediaTable2 = [];
    for(var x = 0; x < dataSourceMediaTable[0].length; x++){
        dataSourceMediaTable2.push({
            mediaName: dataSourceMediaTable[0][x].mediaName,
            movieLength: dataSourceMediaTable[0][x].movieLength
        });
    }
    console.log(dataSourceMediaTable2);
  return (
    <View style={patientDetailsStyle.table}>
      <Table
        height={420}
        columnWidth={150}
        columns={columnsMediaTable}
        dataSource={dataSourceMediaTable2}
      />
    </View>
  );
}

function getMediaDetails() {
    var mediaDetailsListAsString = getMediaDetailsFromDB();
    var json = JSON.parse(mediaDetailsListAsString);
    const movieArray = json.movies;
    const output = [];
    for (var i = 0; i < movieArray.length; i++) {
        output.push({
            mediaName: movieArray[i].title,
            movieLength: movieArray[i].length,
          });
    }
    console.log(output[0].mediaName + ", " + output[1].mediaName);
    return [output];
}

function getMediaDetailsFromDB() {
    return "{\"movies\":[{\"_id\":\"616d9b9cd7e15f4acaf7dbd8\",\"title\":\"John Wick\",\"length\":\"1:41:01\",\"warnings\":[{\"start_time\":\"0:13:42\",\"end_time\":\"0:13:56\"},{\"start_time\":\"0:14:16\",\"end_time\":\"0:14:38\"},{\"start_time\":\"0:31:27\",\"end_time\":\"0:31:41\"},{\"start_time\":\"0:50:17\",\"end_time\":\"0:50:34\"},{\"start_time\":\"1:1:15\",\"end_time\":\"1:1:31\"},{\"start_time\":\"1:4:53\",\"end_time\":\"1:5:12\"},{\"start_time\":\"1:11:51\",\"end_time\":\"1:12:17\"},{\"start_time\":\"1:17:53\",\"end_time\":\"1:18:08\"},{\"start_time\":\"1:35:13\",\"end_time\":\"1:35:34\"},{\"start_time\":\"1:39:6\",\"end_time\":\"1:39:25\"}]},{\"_id\":\"616d9e5ed7e15f4acaf7dbd9\",\"title\":\"John Wick: Chapter 2\",\"length\":\"2:2:01\",\"warnings\":[{\"start_time\":\"0:40:33\",\"end_time\":\"0:40:57\"},{\"start_time\":\"0:44:35\",\"end_time\":\"0:44:55\"},{\"start_time\":\"1:3:42\",\"end_time\":\"1:3:59\"},{\"start_time\":\"1:16:11\",\"end_time\":\"1:16:24\"},{\"start_time\":\"1:24:35\",\"end_time\":\"1:24:52\"},{\"start_time\":\"1:27:54\",\"end_time\":\"1:28:12\"},{\"start_time\":\"1:34:27\",\"end_time\":\"1:34:52\"},{\"start_time\":\"1:44:10\",\"end_time\":\"1:44:28\"},{\"start_time\":\"1:49:43\",\"end_time\":\"1:50:03\"},{\"start_time\":\"1:57:43\",\"end_time\":\"1:58:01\"}]}]}";
}

function setupTable() {
  return [
    {
      title: "Media Name",
      dataIndex: "mediaName",
      width: 105,
    },
    {
      title: "Movie Length",
      dataIndex: "movieLength",
      width: 105,
    }
  ];
}
