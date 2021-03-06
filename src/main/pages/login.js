import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Patient } from "../components/Patient";
import { Admin } from "../components/Admin";

import { Text, TouchableOpacity, TextInput, View, Button } from "react-native";
import { Movies } from "../components/Movies";
import { Movie } from "../components/Movie";
import { Warnings } from "../components/Warnings";
import { Warning } from "../components/Warning";
import { Patients } from "../components/Patients";

const commonstyles = require("./stylesheets/loginStyles");

function LoginScreen({ navigation }) {
  const [S_Email, setEmail] = useState("");
  const [S_Password, setPassword] = useState("");

  const CheckLogin = () => {
    var url = "http://192.168.0.7:4000/user/" + S_Email;
    url;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((data) => {
        var json = JSON.parse(data);
        if (json.user.length == 0) {
          alert("Invalid email or password, please try again");
          return;
        }
        const user = json.user[0];

        console.log(
          "checking password " + S_Password + " Against db " + user.password
        );
        if (user.password == S_Password) {
          console.log("User Successfully logged in");
          console.log(user);
          console.log(user._id + " is a " + user.user_type);
          // fetch analytics info
          const analyticsInfo = new Patients();

          var url = "http://192.168.0.7:4000/patients";
          console.log(url);
          fetch(url, {
              method: "GET",
          })
          .then((response) => response.text())
              .then((data) => {
              var json = JSON.parse(data);
              analyticsInfo.setPatients(json.patients);
              })
              .catch((error) => {
              alert("An error occurred, please try again");
              console.error(error);
          });
          if (user.user_type == "Patient") {
            const details = user.patient_details;
            let patient = new Patient(
              user._id,
              user.user_type,
              user.first_name,
              user.surname,
              user.date_of_birth,
              user.email,
              user.password,
              user.gender,
              user.address1,
              user.address2,
              user.postcode,
              details.practitioner_id,
              details.seizure_triggers,
              details.seizure_type,
              details.seizure_monthly_frequency,
              details.years_suffered,
              details.mental_health_issues
            );

            // LOAD MOVIES!!
            const movies = new Movies();
            fetch("http://192.168.0.7:4000/movies", {
              method: "GET",
            })
              .then((response) => response.text())
              .then((data) => {
                var json = JSON.parse(data);
                const moviesList = [];
                const moviesArray = json.movies;
                for (var i = 0; i < moviesArray.length; i++) {
                  var warningsList = [];
                  const details = moviesArray[i];
                  const warningsArray = moviesArray[i].warnings;
                  for (var x = 0; x < warningsArray.length; x++) {
                    const warning = new Warning(
                      warningsArray[x].start_time,
                      warningsArray[x].end_time
                    );
                    warningsList.push(warning);
                  }
                  const warning = new Warnings(warningsList);
                  const movie = new Movie(
                    details._id,
                    details.title,
                    details.length,
                    warning
                  );
                  moviesList.push(movie);
                }
                movies.setMovies(moviesList);
              });
            setTimeout(function () {
              navigation.navigate("Home", { User: patient, Movies: movies, Patients: analyticsInfo });
            }, 2000);
          } else {
            // LOAD PATIENTS!!!
            const patientDetailsArray = [];
            var url = "http://192.168.0.7:4000/my-patients/" + user._id;
            console.log(url);
            fetch(url, {
              method: "GET",
            })
              .then((response) => response.text())
              .then((data) => {
                var json = JSON.parse(data);
                const myArray = json.myPatients;
                for (var i = 0; i < myArray.length; i++) {
                  const userId = myArray[i]._id;
                  patientDetailsArray.push({
                    user: myArray[i],
                    name: myArray[i].first_name + " " + myArray[i].surname,
                    DOB: myArray[i].date_of_birth,
                    id: userId,
                  });
                }
              });

            // LOAD MOVIES!!
            const movies = new Movies();
            fetch("http://192.168.0.7:4000/movies", {
              method: "GET",
            })
              .then((response) => response.text())
              .then((data) => {
                var json = JSON.parse(data);
                const moviesList = [];
                const moviesArray = json.movies;
                for (var i = 0; i < moviesArray.length; i++) {
                  var warningsList = [];
                  const details = moviesArray[i];
                  const warningsArray = moviesArray[i].warnings;
                  for (var x = 0; x < warningsArray.length; x++) {
                    const warning = new Warning(
                      warningsArray[x].start_time,
                      warningsArray[x].end_time
                    );
                    warningsList.push(warning);
                  }
                  const warning = new Warnings(warningsList);
                  const movie = new Movie(
                    details._id,
                    details.title,
                    details.length,
                    warning
                  );
                  moviesList.push(movie);
                }
                movies.setMovies(moviesList);
              });

            setTimeout(function () {
              let admin = new Admin(
                user._id,
                user.user_type,
                user.first_name,
                user.surname,
                user.date_of_birth,
                user.email,
                user.password,
                user.gender,
                user.address1,
                user.address2,
                user.postcode,
                patientDetailsArray
              );
              console.log("MOVIES: " + JSON.stringify(movies.getMovies()));
              navigation.navigate("Home", { User: admin, Movies: movies, Patients: analyticsInfo  });
            }, 3000);
          }
        } else {
          alert("Invalid email or password, please try again");
          console.log("password incorrect");
        }
      })
      .catch((error) => {
        alert("An error occurred, please try again");
        console.error(error);
      });
  };

  return (
    <View style={commonstyles.container}>
      <Text style={commonstyles.Text}>WCFB Epilepsy App Login</Text>
      <StatusBar style="auto" />
      <View style={commonstyles.inputView}>
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          style={commonstyles.input}
          value={S_Email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={commonstyles.inputView}>
        <TextInput
          style={commonstyles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          value={S_Password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={commonstyles.loginBtn} onPress={CheckLogin}>
        <Text style={commonstyles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
