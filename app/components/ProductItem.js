import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProductItem ({
  item,
  onTogglePurchased,
  onRemove,
  onNavigateToInfo,
}) {
  return (
    <View style={styles.productRow}>
      <TouchableOpacity
        style={styles.productCart}
        onPress={() => onTogglePurchased(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`Produkt: ${item.name}`}
        accessibilityHint={`Kliknij, aby oznaczyć jako ${item.purchased ? 'niekupiony' : 'kupiony'}`}
      >
        <Text
          style={[
            styles.productName,
            item.purchased && styles.purchasedText
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.price}>💰{item.price.toFixed(2)} zł</Text>
      </TouchableOpacity>

      <View style={styles.productButtons}>
        <TouchableOpacity
          onPress={() => onNavigateToInfo(item)}
          accessibilityRole="button"
          accessibilityLabel={`Szczegóły produktu: ${item.name}`}
          accessibilityHint="Przejdź do widoku szczegółów produktu"
        >
          <Icon name="info-outline" size={40} style={styles.infoButton} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          accessibilityRole="button"
          accessibilityLabel={`Usuń produkt: ${item.name}`}
          accessibilityHint="Kliknij, aby usunąć produkt z listy"
        >
          <Icon name="close" size={40} style={styles.deleteButton} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },

  productCart: {
    flex: 1,
  },

  productName: {
    fontSize: 15,
    color: '#333',
  },

  purchasedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  price: {
    fontSize: 12,
    color: '#333',
  },

  productButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  infoButton: {
    color: '#007aff',
  },
  
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
});

