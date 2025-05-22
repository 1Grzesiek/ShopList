import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!login || !password) {
      Alert.alert("Wypełnij wszystkie pola");
      return;
    }

    try {
      const usersJson = await AsyncStorage.getItem("USERS");
      const users = usersJson ? JSON.parse(usersJson) : [];
      const userExists = users.find(u => u.login === login);
      
      if (userExists) {
        Alert.alert("Użytkownik już istnieje");
        return;
      }

      users.push({ login, password });

      await AsyncStorage.setItem("USERS", JSON.stringify(users));
      Alert.alert("Zarejestrowano!", "", [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]);
    } catch (error) {
      console.error("Błąd rejestracji", error);
      Alert.alert("Błąd rejestracji");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>

      <TextInput 
      placeholder="Login" 
      value={login} 
      onChangeText={setLogin} 
      style={styles.input} />

      <TextInput placeholder="Hasło" 
      secureTextEntry 
      value={password} 
      onChangeText={setPassword} 
      style={styles.input} />

      <Button title="Zarejestruj" onPress={handleRegister} color="#27ae60" />

      <Text style={styles.login} onPress={() => navigation.navigate("LoginScreen")}>
              Masz konto? Zaloguj się
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

   login: {
    marginTop: 15,
    textAlign: "right",
    color: "#007AFF"
  },
});
