import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import Table from "react-native-simple-table";
import displayNav from "../components/NavBar";
import { Warnings } from "../components/Warnings";

const styles = require("./stylesheets/styles");
const mediaDetailsStyle = require("./stylesheets/mediaDetailsStyle");

// //this function needs updating to actually call DB. DB does not work with iOS
// function getMediaDetailsFromDB() {
//   fetch("http://192.168.0.7:4000/movies", {
//     method: "GET",
//   })
//     .then((response) => response.text())
//     .then((data) => {
//       var json = JSON.parse(data);
//       // const myArray = json.movies;
//       const moviesArray = json.movies;
//       // const
//       for(var i = 0; i < moviesArray.length; i++){
//           const movie = new Movie(moviesArray[i]._id, moviesArray[i]._id, moviesArray[i]._id, moviesArray[i]._id);
//       }
//     });
// }

export default function MediaDetails({ navigation, route }) {
  const params = route.params;
  const user = params.User;
  const movies = params.Movies;
  console.log("MOVIES: " + JSON.stringify(movies));
  const columnsMediaTable = setupTable();
  // const mediaDetails = getMediaDetails();
  const mediaDetailsFormattedForTable = formatMediaDetails(
    movies,
    navigation,
    user,
    movies
  );

  return (
    <>
      {displayNav(navigation, user, movies)}
      <View style={styles.container}>
        <Text style={mediaDetailsStyle.title}>Media Details</Text>
        {displayMediaTable(columnsMediaTable, mediaDetailsFormattedForTable)}
      </View>
    </>
  );
}

function displayMediaTable(columnsMediaTable, mediaDetailsFormattedForTable) {
  return (
    <View style={mediaDetailsStyle.table}>
      <Table
        height={420}
        columnWidth={150}
        columns={columnsMediaTable}
        dataSource={mediaDetailsFormattedForTable}
      />
    </View>
  );
}

//this function fixes a weird problem where array is created within an array
function formatMediaDetails(dataSourceMediaTable, navigation, user, movies) {
  const mediaDetailsFormattedForTable = [];
  const films = dataSourceMediaTable.movies;
  for (var x = 0; x < films.length; x++) {
    const warning = films[x].warnings.warningsList;
    mediaDetailsFormattedForTable.push({
      mediaName: films[x].title,
      movieLength: films[x].length,
      linky: (
        <Button
          title="Link"
          onPress={() =>
            navigation.navigate("Media Details", {
              User: user,
              Movies: movies,
              Warnings: warning,
            })
          }
        />
      ),
    });
  }
  return mediaDetailsFormattedForTable;
}

function getMediaDetails() {
  var mediaDetailsListAsString = getMediaDetailsFromDB();
  // console.log("RECEIVED: " + JSON.stringify(mediaDetailsListAsString));
  const output = [];
  try {
    var mediaDetailsAsJSON = JSON.parse(mediaDetailsListAsString);
    const movieArray = mediaDetailsAsJSON.movies;
    for (var i = 0; i < movieArray.length; i++) {
      const warnings = [];
      for (var x = 0; x < movieArray[i].warnings.length; x++) {
        let warning = new Warnings(
          movieArray[i].warnings[x].start_time,
          movieArray[i].warnings[x].end_time
        );
        warnings.push(warning);
      }
      output.push({
        mediaName: movieArray[i].title,
        movieLength: movieArray[i].length,
        warnings: warnings,
      });
    }
  } catch (exception) {
    console.log(exception);
  }
  return [output];
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
    },
    {
      title: "Link",
      dataIndex: "linky",
      width: 105,
    },
  ];
}
