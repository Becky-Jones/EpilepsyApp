import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100
    // justifyContent: "center",
  },
  input: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    color: "white"
  },
  loginText: {
      color: "white"
  },
  Text: {
    height: 50,
    marginBottom: 20,
    padding: 10,
    fontSize: 20
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#42A5F5",
  },
  inputView: {
    backgroundColor: "#3399ff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
