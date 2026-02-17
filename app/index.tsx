import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.view}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>Hello world from React Native!</Text>
      <Link href="/login" style={styles.loginButton}>Tap to log in</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
  loginButton: {
        backgroundColor: "blue",
        width: 100,
        height: 20,
        borderRadius: 8,
        textAlign: "center",
        color: "white"
      }
});