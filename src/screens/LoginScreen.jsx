import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import React, { useState, useEffect } from "react";
import LOGO from "../../assets/logo.png";
const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://653f42fc9e8bd3be29e020f0.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  const checkLogin = (username, password) => {
    const user = data.find(
      (item) => item.username === username && item.password === password
    );
    if (user) {
      navigation.push("Home Screen", { user: user });
    } else {
      alert("Wrong username or password");
    }
  };

  const createNewUser = (username, password) => {
    fetch("https://653f42fc9e8bd3be29e020f0.mockapi.io/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
    alert("Sign Up Success");
  };

  return (
    <View style={styles.background}>
      <Image source={LOGO} style={styles.logo}></Image>
      <TextInput
        style={styles.textInput}
        label="Username"
        mode="outlined"
        textColor="black"
        onChangeText={(text) => {
          setUsername(text);
        }}
        value={username}
        theme={styles.textInputOutlineStyle}
      />
      <TextInput
        style={styles.textInput}
        label="Password"
        mode="outlined"
        secureTextEntry={true}
        textColor="black"
        onChangeText={(text) => {
          setPassword(text);
        }}
        value={password}
        theme={styles.textInputOutlineStyle}
      />
      <Text style={{ marginBottom: 40 }}>
        Forgot your password?{" "}
        <Text style={{ color: "#F1B000" }}>Click here</Text>
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => checkLogin(username, password)}
      >
        <Text style={styles.textBtn}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => createNewUser(username, password)}
      >
        <Text style={styles.textBtn}>REGISTOR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 200,
    width: 200,
    margin: 50,
  },
  textBtn: {
    fontSize: 20,
    fontWeight: 700,
  },
  textInput: {
    marginBottom: 8,
    width: 300,
    borderRadius: 3,
  },
  textInputOutlineStyle: {
    colors: {
      primary: "#F1B000",
      underlineColor: "transparent",
      background: "white",
    },
  },
  button: {
    alignItems: "center",
    padding: 12,
    margin: 12,
    width: 300,
    backgroundColor: "#F1B000",
    borderRadius: 12,
  },
});
