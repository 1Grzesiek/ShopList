import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingScreen() {
    return(
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#27ae60" />
        </View>
    )
}
    
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
    
