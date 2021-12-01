import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import Table from "react-native-simple-table";
import displayNav from "../components/NavBar";

const styles = require("./stylesheets/styles");
const mediaDetailsStyle = require("./stylesheets/mediaDetailsStyle");

export default function MediaDetails({ route, navigation }) {
  const params = route.params;
  const user = params.User;
  const movies = params.Movies;
  const Warnings = params.Warnings;
  const analyticsInfo = params.Patients;

  const columnsMediaTable = setupTable();
  var dataSourceMediaTable = getMediaDetails(Warnings);
  //console.log(dataSourceMediaTable);
  dataSourceMediaTable = dataSourceMediaTable[0];

  return (
    <>
      {displayNav(navigation, user, movies, analyticsInfo)}
      <View style={styles.container}>
        {displayTable(columnsMediaTable, dataSourceMediaTable)}
      </View>
    </>
  );
}

function displayTable(columnsMediaTable, dataSourceMediaTable) {
  return <View style={mediaDetailsStyle.table}>
    <Table
      height={420}
      columnWidth={150}
      columns={columnsMediaTable}
      dataSource={dataSourceMediaTable} />
  </View>;
}

function setupTable() {
  return [
    {
      title: "Trigger Start Time",
      dataIndex: "triggerStart",
      width: 105,
    },
    {
      title: "Trigger End Time",
      dataIndex: "triggerEnd",
      width: 105,
    },
  ];
}

function getMediaDetails(warnings) {
  const output = [];
  for (var x = 0; x < warnings.warningsList.length; x++) {
    //console.log(warnings[x].start_time);
    output.push({
      triggerStart: warnings.warningsList[x].start_time,
      triggerEnd: warnings.warningsList[x].end_time,
    });
  }
  return [output];
}
