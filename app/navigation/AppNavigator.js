import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddProductScreen from "../screens/AddProductScreen";
import EditProductScreen from "../screens/EditProductScreen";
import LoginScreen from "../screens/LoginScreen";
import NotificationsScreen from "../screens/NotificationScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";

const Stack = createNativeStackNavigator();

const useAuthCheck = () => {
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

  return { isLoggedIn, isChecking, setIsLoggedIn };
};

export default function AuthNavigator()  {
  const { isLoggedIn, isChecking, setIsLoggedIn } = useAuthCheck();

  if (isChecking) return null;

  if (isLoggedIn) {
    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#fff" },
          headerTitleAlign: "center",
        }}
      >
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
              <View style={{ flexDirection: "row", marginRight: 10, }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Notifications")} 
                  style={{ marginRight: 15 }}
                >
                  <Icon name="notifications" size={35} color="#3498db" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddProduct")}
                >
                  <Icon name="add-circle-outline" size={35} color="#27ae60" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ title: "Edytuj produkt" }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ title: "Ustaw powiadomienie:" }}
        />
        <Stack.Screen
          name="AddProduct"
          component={AddProductScreen}
          options={{ title: "Dodaj Produkt:" }}
        />
        <Stack.Screen
          name="ProductInfo"
          component={ProductInfoScreen}
          options={{ title: "Szczegóły:" }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

