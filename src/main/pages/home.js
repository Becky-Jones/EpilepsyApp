import React from "react";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
const styles = require("./stylesheets/styles");
const homeStyle = require("./stylesheets/homeStyle");
import Table from "react-native-simple-table";
import displayNav from "../components/NavBar";

/************************
 *
 * Columns for tables
 *
 *************************/

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    width: 105,
  },
  {
    title: "date of birth",
    dataIndex: "DOB",
    width: 105,
  },
  {
    title: "Link",
    dataIndex: "Link",
    width: 105,
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

/************************
 * Home Function
 *************************/

export default function Home({ route, navigation }) {
  const params = route.params;
  const user = params.User;
  const movies = params.Movies;
  const analyticsInfo = params.Patients;
  /************************
   *
   * Returned Views
   *
   *************************/

  const loadSeizureDetailsView = () => {
    if (user.getType() == "Patient") {
      return (
        <View style={styles.container}>
          <Text style={homeStyle.title}>Seizure Details: </Text>
          <View style={homeStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={homeStyle.field}>Seizure Type(s): </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={homeStyle.inputs}
                placeholder={user
                  .getSeizureDetails()
                  .getSeizureTypes()
                  .toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
          <View style={homeStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={homeStyle.field}>Years Suffered: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={homeStyle.smallInputs}
                placeholder={user
                  .getSeizureDetails()
                  .getYearsSuffered()
                  .toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
          <View style={homeStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={homeStyle.field}>Seizure Freq: </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={homeStyle.smallInputs}
                placeholder={user
                  .getSeizureDetails()
                  .getSeizureFreq()
                  .toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
          <View style={homeStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={homeStyle.field}>Seizure Trigger(s) </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={homeStyle.inputs}
                placeholder={user
                  .getSeizureDetails()
                  .getSeizureTriggers()
                  .toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
          <View style={homeStyle.box}>
            <View style={{ flex: 4 }}>
              <Text style={homeStyle.field}>Mental Health issue(s) </Text>
            </View>
            <View style={{ flex: 4 }}>
              <TextInput
                style={homeStyle.inputs}
                placeholder={user
                .getSeizureDetails()
                .getMHIssues()
                .toString()}
                placeholderTextColor={"black"}
              ></TextInput>
            </View>
          </View>
        </View>
      );
    }
  };
  const patientDetailsArray = [];

  const loadAdminView = () => {
    if (user.getType() == "Admin") {
      const patientsList = user.getPatients();

      for (var i = 0; i < patientsList.length; i++) {
        const detail = patientsList[i];
        const patient = detail.user;
        patientDetailsArray.push({
          name: detail.name,
          DOB: detail.DOB,
          Link: (
            <Button
              title="View"
              onPress={() => {
                navigation.navigate("Patient Details", {
                  User: user,
                  Patient: patient,
                  Movies: movies,
                  Patients: analyticsInfo
                });
              }}
            />
          ),
        });
      }

      return (
        <View style={styles.container}>
          <View style={{ flexDirection: 'row'}}>
            <Button
              style={styles.btn}
              title="Create Patient"
              onPress={() => navigation.navigate("Create Patient", { User: user, Movies: movies, Patients: analyticsInfo })}
            />
            <Button
              style={styles.btn}
              title="Create Admin"
              onPress={() => navigation.navigate("Create Practitioner", { User: user, Movies: movies, Patients: analyticsInfo })}
            />
            <Button
              style={styles.btn}
              title="View Analytics"
              onPress={() => navigation.navigate("Analytics", { User: user, Movies: movies, Patients: analyticsInfo })}
            />
          </View>
          <Text style={homeStyle.title}>Patients: </Text>
          <View style={homeStyle.table}>
            <Table
              height={500}
              columnWidth={150}
              columns={columns}
              dataSource={patientDetailsArray}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <ScrollView>
      {displayNav(navigation, user, movies, analyticsInfo)}
      <View style={homeStyle.container}>
        <Text style={homeStyle.header}>Home Screen</Text>
      </View>
      <View style={styles.container}>
        <Text style={homeStyle.title}>Personal Details:</Text>

        <View style={homeStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>First Name: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.smallInputs}
              value={user.getFirstName()}
            ></TextInput>
          </View>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>Surname: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.smallInputs}
              value={user.getSurname()}
            ></TextInput>
          </View>
        </View>

        <View style={homeStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>Gender: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.smallInputs}
              value={user.getGender()}
            ></TextInput>
          </View>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>Postcode: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.smallInputs}
              value={user.getAddress().getPostcode()}
            ></TextInput>
          </View>
        </View>
        <View style={homeStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>Email: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.inputs}
              value={user.getEmail()}
            ></TextInput>
          </View>
        </View>
        <View style={homeStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>Date of birth : </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.inputs}
              value={user.getDOB()}
            ></TextInput>
          </View>
        </View>
        <View style={homeStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>Address: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.inputs}
              value={user.getAddress().getAddressLine()}
            ></TextInput>
          </View>
        </View>

        <View style={homeStyle.box}>
          <View style={{ flex: 4 }}>
            <Text style={homeStyle.field}>City: </Text>
          </View>
          <View style={{ flex: 4 }}>
            <TextInput
              style={homeStyle.inputs}
              value={user.getAddress().getCity()}
              placeholderTextColor="black"
            ></TextInput>
          </View>
        </View>
        <View style={styles.btn}>
          <Button
            title="Edit Personal Details"
            onPress={() =>
              navigation.navigate("Edit Personal Details", {
                User: user,
                Movies: movies,
                Patients: analyticsInfo
              })
            }
          />
        </View>
        {loadSeizureDetailsView()}
      </View>

      {loadAdminView()}
    </ScrollView>
  );
}
