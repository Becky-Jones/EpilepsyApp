import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
  const [S_AddMediaName, setMediaName] = useState("");
  const [S_MediaID, setMediaID] = useState("");
  const [S_MediaLength, setMediaLength] = useState("");

  //try {
    const params = route.params;
    const user = params.User;
    const movies = params.Movies;
 // } catch {
  //  user =
 //     '{"user":[{"_id":"619257063e933ddf5443cb5d","first_name":"Adam","surname":"Admin","date_of_birth":"16/09/1998","gender":"male","email":"admin@admin.com","password":"password","address1":"9 Grenville Road","address2":"CREWE","postcode":"CW1 4AG","user_type":"Admin","createdAt":"2021-11-15T12:48:06.687Z","updatedAt":"2021-11-15T12:48:06.687Z","__v":0}]}';
  //  user = JSON.parse(user);
  //  movies =
  //    '{"movies":[{"_id":"616d9b9cd7e15f4acaf7dbd8","title":"John Wick","length":"1:41:01","warnings":[{"start_time":"0:13:42","end_time":"0:13:56"},{"start_time":"0:14:16","end_time":"0:14:38"},{"start_time":"0:31:27","end_time":"0:31:41"},{"start_time":"0:50:17","end_time":"0:50:34"},{"start_time":"1:1:15","end_time":"1:1:31"},{"start_time":"1:4:53","end_time":"1:5:12"},{"start_time":"1:11:51","end_time":"1:12:17"},{"start_time":"1:17:53","end_time":"1:18:08"},{"start_time":"1:35:13","end_time":"1:35:34"},{"start_time":"1:39:6","end_time":"1:39:25"}]},{"_id":"616d9e5ed7e15f4acaf7dbd9","title":"John Wick: Chapter 2","length":"2:2:01","warnings":[{"start_time":"0:40:33","end_time":"0:40:57"},{"start_time":"0:44:35","end_time":"0:44:55"},{"start_time":"1:3:42","end_time":"1:3:59"},{"start_time":"1:16:11","end_time":"1:16:24"},{"start_time":"1:24:35","end_time":"1:24:52"},{"start_time":"1:27:54","end_time":"1:28:12"},{"start_time":"1:34:27","end_time":"1:34:52"},{"start_time":"1:44:10","end_time":"1:44:28"},{"start_time":"1:49:43","end_time":"1:50:03"},{"start_time":"1:57:43","end_time":"1:58:01"}]}]}';
 //   movies = JSON.parse(movies);
 // }
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
      <ScrollView>
        {displayNav(navigation, user, movies)}
        <View style={mediaDetailsStyle.container}>
          <Text style={mediaDetailsStyle.title}>Media Details</Text>
          {displayMediaTable(columnsMediaTable, mediaDetailsFormattedForTable)}
        </View>
        <View style={mediaDetailsStyle.container}>
          <Text style={mediaDetailsStyle.title}>Add movie</Text>
          {displayAddMedia(
            S_AddMediaName,
            setMediaName,
            S_MediaLength,
            setMediaLength
          )}
        </View>
        <View style={mediaDetailsStyle.container}>
          <Text style={mediaDetailsStyle.title}>Remove movie</Text>
          {displayRemoveMedia(S_MediaID, setMediaID)}
        </View>
      </ScrollView>
    </>
  );
}

function displayAddMedia(
  S_MediaName,
  setMediaName,
  S_MediaLength,
  setMediaLength
) {
  return (
    <>
      <View>
        <TextInput
          placeholder="Enter media name here ... "
          autoCapitalize="none"
          placeholderTextColor="white"
          style={styles.input}
          value={S_MediaName}
          onChangeText={(name) => setMediaName(name)}
        />
        <TextInput
          placeholder="Enter media length here ... "
          autoCapitalize="none"
          placeholderTextColor="white"
          style={styles.input}
          value={S_MediaLength}
          onChangeText={(length) => setMediaLength(length)}
        />
        <Button
          title="Add Media"
          onPress={() => AddMedia(S_MediaName, S_MediaLength)}
        />
      </View>
    </>
  );
}

function displayRemoveMedia(S_MediaID, setMediaID) {
  return (
    <>
      <View>
        <TextInput
          placeholder="Enter media id here ... "
          autoCapitalize="none"
          placeholderTextColor="white"
          style={styles.input}
          value={S_MediaID}
          onChangeText={(name) => setMediaID(name)}
        />
        <Button title="Remove Media" onPress={() => RemoveMedia(S_MediaID)} />
      </View>
    </>
  );
}

function AddMedia(mediaName, mediaLength) {
  console.log("Adding " + mediaName + " it is " + mediaLength + " long");
}

function RemoveMedia(mediaID) {
  console.log("Removing " + mediaID);
  var url = "http://192.168.0.7:4000/delete-movie/" + mediaID;
    url;
  fetch(url, { method: 'DELETE' })
  .then(async response => {
      const data = await response.json();

      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
      }

      setStatus('Delete successful');
  })
  .catch(error => {
      console.error('There was an error!');
  });
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
