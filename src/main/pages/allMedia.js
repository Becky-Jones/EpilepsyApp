import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from "react-native-simple-table";
import { Movie } from "../components/Movie";
import displayNav from "../components/NavBar";
import { Warning } from "../components/Warning";
import { Warnings } from "../components/Warnings";
import AddWarningItem from "../components/AddWarningItem";
import ListWarningItems from "../components/ListWarningItems";
import { StatusBar } from "expo-status-bar";

const styles = require("./stylesheets/styles");
const mediaDetailsStyle = require("./stylesheets/mediaDetailsStyle");

export default function MediaDetails({ navigation, route }) {
  const [S_AddMediaName, setMediaName] = useState("");
  const [S_MediaLength, setMediaLength] = useState("");
  const [S_TriggerStart, setTriggerStart] = useState("");
  const [S_TriggerEnd, setTriggerEnd] = useState("");
  const [S_Warnings, setWarnings] = useState([]);

  //try catch is for me and Chris so if db fails it uses hardcoded value. Can be removed at end
  try {
    const params = route.params;
    const user = params.User;
    const movies = params.Movies;
  } catch {
    user =
      '{"user":[{"_id":"619257063e933ddf5443cb5d","first_name":"Adam","surname":"Admin","date_of_birth":"16/09/1998","gender":"male","email":"admin@admin.com","password":"password","address1":"9 Grenville Road","address2":"CREWE","postcode":"CW1 4AG","user_type":"Admin","createdAt":"2021-11-15T12:48:06.687Z","updatedAt":"2021-11-15T12:48:06.687Z","__v":0}]}';
    user = JSON.parse(user);
    movies =
      '{"movies":[{"_id":"616d9b9cd7e15f4acaf7dbd8","title":"John Wick","length":"1:41:01","warnings":[{"start_time":"0:13:42","end_time":"0:13:56"},{"start_time":"0:14:16","end_time":"0:14:38"},{"start_time":"0:31:27","end_time":"0:31:41"},{"start_time":"0:50:17","end_time":"0:50:34"},{"start_time":"1:1:15","end_time":"1:1:31"},{"start_time":"1:4:53","end_time":"1:5:12"},{"start_time":"1:11:51","end_time":"1:12:17"},{"start_time":"1:17:53","end_time":"1:18:08"},{"start_time":"1:35:13","end_time":"1:35:34"},{"start_time":"1:39:6","end_time":"1:39:25"}]},{"_id":"616d9e5ed7e15f4acaf7dbd9","title":"John Wick: Chapter 2","length":"2:2:01","warnings":[{"start_time":"0:40:33","end_time":"0:40:57"},{"start_time":"0:44:35","end_time":"0:44:55"},{"start_time":"1:3:42","end_time":"1:3:59"},{"start_time":"1:16:11","end_time":"1:16:24"},{"start_time":"1:24:35","end_time":"1:24:52"},{"start_time":"1:27:54","end_time":"1:28:12"},{"start_time":"1:34:27","end_time":"1:34:52"},{"start_time":"1:44:10","end_time":"1:44:28"},{"start_time":"1:49:43","end_time":"1:50:03"},{"start_time":"1:57:43","end_time":"1:58:01"}]}]}';
    movies = JSON.parse(movies);
  }
  const columnsMediaTable = setupTable();
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
       
        <View style={mediaDetailsStyle.containerBottom}>
          <Text style={mediaDetailsStyle.title}>Add movie</Text>
          <ScrollView>
          {displayAddMedia(
            S_AddMediaName,
            setMediaName,
            S_MediaLength,
            setMediaLength,
            S_TriggerStart,
            setTriggerStart,
            S_TriggerEnd,
            setTriggerEnd,
            S_Warnings,
            setWarnings
          )}
          </ScrollView>
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
  const addWarningItem = (text) => {
    const newWarningItem = {
      warning: text,
    };
    setWarningList([newWarningItem, ...warninglist]);
  };
  const DeleteWarningItem = (id) => {
    const newWarningList = warninglist.filter((item) => item.id !== id);
    setWarningList(newWarningList);
  };
  const [warninglist, setWarningList] = useState([]);

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
        <View>
          <AddWarningItem addWarningItem={addWarningItem}></AddWarningItem>
          <ListWarningItems
            deleteWarningItem={DeleteWarningItem}
            listWarningItems={warninglist}
          ></ListWarningItems>
          <StatusBar style="auto" />
        </View>
      </View>
      <Button
          title="Add Media to database"
          onPress={() => AddMedia(S_MediaName, S_MediaLength, warninglist)}
        />
      
    </>
  );
}

function AddMedia(mediaName, mediaLength, warninglist) {
  var newMovie = new Movie();
  var warnings = [];

  //setup the list of warnings in the correct format
  for (var x = 0; x < warninglist.length; x++) {
    var warningString = warninglist[x].warning;
    warningString += "";
    var warningArray = warningString.split(" ");
    var warning = new Warning(warningArray[1], warningArray[0]);
    warnings.push(warning);
  }

  //assign all the details to the new film
  newMovie.setTitle(mediaName);
  newMovie.setLength(mediaLength);
  newMovie.setWarnings(warnings);
  console.log("Adding " + newMovie.getTitle() + " to the DB");

  fetch("http://192.168.0.7:4000/add-movie", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newMovie.getTitle(),
      length: newMovie.getLength(),
      warnings: warnings,
    }),
  })
    .then((response) => {
      console.log("Movie added successfully");
      navigation.navigate("All Media");
    })
    .catch((error) => {
      console.log(error);
      alert(
        "Sorry. We couldn't add your movie at this time. Please try again later."
      );
    });
}

function RemoveMedia(mediaID) {
  console.log("Removing " + mediaID);
  var url = "http://192.168.0.7:4000/delete-movie/" + mediaID;
  url;
  fetch(url, { method: "DELETE" })
    
  .then((response) => {
    console.log("Movie removed successfully");
    navigation.navigate("All Media");
  })
  .catch((error) => {
    console.log(error);
    alert(
      "Sorry. We couldn't remove your movie at this time. Please try again later."
    );
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
    const warning = films[x].warnings;
    const movieId = films[x]._id;
    // console.log(warning);
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
      remove: <Button title="Remove" onPress={() => RemoveMedia(movieId)} />,
    });
  }
  return mediaDetailsFormattedForTable;
}

function setupTable() {
  return [
    {
      title: "Media Name",
      dataIndex: "mediaName",
      width: 80,
    },
    {
      title: "Movie Length",
      dataIndex: "movieLength",
      width: 80,
    },
    {
      title: "Link",
      dataIndex: "linky",
      width: 70,
    },
    {
      title: "Remove Movie",
      dataIndex: "remove",
      width: 90,
    },
  ];
}
