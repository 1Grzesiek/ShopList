import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as Crypto from 'expo-crypto';

export default function LoginScreen({ navigation, onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  //dodanie walidacji formatu danych
  const validateLogin = (login) => login.length >= 3;
  const validatePassword = (password) => password.length >= 8;

  const handleLogin = async () => {
    if (!validateLogin(login)) {
      Alert.alert("Login musi mieć co najmniej 3 znaki");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

      try {
        const usersJson = await AsyncStorage.getItem("USERS");
        const users = usersJson ? JSON.parse(usersJson) : [];
        //dodanie obsługi porownywania hashowanych haseł
        const hashedInputPassword = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          password
        );

        const user = users.find(u => u.login === login && u.password === hashedInputPassword);

        if (user) {
          await AsyncStorage.setItem("LOGGED_IN", "true");          
          onLogin();
        } else {
          Alert.alert("Błędny login lub hasło");
        }
      } catch (error) {
        console.error("Błąd logowania:", error);
        Alert.alert("Błąd logowania");
      }
  };
  //Dodanie accesibility label i hint dla osob z niepelnosprawnosciami
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>

      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
        accessibilityLabel="Pole login"
        accessibilityHint="Wprowadź swój login"
      />

      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        accessibilityLabel="Pole hasło"
        accessibilityHint="Wprowadź swoje hasło. Pole ukrywa wpisywany tekst."
      />

      <Button 
        title="Zaloguj" 
        onPress={handleLogin} 
        color="#27ae60" 
        accessibilityLabel="Przycisk zaloguj"
        accessibilityHint="Zaloguj się do aplikacji"
      />

      <Text
        style={styles.register}
        onPress={() => navigation.navigate("RegisterScreen")}
        accessibilityRole="link"
        accessibilityLabel="Przejdź do rejestracji"
        accessibilityHint="Naciśnij, aby przejść do ekranu rejestracji"
      >
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

