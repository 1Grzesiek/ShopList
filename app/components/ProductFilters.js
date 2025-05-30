import { View, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ProductFilters ({
  minPrice,
  maxPrice,
  selectedStore,
  uniqueStores,
  onMinPriceChange,
  onMaxPriceChange,
  onStoreChange,
}) {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.filteredContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Cena od:"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={onMinPriceChange}
          accessibilityLabel="Minimalna cena"
          accessibilityHint="Wprowadź minimalną cenę produktu"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Cena do:"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={onMaxPriceChange}
          accessibilityLabel="Maksymalna cena"
          accessibilityHint="Wprowadź maksymalną cenę produktu"
        />
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedStore}
          onValueChange={onStoreChange}
          accessibilityLabel="Wybierz sklep"
          accessibilityHint="Filtruj produkty według sklepu"
        >
          <Picker.Item label="Wszystkie sklepy" value="" />
          {uniqueStores.map((store) => (
            <Picker.Item
              key={store}
              label={store}
              value={store}
              accessibilityLabel={`Sklep ${store}`}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 10,
  },

  filteredContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  filterInput: {
    flex: 1,
    marginHorizontal: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 50,
    width: '100%',
  },
});

