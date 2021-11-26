import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AddTypeItem from "../components/AddTypeItem";
import ListTypeItems from "../components/ListTypeItems";
import AddMHItem from "../components/AddMHItem";
import ListMHItems from "../components/ListMHItems";
import uuid from "react-native-uuid";
import { Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const commonstyles = require("./stylesheets/styles");
const styles = require("./stylesheets/createPatientPage");
import DatePicker from "react-native-datepicker";
import ListTriggersItems from "../components/ListTriggersItems";
import AddTriggersItem from "../components/AddTriggersItem";
import DropDownPicker from "react-native-dropdown-picker";
import displayNav from "../components/NavBar";

inputsValid = () => {
  if (S_Password != S_CPassword) {
    // Error, passwords don't match
    alert("Validation Error - Passwords don't match!");
    return false;
  }

  if (format.test(first_name) || format.test(surname)) {
    // Error, name can't contain special character
    alert(
      "Validation Error - First and Surname can't contain special characters!"
    );
    return false;
  }
  return true;
};

export default function createPatient({ route, navigation }) {
  const params = route.params;
  const user = params.User;
  const movies = params.Movies;
  const analyticsInfo = params.Patients;

  const [typelist, settypeList] = useState([]);
  const [date, setDate] = useState("15-11-2021");

  const addTypeItem = (text) => {
    const newTypeItem = {
      type: text,
    };
    settypeList([newTypeItem, ...typelist]);
  };
  const DeleteTypeItem = (id) => {
    const newTypeList = typelist.filter((item) => item.id !== id);
    settypeList(newTypeList);
  };

  const [MHlist, setMHList] = useState([]);
  const [triggersList, setTriggersList] = useState([]);

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

  const addTriggersItem = (text) => {
    const newTriggersItem = {
      id: uuid.v4(),
      trigger: text,
    };
    setTriggersList([newTriggersItem, ...triggersList]);
  };

  const DeleteTriggersItem = (id) => {
    const newTriggersList = triggersList.filter((item) => item.id !== id);
    setTriggersList(newTriggersList);
  };

  const [S_FName, setFName] = useState("");
  const [S_LName, setLName] = useState("");
  const [S_Gender, setGender] = useState("");
  const [S_Email, setEmail] = useState("");
  const [S_Password, setPassword] = useState("");
  const [S_CPassword, setCPassword] = useState("");
  const [S_City, setCity] = useState();
  const [S_Address, setAddress] = useState("");
  const [S_Postcode, setPostcode] = useState("");
  const [S_MonthlyFreq, setMonthlyFreq] = useState("");
  const [S_YearsSuffered, setYearsSuffered] = useState("");

  const InsertData = () => {
    const array = [];
    const MHArray = [];
    const triggersArray = [];
    for (var i = 0, l = typelist.length; i < l; i++) {
      array.push(typelist[i].type);
    }
    for (var i = 0, l = MHlist.length; i < l; i++) {
      MHArray.push(MHlist[i].impact);
    }
    for (var i = 0, l = triggersList.length; i < l; i++) {
      triggersArray.push(triggersList[i].trigger);
    }

    if (inputsValid) {
      fetch("http://192.168.0.7:4000/add-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: S_FName,
          surname: S_LName,
          date_of_birth: date,
          gender: S_Gender,
          email: S_Email,
          password: S_Password,
          address1: S_Address,
          address2: S_City,
          postcode: S_Postcode,
          user_type: "Patient",
          patient_details: {
            seizure_type: array,
            years_suffered: S_YearsSuffered,
            seizure_triggers: triggersArray,
            seizure_monthly_frequency: S_MonthlyFreq,
            mental_health_issues: MHArray,
            practitioner_id: value,
          },
        }),
      })
        .then((response) => {
          console.log("User created successfully");
          alert("User created Successfully");
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  var practitioners = [];
  var url = "http://192.168.0.7:4000/admins";

  fetch(url)
    .then((r) => r.text())
    .then(function (data) {
      var json = JSON.parse(data);
      for (var i = 0; i < json.admins.length; i++) {
        var name = json.admins[i].first_name + " " + json.admins[i].surname;
        practitioners.push({ label: name, value: json.admins[i]._id });
        console.log("ADMIN: " + json.admins[i]._id);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(practitioners);

  return (
    <ScrollView>
      {displayNav(navigation, user, movies, analyticsInfo)}
      <Text style={commonstyles.text}>Patient Details:</Text>
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            placeholder="First Name"
            autoCapitalize="none"
            placeholderTextColor="white"
            style={commonstyles.smallinput}
            value={S_FName}
            onChangeText={(text) => setFName(text)}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Surname"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={S_LName}
            onChangeText={(text) => setLName(text)}
          />
        </View>
      </View>
      <TextInput
        style={commonstyles.input}
        placeholder="Gender"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_Gender}
        onChangeText={(text) => setGender(text)}
      />
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.input}
            placeholder="Date of Birth:"
            autoCapitalize="none"
            placeholderTextColor="white"
          />
        </View>
        <View style={{ flex: 4 }}>
          <DatePicker
            style={styles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                //display: 'none',
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 35,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </View>
      </View>
      <TextInput
        style={commonstyles.input}
        placeholder="Address"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_Address}
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={commonstyles.input}
        placeholder="City"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_City}
        onChangeText={(text) => setCity(text)}
      />
      <TextInput
        style={commonstyles.input}
        placeholder="Postcode"
        autoCapitalize="none"
        placeholderTextColor="white"
        value={S_Postcode}
        onChangeText={(text) => setPostcode(text)}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        style={commonstyles.smallinput}
        value={S_Email}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            placeholderTextColor="white"
            style={commonstyles.smallinput}
            value={S_Password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            value={S_CPassword}
            onChangeText={(text) => setCPassword(text)}
          />
        </View>
      </View>
      <View>
        <Text style={commonstyles.text}>Practitioner:</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={styles.DropDownPicker}
          style={{
            backgroundColor: "#42A5F5",
            color: "white",
            width: 300,
            alignItems: "center",
            marginLeft: 30,
          }}
        />
      </View>
      <Text style={commonstyles.text}>Seizure Details:</Text>
      <View style={commonstyles.inlineInput}>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="monthly Frequency"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={S_MonthlyFreq}
            onChangeText={(text) => setMonthlyFreq(text)}
          />
        </View>
        <View style={{ flex: 4 }}>
          <TextInput
            style={commonstyles.smallinput}
            placeholder="Years Suffered"
            autoCapitalize="none"
            placeholderTextColor="white"
            value={S_YearsSuffered}
            onChangeText={(text) => setYearsSuffered(text)}
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
      <Text style={commonstyles.text}>Sezuire Triggers:</Text>
      <View>
        <AddTriggersItem addTriggersItem={addTriggersItem}></AddTriggersItem>
        <ListTriggersItems
          deleteTriggersItem={DeleteTriggersItem}
          listTriggersItems={triggersList}
        ></ListTriggersItems>
        <StatusBar style="auto" />
      </View>
      <Button style={{ flex: 4 }} title="Sign Up" onPress={InsertData} />
    </ScrollView>
  );
}
