import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AddTypeItem from "../components/AddTypeItem";
import ListTypeItems from "../components/ListTypeItems";
import AddMHItem from "../components/AddMHItem";
import ListMHItems from "../components/ListMHItems";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const commonstyles = require("./stylesheets/styles");
const styles = require("./stylesheets/createPatientPage");

export default function createPatient({ navigation }) {
  const [typelist, settypeList] = useState([]);

  const addTypeItem = (text) => {
    const newTypeItem = {
      id: uuid.v4(),
      type: text,
    };
    settypeList([newTypeItem, ...typelist]);
  };
  const DeleteTypeItem = (id) => {
    const newTypeList = typelist.filter((item) => item.id !== id);
    settypeList(newTypeList);
  };

  const [MHlist, setMHList] = useState([]);

  const addMHItem = (text) => {
    const newMHItem = {
      id: uuid.v4(),
      impact: text,
    };
    setMHList([newMHItem, ...MHlist]);
  };
  const DeleteMHItem = (id) => {
    const newMHList = MHlist.filter((item) => item.id !== id);
    setMHList(newMHList);
  };

  return (
    <ScrollView>
      <Text style={commonstyles.text}>Patient Details:</Text>

      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            placeholder="First Name"
            autoCapitalize="none"
            placeholderTextColor="white"
            style={commonstyles.smallinput}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Surname"
            autoCapitalize="none"
            placeholderTextColor="white"
          />
        </View>
      </View>
      <TextInput
        style={commonstyles.input}
        placeholder="Gender"
        autoCapitalize="none"
        placeholderTextColor="white"
      />
      <TextInput
        style={commonstyles.input}
        placeholder="Address"
        autoCapitalize="none"
        placeholderTextColor="white"
      />
      <TextInput
        style={commonstyles.input}
        placeholder="Postcode"
        autoCapitalize="none"
        placeholderTextColor="white"
      />
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="white"
            style={commonstyles.smallinput}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
          />
        </View>
      </View>
      <Text style={commonstyles.text}>Seizure Details:</Text>
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="monthly Frequency"
            autoCapitalize="none"
            placeholderTextColor="white"
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Years Suffered"
            autoCapitalize="none"
            placeholderTextColor="white"
          />
        </View>
      </View>
      <View>
        <AddTypeItem addTypeItem={addTypeItem}></AddTypeItem>
        <ListTypeItems
          deleteTypeItem={DeleteTypeItem}
          listTypeItems={typelist}
        ></ListTypeItems>
        <StatusBar style="auto" />
      </View>
      <Text style={commonstyles.text}>Mental Health Impact:</Text>

      <View>
        <AddMHItem addMHItem={addMHItem}></AddMHItem>
        <ListMHItems
          deleteMHItem={DeleteMHItem}
          listMHItems={MHlist}
        ></ListMHItems>
        <StatusBar style="auto" />
      </View>
      <Button
        style={{ flex: 4 }}
        title="Sign Up"
        onPress={() => navigation.navigate("Login")}
      />
    </ScrollView>
  );
}
