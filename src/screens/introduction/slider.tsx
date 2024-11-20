import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Slider from "@/components/slider";
import Text from "@/components/text";
import { colors } from "@/theme";

export default function SliderDemo() {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(30);
  const [value3, setValue3] = useState(75);

  return (
    <View style={{ rowGap: 24 }}>
      <Text style={{ fontSize: 20 }}>Slider</Text>

      <View style={{ rowGap: 32 }}>
        {/* Basic Slider */}
        <View style={{ rowGap: 8 }}>
          <Text>Basic: {value1}</Text>
          <Slider
            value={value1}
            onValueChange={setValue1}
            activeTrackStyle={styles.activeTrack}
          />
        </View>

        {/* Slider with marks */}
        <View style={{ rowGap: 8 }}>
          <Text>With marks: {value2}</Text>
          <Slider
            value={value2}
            onValueChange={setValue2}
            step={10}
            showMarks
            activeTrackStyle={styles.activeTrack}
          />
        </View>

        {/* Vertical Slider */}
        <View style={{ rowGap: 8 }}>
          <Text>Vertical: {value3}</Text>
          <View style={{ height: 150 }}>
            <Slider
              value={value3}
              onValueChange={setValue3}
              orientation="vertical"
              showMarks
              step={25}
              activeTrackStyle={styles.activeTrack}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  activeTrack: {
    backgroundColor: colors.primary,
  },
});
