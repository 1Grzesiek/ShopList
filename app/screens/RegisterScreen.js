import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { registerUser } from "../services/AuthService";

export default function RegisterScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  //dodanie walidacji hasła i loginu
  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    );
  };
  const validateLogin = (login) => login.length >= 3;

  const handleRegister = async () => {
    if (!login || !password) {
      Alert.alert("Wypełnij wszystkie pola");
      return;
    } else if (!validateLogin(login)){
      Alert.alert("Nazwa użytkownika nie spełnia wymagań!", "Musi się składać z co najmniej 3 znaków.")
      return;
    } else if (!validatePassword(password)){
      Alert.alert("Hasło nie spełnia wymagań!", "Musi się składać z: 8 znaków, cyfry i wielkiej litery.");
      return;
    }

  try {
      await registerUser(login, password);
      Alert.alert("Zarejestrowano!", "", [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]);
    } catch (error) {
      console.error("Błąd rejestracji", error);
      Alert.alert(error.message || "Błąd rejestracji");
    }
  };
  //Dodanie accesibility label i hint dla osob z niepelnosprawnosciami
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>

      <TextInput
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        style={styles.input}
        accessibilityLabel="Pole loginu"
        accessibilityHint="Wprowadź swoją nazwę użytkownika"
      />

      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        accessibilityLabel="Pole hasła"
        accessibilityHint="Wprowadź hasło. Minimum 8 znaków, jedna duża litera i cyfra"
      />

      <Button
        title="Zarejestruj"
        onPress={handleRegister}
        color="#27ae60"
        accessibilityLabel="Przycisk zarejestruj"
        accessibilityHint="Zarejestruj nowe konto"
      />

      <Text
        style={styles.login}
        onPress={() => navigation.navigate("LoginScreen")}
        accessibilityRole="link"
        accessibilityLabel="Masz konto? Zaloguj się"
        accessibilityHint="Przejdź do ekranu logowania"
      >
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
