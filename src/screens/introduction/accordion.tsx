import { Platform, StyleSheet, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import Accordion from "@/components/accordion";
import Text from "@/components/text";
import { colors } from "@/theme";

export default function AccordionDemo() {
  return (
    <View style={{ rowGap: 12 }}>
      <Text style={{ fontSize: 20 }}>Accordion</Text>

      <Accordion defaultValue="item-1">
        {/* iOS Style Accordion */}
        <Accordion.Item
          value="item-1"
          style={({ expanded }) => [
            styles.item,
            expanded && styles.itemExpanded,
          ]}
        >
          <Accordion.Trigger
            style={({ pressed }) => [
              styles.trigger,
              pressed && styles.triggerPressed,
            ]}
          >
            {({ expanded }) => (
              <>
                <Text style={styles.triggerText}>
                  Is it accessible?
                </Text>
                <MaterialIcons
                  name={Platform.OS === "ios" ? "chevron-right" : "arrow-forward"}
                  size={20}
                  color={colors.mutedForeground}
                  style={[
                    styles.triggerIcon,
                    expanded && styles.triggerIconExpanded,
                  ]}
                />
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content style={styles.content}>
            <Text style={styles.contentText}>
              Yes! The component is built with accessibility in mind. It uses
              proper ARIA attributes and supports keyboard navigation.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          value="item-2"
          style={({ expanded }) => [
            styles.item,
            expanded && styles.itemExpanded,
          ]}
        >
          <Accordion.Trigger
            style={({ pressed }) => [
              styles.trigger,
              pressed && styles.triggerPressed,
            ]}
          >
            {({ expanded }) => (
              <>
                <Text style={styles.triggerText}>
                  Is it customizable?
                </Text>
                <MaterialIcons
                  name={Platform.OS === "ios" ? "chevron-right" : "arrow-forward"}
                  size={20}
                  color={colors.mutedForeground}
                  style={[
                    styles.triggerIcon,
                    expanded && styles.triggerIconExpanded,
                  ]}
                />
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content style={styles.content}>
            <Text style={styles.contentText}>
              Yes! You can customize the styling of every part of the accordion
              using style props or render functions. The animations are also
              customizable.
            </Text>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          value="item-3"
          style={({ expanded }) => [
            styles.item,
            expanded && styles.itemExpanded,
          ]}
        >
          <Accordion.Trigger
            style={({ pressed }) => [
              styles.trigger,
              pressed && styles.triggerPressed,
            ]}
          >
            {({ expanded }) => (
              <>
                <Text style={styles.triggerText}>
                  Is it performant?
                </Text>
                <MaterialIcons
                  name={Platform.OS === "ios" ? "chevron-right" : "arrow-forward"}
                  size={20}
                  color={colors.mutedForeground}
                  style={[
                    styles.triggerIcon,
                    expanded && styles.triggerIconExpanded,
                  ]}
                />
              </>
            )}
          </Accordion.Trigger>
          <Accordion.Content style={styles.content}>
            <Text style={styles.contentText}>
              Yes! The animations use native drivers when possible and the content
              is properly mounted/unmounted to save memory.
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: colors.muted,
    borderRadius: 6,
    marginBottom: 2,
    overflow: Platform.OS === "ios" ? "hidden" : undefined,
  },
  itemExpanded: {
    marginBottom: 8,
  },
  trigger: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  triggerPressed: {
    backgroundColor: colors.accent,
  },
  triggerText: {
    fontSize: 16,
    color: colors.foreground,
  },
  triggerIcon: {
    transform: [{ rotate: "0deg" }],
  },
  triggerIconExpanded: {
    transform: [{ rotate: "90deg" }],
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentText: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
});
