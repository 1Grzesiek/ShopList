import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';

export default function ShoppingListScreen() {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const lastAddedProductId = useRef(null);
  const STORAGE_KEY = 'PRODUCTS_LIST';

  const saveProducts = async (data) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Błąd zapisu: ', error);
    }
  };

  const loadProducts = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) setProducts(JSON.parse(json));
    } catch (error) {
      console.error('Błąd odczytu: ', error);
    } finally {
      setLoadedFromStorage(true);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!loadedFromStorage) return;

    const newProduct = route.params?.newProduct;

    if (newProduct && newProduct.id !== lastAddedProductId.current) {
      setProducts((prev) => [...prev, newProduct]);
      lastAddedProductId.current = newProduct.id;
    }
  }, [route.params?.newProduct, navigation, loadedFromStorage]);

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  const uniqueStores = Array.from(new Set(products.map((product) => product.store)));

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

    return uniqueStores.map((store) => ({
      title: store,
      data: filtered.filter((product) => product.store === store),
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
    const sorted = [...products].sort(
      (a, b) => (a.purchased ? 1 : 0) - (b.purchased ? 1 : 0)
    );
    setProducts(sorted);
  };

  const handleNavigateToInfo = (product) => {
    navigation.navigate('ProductInfo', {
      product: product,
      onProductUpdate: (updatedProduct) => {
        setProducts((prev) =>
          prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      },
    });
  };

  return (
    <View style={styles.container}>
      <ProductFilters
        minPrice={minPrice}
        maxPrice={maxPrice}
        selectedStore={selectedStore}
        uniqueStores={uniqueStores}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onStoreChange={setSelectedStore}
      />

      <ProductList
        sections={getSections()}
        onTogglePurchased={togglePurchased}
        onRemove={removeProduct}
        onNavigateToInfo={handleNavigateToInfo}
        onSort={sortProducts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
});