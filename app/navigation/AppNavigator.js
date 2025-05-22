import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import AddProductScreen from "../screens/AddProductScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const value = await AsyncStorage.getItem("LOGGED_IN");
      setIsLoggedIn(value === "true");
      setIsChecking(false);
    };
    checkLoginStatus();
  }, []);

  if (isChecking) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleAlign: "center",
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="HomeScreen"
            component={ShoppingListScreen}
            options={({ navigation }) => ({
              title: "Do kupienia:",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.setItem("LOGGED_IN", "false");
                    setIsLoggedIn(false);
                  }}
                  style={{ marginLeft: 10 }}
                >
                  <Icon name="logout" size={35} color="#ff3b30" />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddProduct")}
                  style={{ marginRight: 10 }}
                >
                  <Icon name="add-circle-outline" size={35} color="#27ae60" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProductScreen}
            options={{
              title: "Dodaj Produkt:",
            }}
          />
          <Stack.Screen
            name="ProductInfo"
            component={ProductInfoScreen}
            options={{
              title: "Szczegóły:",
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            options={{ headerShown: false }}
          >
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

