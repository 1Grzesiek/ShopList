import { useState } from "react";
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AddProductScreen() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [store, setStore] = useState("");
    const [description, setDescription] = useState("");
    const navigation = useNavigation();
    //dodanie walidacji
    const validatePrice = (price) => {
        const num = parseFloat(price);
        return !isNaN(num) && num > 0;
    };

    const addProduct = () => {
        if (!name || !price || !store){
            Alert.alert("Błąd, uzupełnij wszystkie pola!");
        return;
       }else if(!validatePrice(price)) {
            Alert.alert("Błąd", "Cena musi być dodatnią liczbą.");
        return;
       }

        const newProduct = {
            id: Date.now(),
            name,
            price: parseFloat(price),
            store,
            description,
            purchased: false,
        };
        //Dodanie potwierdzenia dodania produktu
        Alert.alert("Sukces", "Dodano produkt",  [{
            text: "OK",
            onPress: () => navigation.navigate("HomeScreen", { newProduct})
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <TextInput 
            style={styles.input}
            placeholder="Nazwa"
            value={name}
            onChangeText={setName}
            />
            <TextInput 
            style={styles.input}
            placeholder="Cena"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
            />
            <TextInput 
            style={styles.input}
            placeholder="Sklep"
            value={store}
            onChangeText={setStore}
            />
            <TextInput 
            style={styles.input}
            placeholder="Opis"
            value={description}
            onChangeText={setDescription}
            />
            <TouchableOpacity style={styles.addButton} onPress={addProduct}>
                <Text style={styles.addButtonText}>Dodaj Produkt</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={ () => navigation.goBack()}>
                <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
        </View>
    )};

const styles = StyleSheet.create({
    
  container: { 
        flex: 1, 
        padding: 20 
  },

  input:{
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
  },
  
   addButton:{
        backgroundColor: "#27ae60",
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 10,
    },
    addButtonText:{
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },

     cancelButton:{
        backgroundColor: "red",
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: "center",
        marginBottom: 10,
    },

    cancelButtonText:{
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});