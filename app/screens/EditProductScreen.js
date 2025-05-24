import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default function EditProductScreen({ route, navigation }) {
  const { product,} = route.params;
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleSave = () => {
   if (route.params.onSave) {
      route.params.onSave(editedProduct); 
    }
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nazwa:</Text>
      <TextInput
        style={styles.input}
        value={editedProduct.name}
        onChangeText={(text) => setEditedProduct({...editedProduct, name: text})}
      />

      <Text style={styles.label}>Cena (zł):</Text>
      <TextInput
        style={styles.input}
        value={editedProduct.price.toString()}
        onChangeText={(text) => setEditedProduct({...editedProduct, price: text.replace(/[^0-9.]/g, '')})}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Sklep:</Text>
      <TextInput
        style={styles.input}
        value={editedProduct.store}
        onChangeText={(text) => setEditedProduct({...editedProduct, store: text})}
      />

      <Text style={styles.label}>Opis:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={editedProduct.description}
        onChangeText={(text) => setEditedProduct({...editedProduct, description: text})}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>Powrót</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 15,
  },

  saveButton: {
    backgroundColor: '#27ae60',
    borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: "center",
      marginTop: 10,
  },
  
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  backButton:{
      backgroundColor: "#007aff",
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: "center",
      marginTop: 10,
  },

  backButtonText:{
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
  },
});