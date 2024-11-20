import { StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

export default function SwitchScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up Switch.tsx to start working on your switch!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
