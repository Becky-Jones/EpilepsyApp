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
import uuid from "react-native-uuid";

const styles = require("./stylesheets/styles");
const mediaDetailsStyle = require("./stylesheets/mediaDetailsStyle");

export default function MediaDetails({ navigation, route }) {
  const [S_AddMediaName, setMediaName] = useState("");
  const [S_MediaLength, setMediaLength] = useState("");
  const [S_TriggerStart, setTriggerStart] = useState("");
  const [S_TriggerEnd, setTriggerEnd] = useState("");
  const [S_Warnings, setWarnings] = useState([]);
  const params = route.params;
  const user = params.User;
  const movies = params.Movies;
  const analyticsInfo = params.Patients;

  const columnsMediaTable = setupTable();
  const mediaDetailsFormattedForTable = formatMediaDetails(
    movies,
    navigation,
    user,
    movies,
    analyticsInfo
  );

  function displayAddMedia(
    S_MediaName,
    setMediaName,
    S_MediaLength,
    setMediaLength
  ) {
    const addWarningItem = (text) => {
      const newWarningItem = {
        warning: text,
        id: uuid.v4(),
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
  //this function fixes a weird problem where array is created within an array
  function formatMediaDetails(
    dataSourceMediaTable,
    navigation,
    user,
    movies,
    analyticsInfo
  ) {
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
                Paients: analyticsInfo,
                Warnings: warning,
              })
            }
          />
        ),
      });
    }
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
    console.log(
      "Adding " +
        JSON.stringify({
          title: newMovie.getTitle(),
          length: newMovie.getLength(),
          warnings: warnings,
        })
    );
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
        alert("Movie Added Successfully - Will be displayed on next login");
        navigation.navigate("Home", {
          User: user,
          Movies: movies,
          Patients: analyticsInfo,
        });
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
        alert("Movie Removed Successfully - Will be reflected on next log in");
        navigation.navigate("Home", {
          User: user,
          Movies: movies,
          Patients: analyticsInfo,
        });
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
          height={250}
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
      const movieId = films[x].id;
      const theMovie = films[x];
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
                Patients: analyticsInfo,
              })
            }
          />
        ),
        remove: <Button title="Remove" onPress={() => RemoveMedia(movieId)} />,
        edit: (
          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate("Edit Media", {
                User: user,
                Movies: movies,
                Movie: theMovie,
                Patients: analyticsInfo,
              })
            }
          />
        ),
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
        width: 60,
      },
      {
        title: "Link",
        dataIndex: "linky",
        width: 70,
      },
      {
        title: "Remove",
        dataIndex: "remove",
        width: 70,
      },
      {
        title: "Edit Movie",
        dataIndex: "edit",
        width: 80,
      },
    ];
  }

  return (
    <>
      <ScrollView>
        {displayNav(navigation, user, movies)}
        <Text style={mediaDetailsStyle.title}>Media Details</Text>
        {displayMediaTable(columnsMediaTable, mediaDetailsFormattedForTable)}

        <Text style={mediaDetailsStyle.title}>Add movie</Text>
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
    </>
  );
}
