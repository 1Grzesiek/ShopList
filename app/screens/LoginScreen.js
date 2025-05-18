import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (login && password) {
      navigation.replace("HomeScreen");
    } else {
      Alert.alert("Nieprawidłowy Login lub Hasło!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />
      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Zaloguj" onPress={handleLogin} color="#27ae60" />
    </View>
  );
}

const styles = StyleSheet.create({

  container:{ 
      flex: 1, 
      justifyContent: "center", 
      padding: 30, 
      backgroundColor: "#f7f7f7" 
  },

  title:{ 
      fontSize: 24, 
      marginBottom: 20, 
      textAlign: "center", 
      fontWeight: "bold", 
      color: "#333"
   },
   
  input:{ 
      borderWidth: 1, 
      borderColor: "#ddd", 
      backgroundColor: "#fff", 
      padding: 10, 
      borderRadius: 5, 
      marginBottom: 15 
  },
});

