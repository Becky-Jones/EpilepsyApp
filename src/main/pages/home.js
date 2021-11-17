import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Table from "react-native-simple-table";
import { AsyncStorage } from "react-native";

const styles = require("./stylesheets/styles");
const homeStyle = require("./stylesheets/homeStyle");
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 105,
  },
  {
    title: "DOB",
    dataIndex: "dob",
    width: 105,
  },
  {
    title: "Link",
    dataIndex: "link",
  },
];

const personalDetailsCol = [
  {
    title: "",
    dataIndex: "field",
    width: 150,
  },
  { title: "", dataIndex: "value", width: 150 },
];

// _retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('first_name');
//     if (value !== null) {
//       // We have data!!
//       console.log("NAME: " + value);
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// };

export default function Home({ navigation }) {
  const [id, setId] = useState("");
  const [first_name, setFName] = useState("");
  const [surname, setSName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  // Patient Details
  const [seizureType, setSeizureType] = useState("");
  const [seizureTriggers, setSeizureTriggers] = useState("");
  const [yearsSuffered, setYearsSuffered] = useState("");
  const [seizureFreq, setSeizureFreq] = useState("");
  const [mentalHealthIssues, setMHIssues] = useState("");
  const [practitionerId, setPractitionerId] = useState(""); 
  const [isAdmin, setIsAdmin] = useState(false);

  
  const getData = async () => {
    const testData = new Map();
    try {
      // var value = await AsyncStorage.getItem("user_id");
      const keys = [
        "user_id",
        "first_name",
        "surname",
        "email",
        "DOB",
        "gender",
        "address",
        "city",
        "postcode",
        "user_type",
        "seizure_type",
        "years_suffered",
        "seizure_monthly_frequency",
        "practitioner_id",
        "mental_health_issues",
        "seizure_triggers"
      ];

      var isLoggedIn = await AsyncStorage.getItem("user_id").then(res => {
      }).catch(error => {
        navigation.navigate("Login");

      });
      
      await AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          let key = store[i][0];
          let value = store[i][1];
          testData.set(key, value);
        });
      });
      // if (value !== null) {
      //   // value previously stored
      // }
    } catch (e) {
      // error reading value
    }
    // source[0]= "test";
    return testData;
  };

  const testing = getData().then((res) => {
    setId(res.get("user_id"));
    setFName(res.get("first_name"));
    setEmail(res.get("email"));
    setSName(res.get("surname"));
    setType(res.get("user_type"));
    setGender(res.get("gender"));
    setDOB(res.get("DOB"));
    setAddress(res.get("address"));
    setCity(res.get("city"));
    setPostcode(res.get("postcode"));

    if ('Patient' == type) {
      setSeizureType(res.get("seizure_type"));
      setYearsSuffered(res.get("years_suffered"));
      setSeizureTriggers(res.get("seizure_triggers"));
      setSeizureFreq(res.get("seizure_monthly_frequency"));
      setMHIssues(res.get("mental_health_issues"));
      setPractitionerId(res.get("practitioner_id"));
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  });

  testing;
  const personalDetails = [
    {
      field: "Name",
      value: first_name + " " + surname,
    },
    {
      field: "Email",
      value: email,
    },
    {
      field: "DOB",
      value: DOB,
    },
    {
      field: "Gender",
      value: gender,
    },
    {
      field: "Address",
      value: address,
    },
    {
      field: "City",
      value: city,
    },
    {
      field: "Postcode",
      value: postcode,
    },
  ];

  if (!isAdmin) {
    personalDetails.push({field: "Seizure Type(s)", value: seizureType});
    personalDetails.push({field: "Years Suffered", value: yearsSuffered});
    personalDetails.push({field: "Seizure Trigger(s)", value: seizureTriggers});
    personalDetails.push({field: "Seizure Frequency", value: seizureFreq});
    personalDetails.push({field: "Mental Health Issue(s)", value: mentalHealthIssues});
  }

  const dataSource = [
    // {
    //   name: "Matt Dryhurst",
    //   dob: "20/04/2000",
    //   link: (
    //     <Button
    //       title="View Patient Details"
    //       onPress={() => navigation.navigate("Patient Details")}
    //     />
    //   ),
    // },
    // {
    //   name: "Graham Daniels",
    //   dob: "27/02/1977",
    //   link: "View Patient Page",
    // },
  ];
  return (
    <>
      <ScrollView>
        <View style={homeStyle.container}>
          <Text style={homeStyle.header}>Home Screen</Text>
          <Button
            stlye={styles.btn}
            title="Go to Create Patient"
            onPress={() => navigation.navigate("Create Patient")}
          />
          <Button
            stlye={styles.btn}
            title="Go to Create Admin"
            onPress={() => navigation.navigate("Create Practitioner")}
          />
        </View>
        <View style={styles.container}>
          <Text style={homeStyle.title}>Personal Details:</Text>
          <View style={homeStyle.table}>
            <Table
              height={400}
              columnWidth={150}
              columns={personalDetailsCol}
              dataSource={personalDetails}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={homeStyle.title}>Patients</Text>
          <View style={homeStyle.table}>
            <Table
              height={420}
              columnWidth={150}
              columns={columns}
              dataSource={dataSource}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
