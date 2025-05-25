import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute} from "@react-navigation/native";

export default function ProductInfoScreen() {
 const route = useRoute();
  const navigation = useNavigation();
  const { product, onProductUpdate } = route.params;

  const edit = () => {
    navigation.navigate('EditProduct', {
      product: product,
      onSave: onProductUpdate 
    });
  };

  return (
    <View style={styles.container}>
      
      <Text
        style={styles.label}
        accessibilityRole="text"
        accessibilityLabel="Etykieta nazwa"
      >
        Nazwa:
      </Text>
      <Text
        style={styles.value}
        accessibilityLabel={`Nazwa produktu: ${product.name}`}
      >
        {product.name}
      </Text>

      <Text
        style={styles.label}
        accessibilityRole="text"
        accessibilityLabel="Etykieta cena"
      >
        Cena:
      </Text>
      <Text
        style={styles.value}
        accessibilityLabel={`Cena produktu: ${product.price} zł`}
      >
        {product.price} zł
      </Text>

      <Text
        style={styles.label}
        accessibilityRole="text"
        accessibilityLabel="Etykieta sklep"
      >
        Sklep:
      </Text>
      <Text
        style={styles.value}
        accessibilityLabel={`Sklep: ${product.store}`}
      >
        {product.store}
      </Text>

      <Text
        style={styles.label}
        accessibilityRole="text"
        accessibilityLabel="Etykieta opis"
      >
        Opis:
      </Text>
      <Text
        style={styles.value}
        accessibilityLabel={`Opis: ${product.description || "Brak opisu"}`}
      >
        {product.description || "Brak opisu"}
      </Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={edit}
        accessibilityRole="button"
        accessibilityLabel="Przycisk edytuj"
        accessibilityHint="Edytuj dane produktu"
      >
        <Text style={styles.editButtonText}>Edytuj</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Przycisk powrót"
        accessibilityHint="Powrót do poprzedniego ekranu"
      >
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
      borderRadius: 5,
      padding: 5,
      fontSize: 18,
      marginTop: 15,
  },

  value: {
      fontSize: 16,
      backgroundColor: "#fff",
      padding: 10,
      color: '#333',
      marginTop: 5,
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

   editButton:{
      backgroundColor: "#27ae60",
      borderRadius: 5,
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: "center",
      marginTop: 10,
  },

  editButtonText:{
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
  }
});
