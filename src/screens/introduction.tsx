import { Platform, ScrollView, StyleSheet, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";

import { Button, ButtonText } from "@/components/button";
import Text from "@/components/text";

import AccordionDemo from "./introduction/accordion";
import CheckboxDemo from "./introduction/checkbox";
import RadioGroupDemo from "./introduction/radio-group";
import SliderDemo from "./introduction/slider";
import SwitchDemo from "./introduction/switch";

export default function IntroductionScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style="auto" />
      <Text style={{ fontSize: 24 }}>
        Free-to-use Components to supercharge your React Native app
      </Text>
      <Text style={{ fontSize: 16, marginVertical: 20 }}>
        React Native Components is a collection of reusable components that you
        can use in your React Native app. It is free to use and open-source.
      </Text>

      <Button style={{ alignSelf: "flex-start" }}>
        <ButtonText>Get Started</ButtonText>
        <MaterialIcons
          name={Platform.OS === "ios" ? "arrow-forward-ios" : "arrow-forward"}
          size={20}
          color="#fff"
        />
      </Button>

      <View style={{ marginTop: 50, rowGap: 24 }}>
        <RadioGroupDemo />
        <CheckboxDemo />
        <SwitchDemo />
        <AccordionDemo />
        <SliderDemo />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
});
