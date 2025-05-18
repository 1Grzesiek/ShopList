import { TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import AddProductScreen from "../screens/AddProductScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
            headerStyle: {
                backgroundColor: "#fff",
                headerTitleAlign: "center"
            },
        }}>

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={ShoppingListScreen}
        options={({ navigation }) => ({
          title: "Do kupienia:",
          headerTitleAlign: "center",

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: "Login"}],
              })}
            >
                <Icon name="logout" size={35} color="#ff3b30" />
            </TouchableOpacity>
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("AddProduct")}
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
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
        options={{
          title: "Szczegóły:",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

