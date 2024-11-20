import { View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { Checkbox, CheckboxIndicator } from "@/components/checkbox";
import Text from "@/components/text";
import { colors } from "@/theme";

export default function CheckboxDemo() {
  return (
    <View style={{ rowGap: 4 }}>
      <Text style={{ fontSize: 20 }}>Checkbox</Text>

      <View style={{ gap: 12 }}>
        {/* List of checkboxes */}
        <View style={styles.checkboxList}>
          <Text style={styles.checkboxListTitle}>Select Features</Text>

          {["Analytics", "Cloud Backup", "Auto-Update"].map((feature) => (
            <Checkbox
              key={feature}
              style={({ checked }) => [
                styles.listCheckbox,
                checked && styles.listCheckboxChecked,
              ]}
            >
              <View style={styles.listCheckboxContent}>
                <View style={styles.listCheckboxBox}>
                  <CheckboxIndicator>
                    <MaterialIcons
                      name="check"
                      size={14}
                      color={colors.primary}
                    />
                  </CheckboxIndicator>
                </View>

                <Text style={styles.listCheckboxText}>{feature}</Text>
              </View>
            </Checkbox>
          ))}
        </View>

        {/* Advanced checkbox with dynamic styling */}
        <Checkbox
          style={({ checked }) => [
            styles.customCheckbox,
            checked && styles.customCheckboxChecked,
          ]}
        >
          <View style={styles.customCheckboxContent}>
            <View style={styles.customCheckboxBox}>
              <CheckboxIndicator>
                <MaterialIcons
                  name="local-fire-department"
                  size={16}
                  color="#fff"
                />
              </CheckboxIndicator>
            </View>
            <View>
              <Text style={styles.customCheckboxTitle}>
                Enable experimental features
              </Text>
              <Text style={styles.customCheckboxDescription}>
                Try out the latest beta features
              </Text>
            </View>
          </View>
        </Checkbox>
      </View>
    </View>
  );
}

const styles = {
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  // List Checkbox Styles
  checkboxList: {
    marginTop: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  checkboxListTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  // Custom Checkbox Styles
  customCheckbox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#fff",
    padding: 12,
  },
  customCheckboxChecked: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  customCheckboxContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  customCheckboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  customCheckboxTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  customCheckboxTitleChecked: {
    color: colors.primary,
  },
  customCheckboxDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  listCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  listCheckboxChecked: {
    backgroundColor: "transparent",
  },
  listCheckboxContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  listCheckboxBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  listCheckboxBoxChecked: {
    borderColor: colors.primary,
    backgroundColor: "#fff",
  },
  listCheckboxText: {
    fontSize: 15,
    color: "#333",
  },
} as const;
