import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation} from "@react-navigation/native";

export default function ProductInfoScreen({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();

  // const edit = () => {

  // }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nazwa:</Text>
      <Text style={styles.value}>{product.name}</Text>

      <Text style={styles.label}>Cena:</Text>
      <Text style={styles.value}>{product.price} zł</Text>

      <Text style={styles.label}>Sklep:</Text>
      <Text style={styles.value}>{product.store}</Text>

      <Text style={styles.label}>Opis:</Text>
      <Text style={styles.value}>{product.description || "Brak opisu"}</Text>

      {/* <TouchableOpacity style={styles.editButton} onPress={edit}>
        <Text style={styles.editButtonText}>Edytuj</Text>
      </TouchableOpacity> */}

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
