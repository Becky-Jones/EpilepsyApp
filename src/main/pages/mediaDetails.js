import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import Table from "react-native-simple-table";
import displayNav from "../components/NavBar";

const styles = require("./stylesheets/styles");
const mediaDetailsStyle = require("./stylesheets/mediaDetailsStyle");

export default function MediaDetails({ route, navigation }) {
  const WarningParam = route.params;
  const Warnings = WarningParam.Warnings;

  const columnsMediaTable = setupTable();
  var dataSourceMediaTable = getMediaDetails(Warnings);
  dataSourceMediaTable = dataSourceMediaTable[0];

  return (
    <>
      {displayNav(navigation)}
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
  for (var x = 0; x < warnings.length; x++) {
    console.log("s: " + warnings[x].triggerStart);
    output.push({
      triggerStart: warnings[x].triggerStart,
      triggerEnd: warnings[x].triggerEnd,
    });
  }
  console.log(output[0])
  return [output];
}
