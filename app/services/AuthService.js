import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import * as Crypto from "expo-crypto";

//logoawnie
export async function loginUser(login, password) {
  const usersJson = await AsyncStorage.getItem("USERS");
  const users = usersJson ? JSON.parse(usersJson) : [];

  const hashedInputPassword = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            password
          );
  const user = users.find(u => u.login === login && u.password === hashedInputPassword);

  if (!user) {
    throw new Error("Błędny login lub hasło");
  }
};
//rejestracja
export async function registerUser(login, password) {
  const usersJson = await AsyncStorage.getItem("USERS");
  const users = usersJson ? JSON.parse(usersJson) : [];

  const userExists = users.find(u => u.login === login);
  if (userExists) {
    throw new Error("Użytkownik już istnieje");
  }

  const hashedPassword = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );

  users.push({ login, password: hashedPassword });
  await AsyncStorage.setItem("USERS", JSON.stringify(users));
};

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("LOGGED_IN");
        setIsLoggedIn(value === "true");
      } catch (e) {
        console.error("Błąd odczytu", e);
        setError(e);
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async () => {
    try {
      await AsyncStorage.setItem("LOGGED_IN", "true");
      setIsLoggedIn(true);
    } catch (e) {
      setError(e);
      console.error("Błąd zapisu logowania", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.setItem("LOGGED_IN", "false");
      setIsLoggedIn(false);
    } catch (e) {
      setError(e);
      console.error("Błąd zapisu wylogowania", e);
    }
  };

  return {
    isLoggedIn,
    isChecking,
    error,
    login,
    logout,
  };
}