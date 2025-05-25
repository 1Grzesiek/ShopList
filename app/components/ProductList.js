import { SectionList, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

export default function ProductList ({
  sections,
  onTogglePurchased,
  onRemove,
  onNavigateToInfo,
  onSort,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sortButton} onPress={onSort}>
        <Text style={styles.sortButtonText}>Sortuj (kupione na końcu)</Text>
      </TouchableOpacity>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onTogglePurchased={onTogglePurchased}
            onRemove={onRemove}
            onNavigateToInfo={onNavigateToInfo}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sortButton: {
    backgroundColor: '#007aff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  sortButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

