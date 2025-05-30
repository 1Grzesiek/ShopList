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
      <TouchableOpacity
        style={styles.sortButton}
        onPress={onSort}
        accessibilityRole="button"
        accessibilityLabel="Przycisk sortowania"
        accessibilityHint="Sortuj produkty tak, aby kupione były na końcu listy"
      >
        <Text style={styles.sortButtonText}>Sortuj (kupione na końcu)</Text>
      </TouchableOpacity>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <Text
            style={styles.sectionHeader}
            accessibilityRole="header"
            accessibilityLabel={`Sekcja: ${section.title}`}
          >
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onTogglePurchased={onTogglePurchased}
            onRemove={onRemove}
            onNavigateToInfo={onNavigateToInfo}
          />
        )}
        accessibilityLabel="Lista produktów"
        accessibilityHint="Lista zawierająca produkty pogrupowane według sklepów"
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

