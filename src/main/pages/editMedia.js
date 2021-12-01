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

export default function EditMediaDetails({ navigation, route }) {
  const params = route.params;
  const movie = params.Movie;
  const movies = params.Movies;
  const user = params.User;

  const [S_MediaName, setMediaName] = useState(movie.title);
  const [S_MediaLength, setMediaLength] = useState(movie.length);

  const addWarningItem = (text) => {
    const newWarningItem = {
      warning: text,
      id: uuid.v4(),
    };
    setWarningList([newWarningItem, ...warninglist]);
  };
  const addWarningItemList = (list) => {
    for (var x = 0; x < list.length; x++) {
      const newWarningItem = {
        warning: list[x],
        id: uuid.v4(),
      };
      warninglist.push(newWarningItem);
    }
  };
  const DeleteWarningItem = (id) => {
    const newWarningList = warninglist.filter((item) => item.id !== id);
    setWarningList(newWarningList);
  };
  const [warninglist, setWarningList] = useState([]);

  return (
    <>
      <ScrollView>
        {displayNav(navigation, user, movies)}
        <View>
          <Text style={mediaDetailsStyle.title}>Edit Media</Text>
          <Button
            title="Load trigger times"
            onPress={() => setupWarningList()}
          />
          {editMedia()}
        </View>
      </ScrollView>
    </>
  );

  function setupWarningList() {
    // console.log(moviee.warnings);
    console.log(JSON.stringify(movie));
    var warningList1 = [];
    for (var x = 0; x < movie.warnings.warningsList.length; x++) {
      // console.log("GETS HERE" + JSON.stringify(movie.warnings.warningsList[0]));
      var m = movie.warnings.warningsList[x];
      var warnings =
       m.start_time + " " + m.end_time;
      warningList1.push(warnings);
      //console.log(warnings);
      //call addWarningItemList instead
    }
    console.log(JSON.stringify(warningList1));
    addWarningItemList(warningList1);

    // displayTriggers();
    return;
    //return warningList;
  }

  function editMedia() {
    //console.log(setupWarningList());
    return (
      <View>
        <TextInput
          defaultValue={movie.title}
          autoCapitalize="none"
          placeholderTextColor="white"
          style={styles.input}
          value={S_MediaName}
          onChangeText={(name) => setMediaName(name)}
        />
        <TextInput
          defaultValue={movie.length}
          autoCapitalize="none"
          placeholderTextColor="white"
          style={styles.input}
          value={S_MediaLength}
          onChangeText={(length) => setMediaLength(length)}
        />
        <View>
          {displayTriggers()}
        </View>
        <Button
          title="Update Media"
          onPress={() => pushToDB(movie.id, S_MediaName, S_MediaLength, warninglist)}
        />
      </View>
    );
  }

  function displayTriggers() {
    return (
      <View>
        <AddWarningItem addWarningItem={addWarningItem}></AddWarningItem>
        <ListWarningItems
          deleteWarningItem={DeleteWarningItem}
          listWarningItems={warninglist}
        ></ListWarningItems>
        <StatusBar style="auto" />
      </View>
    );
  }

  function pushToDB(id, mediaName, mediaLength, warninglist) {
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
    newMovie.setId(id);
    newMovie.setLength(mediaLength);
    newMovie.setWarnings(warnings);
    var url = "http://192.168.0.7:4000/edit-movie/" + newMovie.getId();
    console.log(url);

    console.log(
      "Adding " +
        JSON.stringify({
          title: newMovie.getTitle(),
          length: newMovie.getLength(),
          warnings: warnings,
        })
    );

    var json = {
      title: newMovie.getTitle(),
      length: newMovie.getLength(),
      warnings: warnings,
    };
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(json), 
    })
      .then((response) => {
        console.log("Movie updated successfully");
        navigation.navigate("All Media", {User: user, Movies: movies});
      })
      .catch((error) => {
        console.log(error);
        alert(
          "Sorry. We couldn't add your movie at this time. Please try again later."
        );
      });
  }
}
