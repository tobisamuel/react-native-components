import { View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "@/components/radio-group";
import Text from "@/components/text";
import { colors } from "@/theme";

export default function RadioGroupDemo() {
  return (
    <View style={{ rowGap: 4 }}>
      <Text style={{ fontSize: 18 }}>Radio Group</Text>
      <RadioGroup
        defaultValue="default"
        style={styles.radioGroup}
        accessibilityLabel="View density"
      >
        {["Default", "Comfortable", "Compact"].map((label) => (
          <View
            key={label}
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <RadioGroupItem
              value={label.toLowerCase()}
              style={({ isSelected }) => [
                styles.radioItem,
                isSelected && styles.radioItemSelected,
              ]}
            >
              <RadioGroupIndicator style={styles.radioIndicator} />
            </RadioGroupItem>
            <Text style={styles.label}>{label}</Text>
          </View>
          /**
           * A screen that displays a few examples of how to use the RadioGroup component
           */
        ))}
      </RadioGroup>

      {/* Example with dynamic styling and children API */}
      <Text style={{ fontSize: 16, marginTop: 20, marginBottom: 8 }}>
        Theme Selection
      </Text>
      <RadioGroup
        style={styles.themeRadioGroup}
        defaultValue="light"
        accessibilityLabel="Theme selection"
      >
        <RadioGroupItem
          value="light"
          style={({ isSelected }) => [
            styles.themeItem,
            isSelected && styles.themeItemSelected,
          ]}
        >
          {({ isSelected }) => (
            <View style={styles.themeContent}>
              <MaterialIcons
                name="light-mode"
                size={24}
                color={isSelected ? colors.primary : "#666"}
              />
              <View>
                <Text
                  style={[
                    styles.themeTitle,
                    isSelected && styles.themeTitleSelected,
                  ]}
                >
                  Light Mode
                </Text>
                <Text style={styles.themeDescription}>
                  Clean and bright interface
                </Text>
              </View>
            </View>
          )}
        </RadioGroupItem>

        <RadioGroupItem
          value="dark"
          style={({ isSelected }) => [
            styles.themeItem,
            isSelected && styles.themeItemSelected,
          ]}
        >
          {({ isSelected }) => (
            <View style={styles.themeContent}>
              <MaterialIcons
                name="dark-mode"
                size={24}
                color={isSelected ? colors.primary : "#666"}
              />
              <View>
                <Text
                  style={[
                    styles.themeTitle,
                    isSelected && styles.themeTitleSelected,
                  ]}
                >
                  Dark Mode
                </Text>
                <Text style={styles.themeDescription}>
                  Easy on the eyes at night
                </Text>
              </View>
            </View>
          )}
        </RadioGroupItem>
      </RadioGroup>
    </View>
  );
}

const styles = {
  radioGroup: {
    gap: 10,
  },
  radioItem: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  radioItemSelected: {
    borderColor: colors.primary,
  },
  radioIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 16,
  },

  themeRadioGroup: {
    gap: 12,
  },
  themeItem: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#fff",
    padding: 16,
  },
  themeItemSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  themeContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  themeTitleSelected: {
    color: colors.primary,
  },
  themeDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
} as const;
