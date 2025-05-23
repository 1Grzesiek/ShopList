import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ShoppingListScreen() {
    const[products, setProducts] = useState([]);
    const[minPrice, setMinPrice] = useState("");
    const[maxPrice, setMaxPrice] = useState("");
    const[selectedStore, setSelectedStore] = useState("");
    const[loadedFromStorage, setLoadedFromStorage] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();
    const lastAddedProductId = useRef(null);
    const STORAGE_KEY = "PRODUCTS_LIST";

    const saveProducts = async (data) => {
        try {        
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.error("Błąd zapisu: ", error);
        }
    };

    const loadProducts = async () => {
        try {
            const json = await AsyncStorage.getItem(STORAGE_KEY);
            if (json) setProducts(JSON.parse(json));
            } catch (error) {
            console.error("Błąd odczytu: ", error);
        } finally {
            setLoadedFromStorage(true);
        }
    }

     useEffect(() => {
        loadProducts(); 
    }, []);

    useEffect(() => {
        if (!loadedFromStorage) return;

        const newProduct = route.params?.newProduct;

        if (newProduct && newProduct.id !== lastAddedProductId.current){
            setProducts(prev => [...prev, newProduct]);
            lastAddedProductId.current = newProduct.id;
        }   
    }, [route.params?.newProduct, navigation, loadedFromStorage]);

     useEffect(() => {
        saveProducts(products); 
    }, [products]);

    const uniqeStores = Array.from(new Set(products.map(product => product.store)));

    const applyFilters = () => {
        return products.filter((product) => {
        const priceRange =
            (!minPrice || product.price >= parseFloat(minPrice)) &&
            (!maxPrice || product.price <= parseFloat(maxPrice));

        const storeMatch = !selectedStore || product.store === selectedStore;

        return priceRange && storeMatch;
        });
    };

    const getSections = () => {
    const filtered = applyFilters();

        return uniqeStores.map(store => ({
            title: store,
            data: filtered.filter(product => product.store === store)
        }));
    };

    const togglePurchased = (id) => {
        setProducts((prev) =>
        prev.map((product) =>
            product.id === id
            ? { ...product, purchased: !product.purchased }
            : product
        )
        );
    };

    const removeProduct = (id) => {
        setProducts((prev) => prev.filter((product) => product.id !== id));
    };

    const sortProducts = () => {
        const sorted = [...products].sort((a,b) =>
            (a.purchased ? 1 : 0) - (b.purchased ? 1 : 0)
        );
        setProducts(sorted);
    };

    return (
        <View style={styles.container}>

            <View style={styles.filteredContainer}>
                <TextInput style={styles.FilterInput}
                placeholder="Cena od:"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
                />
                <TextInput style={styles.FilterInput}
                placeholder="Cena do:"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
                />
            </View>

            <View style={styles.pickerContainer}>
                <Picker 
                selectedValue={selectedStore}
                onValueChange={setSelectedStore}
                >
                <Picker.Item label="Wszystkie sklepy" value="" />
                {uniqeStores.map(store => (
                    <Picker.Item key={store} label={store} value={store} />
                ))}
                </Picker>
            </View>

            <TouchableOpacity style={styles.sortButton} onPress={sortProducts}>
                <Text style={styles.sortButtonText}>Sortuj (kupione na końcu)</Text>
            </TouchableOpacity>
            <SectionList
            sections={getSections()}
            keyExtractor={item => item.id.toString()}
            renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            renderItem={({ item }) => (
                <View style={styles.productRow}>
                    <TouchableOpacity 
                    style={styles.productCart}
                    onPress={() => togglePurchased(item.id)}
                    >
                        <Text style={[styles.productName, item.purchased && styles.purchasedText]}>
                            {item.name}
                        </Text>
                        <Text style={styles.price}>💰{item.price.toFixed(2)} zł</Text>
                    </TouchableOpacity>
                    <View style={styles.productButtons}>
                    <TouchableOpacity onPress={() => navigation.navigate("ProductInfo", { product: item })}>
                            <Icon name="info-outline" size={40}  style={styles.infoButton} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeProduct(item.id)}>
                            <Icon name="close" size={40}  style={styles.deleteButton} />
                        </TouchableOpacity>
                    </View>        
                </View>
                )}
            /> 
        </View>
    )};

    const styles = StyleSheet.create({
        
        container:{
            flex: 1,
            padding: 10,
            backgroundColor: "#f7f7f7"
        },

        filteredContainer:{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
        },
        
        FilterInput:{
            flex: 1,
            marginHorizontal: 2,
            padding: 10,
            borderRadius: 5,
            backgroundColor: "#fff",
            borderColor: "#ccc",
            borderWidth: 1,
        },

        pickerContainer:{
            backgroundColor: "#fff",
            borderRadius: 5,
            borderColor: "#ccc",
            borderWidth: 1,
            marginBottom: 10,
            height: 50, 
            width: "100%",
        },

        sortButton:{
            backgroundColor: "#007aff",
            borderRadius: 5,
            paddingVertical: 12,
            paddingHorizontal: 20,
            alignItems: "center",
            marginBottom: 10,
        },

        sortButtonText:{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
        },

        sectionHeader:{
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 5,
        },

        productRow:{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
        },

        productCart:{
            flex: 1
        },

        productName:{
            fontSize: 15,
            color: "#333"
        },
        
        purchasedText:{
            textDecorationLine: "line-through",
            color: "gray"
        },

        price:{
            fontSize: 12,
            color: "#333"
        },

        productButtons:{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
        },

        infoButton:{
            color: "#007aff",
        },

        deleteButton:{
            color: "red",
            marginLeft: 10,           
        },
    });
