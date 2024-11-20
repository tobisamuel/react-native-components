import { View } from "react-native";

import { Switch, SwitchThumb } from "@/components/switch";
import Text from "@/components/text";
import { colors } from "@/theme";

export default function SwitchDemo() {
  return (
    <View style={{ rowGap: 12 }}>
      <Text style={{ fontSize: 20 }}>Switch</Text>

      {/* iOS Style Switch */}
      <View style={styles.container}>
        <Text style={styles.label}>Airplane mode</Text>
        <Switch
          style={({ checked }) => [
            styles.switch,
            checked && styles.switchChecked,
          ]}
        >
          <SwitchThumb
            style={({ checked }) => [
              styles.thumb,
              {
                transform: [{ translateX: checked ? 20 : 0 }],
              },
            ]}
          />
        </Switch>
      </View>

      {/* Material Style Switch */}
      <View style={styles.container}>
        <Text style={styles.label}>Dark mode</Text>
        <Switch
          style={({ checked }) => [
            styles.materialSwitch,
            checked && styles.materialSwitchChecked,
          ]}
        >
          <SwitchThumb
            style={({ checked }) => [
              styles.materialThumb,
              checked && styles.materialThumbChecked,
              {
                transform: [{ translateX: checked ? 20 : 0 }],
              },
            ]}
          />
        </Switch>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  // iOS Style
  switch: {
    width: 50,
    height: 30,
    backgroundColor: "#e9e9ea",
    borderRadius: 15,
    padding: 2,
  },
  switchChecked: {
    backgroundColor: colors.primary,
  },
  thumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  // Material Style
  materialSwitch: {
    width: 50,
    height: 14,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 7,
    padding: 0,
  },
  materialSwitchChecked: {
    backgroundColor: `${colors.primary}50`,
  },
  materialThumb: {
    position: "absolute",
    top: -5,
    left: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  materialThumbChecked: {
    backgroundColor: colors.primary,
  },
} as const;
