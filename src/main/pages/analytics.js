import React, { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import displayNav from "../components/NavBar";

import {
    Text,
    TouchableOpacity,
    TextInput,
    View,
    Dimensions
} from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from 'react-native-chart-kit'

const commonstyles = require("./stylesheets/styles");
const analyticsStyle = require("./stylesheets/analyticsStyle");

const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

const barChartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: 0.7,
    height: 5000,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

    style: {
        borderRadius: 16,
        fontFamily: "Bogle-Regular",
    },
    propsForBackgroundLines: {
        strokeWidth: 1,
        stroke: "#e3e3e3",
        strokeDasharray: "0",
    },
    propsForLabels: {
        fontFamily: "Bogle-Regular",
    },
}

// charts built using: https://www.instamobile.io/react-native-tutorials/react-native-charts/
function Analytics({ route, navigation }) {
    const params = route.params;
    const user = params.User;
    const movies = params.Movies;
    const patients = params.Patients;
    const patientsList = patients.getPatients();

    const SeizureTypesChart = () => {
        console.log("Setting up SeizureTypesChart...")
        let seizureTypeChartLabels = [];
        let seizureTypeChartData = [];


        //For each patient
        for (let i = 0; i < patientsList.length; i++) {
            let patient = patientsList[i];
            let seizureTypes = patient.patient_details.seizure_type;

            //For each patient seizure
            for (let seizureType of seizureTypes) {
                seizureType = seizureType.toLowerCase();
                function checkIndex(element) {
                    return element == this;
                }

                let indexOfType = seizureTypeChartLabels.findIndex(checkIndex, seizureType);

                // check if seizureType doesn't exist in seizureTypeChartLabels array
                if (indexOfType == -1) {
                    seizureTypeChartLabels.push(seizureType)
                    seizureTypeChartData.push(1)
                } else {
                    seizureTypeChartData[indexOfType] = seizureTypeChartData[indexOfType] + 1
                }
            }


        }

        let seizureTypeData = {
            labels: seizureTypeChartLabels,
            datasets: [{
                data: seizureTypeChartData,
            }],
        };

        return (
            <View >
                <View style={{ flex: 1 }}>
                    <Text>Seizure Types</Text>
                </View>
                <View>
                    <BarChart
                        data={seizureTypeData}
                        width={Dimensions.get('window').width}
                        height={220}
                        yAxisLabel={''}
                        chartConfig={barChartConfig}
                    />
                </View>
            </View>
        );
    }

    const TriggersChart = () => {
        console.log("Setting up TriggersChart...")
        let triggerChartLabels = [];
        let triggerChartData = [];

        //For each patient
        for (let i = 0; i < patientsList.length; i++) {
            let patient = patientsList[i];
            let triggers = patient.patient_details.seizure_triggers;

            //For each trigger
            for (let trigger of triggers) {
                trigger = trigger.toLowerCase();
                trigger = trigger.trim();
                function checkIndex(element) {
                    return element == this;
                }

                let indexOfType = triggerChartLabels.findIndex(checkIndex, trigger);

                // check if trigger doesn't exist in triggerChartLabels array
                if (indexOfType == -1) {
                    triggerChartLabels.push(trigger)
                    triggerChartData.push(1)
                } else {
                    triggerChartData[indexOfType] = triggerChartData[indexOfType] + 1
                }
            }
        }

        let pieDataArr = [];

        for (let i = 0; i < triggerChartLabels.length; i++) {
            pieDataArr.push(
                {
                    name: triggerChartLabels[i],
                    population: triggerChartData[i],
                    color: colorArray[i],
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,

                }
            );
        }

        return (
            <View>
                <View style={{ flex: 1 }}>
                    <Text>Seizure Triggers</Text>
                </View>
                <View>

                    <PieChart
                        data={pieDataArr}
                        width={Dimensions.get('window').width - 16}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#1cc910',
                            backgroundGradientFrom: '#eff3ff',
                            backgroundGradientTo: '#efefef',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute //for the absolute number remove if you want percentage
                    />
                </View>
            </View>);
    }

    const MentalHealthIssuesChart = () => {
        console.log("Setting up MentalHealthIssuesChart...")
        let mentalHealthChartLabels = [];
        let mentalHealthChartData = [];

        //For each patient
        for(let i = 0; i < patientsList.length; i++) {
            let patient = patientsList[i];
            let mentalHealths = patient.patient_details.mental_health_issues;
            
            //For each patient seizure
            for (let mentalHealth of mentalHealths) {
                mentalHealth = mentalHealth.toLowerCase();
                function checkIndex(element) {
                    return element == this;
                }

                let indexOfType = mentalHealthChartLabels.findIndex(checkIndex, mentalHealth);

                // check if mentalHealth doesn't exist in mentalHealthChartLabels array
                if (indexOfType == -1) {
                    mentalHealthChartLabels.push(mentalHealth)
                    mentalHealthChartData.push(1)
                } else {
                    mentalHealthChartData[indexOfType] = mentalHealthChartData[indexOfType] + 1
                }
            }


        }

        let mentalHealthData = {
            labels: mentalHealthChartLabels,
            datasets: [{
                data: mentalHealthChartData,
            }],
        };

        return (
            <View >
                <View style={{ flex: 1 }}>
                    <Text>Mental Health Issues</Text>
                </View>
                <View>
                    <BarChart
                        data={mentalHealthData}
                        width={Dimensions.get('window').width}
                        height={220}
                        yAxisLabel={''}
                        chartConfig={barChartConfig}
                    />
                </View>
            </View>
        );
    }

    return (
        <ScrollView style={commonstyles.container}>
            {displayNav(navigation, user, movies, patients)}
            <Text style={analyticsStyle.header}>Analytics Screen</Text>
            <StatusBar style="auto" />
            <SeizureTypesChart></SeizureTypesChart>
            <TriggersChart></TriggersChart>
            <MentalHealthIssuesChart></MentalHealthIssuesChart>
        </ScrollView>
    );

}

export default Analytics;