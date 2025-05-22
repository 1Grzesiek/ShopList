import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const usersJson = await AsyncStorage.getItem("USERS");
      const users = usersJson ? JSON.parse(usersJson) : [];

      const user = users.find(u => u.login === login && u.password === password);

      if (user) {
        await AsyncStorage.setItem("LOGGED_IN", "true");
        setIsLoggedIn(true); 
      } else {
        Alert.alert("Błędny login lub hasło");
      }
    } catch (error) {
      console.error("Błąd logowania:", error);
      Alert.alert("Błąd logowania");
    }
  };

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
      <Text style={styles.register} onPress={() => navigation.navigate("RegisterScreen")}>
        Nie masz konta? Zarejestruj się
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#f7f7f7"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15
  },
  register: {
    marginTop: 15,
    textAlign: "right",
    color: "#007AFF"
  }
});

