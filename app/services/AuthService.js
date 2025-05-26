import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

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