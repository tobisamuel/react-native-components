import React, { useCallback, useEffect, useMemo } from "react";
import {
  AccessibilityInfo,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface SliderProps {
  /**
   * The current value of the slider
   */
  value?: number;
  /**
   * The default value of the slider
   */
  defaultValue?: number;
  /**
   * Callback that is called when the slider's value changes
   */
  onValueChange?: (value: number) => void;
  /**
   * The minimum value of the slider
   */
  min?: number;
  /**
   * The maximum value of the slider
   */
  max?: number;
  /**
   * The granularity the slider can step through values
   */
  step?: number;
  /**
   * Whether the slider is disabled
   */
  disabled?: boolean;
  /**
   * The orientation of the slider
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Whether to show marks on the track for each step
   */
  showMarks?: boolean;
  /**
   * Custom mark positions (in value units)
   */
  marks?: number[];
  /**
   * Whether to animate value changes
   */
  animated?: boolean;
  /**
   * Style for the track
   */
  trackStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the thumb
   */
  thumbStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the active track
   */
  activeTrackStyle?: StyleProp<ViewStyle>;
  /**
   * Style for marks
   */
  markStyle?: StyleProp<ViewStyle>;
}

const THUMB_SIZE = 20;
const TRACK_HEIGHT = 4;
const MARK_SIZE = 4;

export default function Slider({
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = "horizontal",
  showMarks = false,
  marks,
  animated = true,
  trackStyle,
  thumbStyle,
  activeTrackStyle,
  markStyle,
}: SliderProps) {
  // Animated values
  const progress = useSharedValue(
    ((controlledValue ?? defaultValue) - min) / (max - min),
  );
  const isDragging = useSharedValue(false);

  // Update progress when controlled value changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      progress.value = animated
        ? withSpring((controlledValue - min) / (max - min))
        : (controlledValue - min) / (max - min);
    }
  }, [controlledValue, min, max, animated, progress]);

  // Calculate mark positions
  const markPositions = useMemo(() => {
    if (!showMarks) return [];
    if (marks) return marks.map((mark) => (mark - min) / (max - min));
    const positions: number[] = [];
    for (let i = min; i <= max; i += step) {
      positions.push((i - min) / (max - min));
    }
    return positions;
  }, [showMarks, marks, min, max, step]);

  // Handle value changes
  const handleValueChange = useCallback(
    (newProgress: number) => {
      const rawValue = min + (max - min) * newProgress;
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.min(Math.max(steppedValue, min), max);
      onValueChange?.(clampedValue);

      // Trigger haptic feedback on iOS
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
    },
    [min, max, step, onValueChange],
  );

  // Pan gesture handler
  const pan = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      isDragging.value = true;
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    })
    .onUpdate((event) => {
      const { translationX, translationY } = event;
      const layoutMeasure = orientation === "horizontal" ? 200 : 100; // We'll measure this dynamically in a real implementation
      const delta = orientation === "horizontal" ? translationX : -translationY;
      const newProgress = Math.min(
        Math.max(progress.value + delta / layoutMeasure, 0),
        1,
      );
      progress.value = newProgress;
      runOnJS(handleValueChange)(newProgress);
    })
    .onEnd(() => {
      isDragging.value = false;
    });

  // Tap gesture handler
  const tap = Gesture.Tap()
    .enabled(!disabled)
    .onStart((event) => {
      const { x, y } = event;
      const layoutMeasure = orientation === "horizontal" ? 200 : 100;
      const coordinate = orientation === "horizontal" ? x : layoutMeasure - y;
      const newProgress = Math.min(Math.max(coordinate / layoutMeasure, 0), 1);
      progress.value = animated ? withSpring(newProgress) : newProgress;
      runOnJS(handleValueChange)(newProgress);
      if (Platform.OS === "ios") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    });

  // Animated styles
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translation =
      orientation === "horizontal"
        ? { translateX: progress.value * 200 }
        : { translateY: -progress.value * 100 };
    return {
      transform: [
        translation,
        { scale: isDragging.value ? 1.2 : 1 },
      ],
    };
  });

  const activeTrackAnimatedStyle = useAnimatedStyle(() => ({
    width: orientation === "horizontal" ? `${progress.value * 100}%` : undefined,
    height: orientation === "vertical" ? `${progress.value * 100}%` : undefined,
  }));

  // Accessibility
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(
      `Slider value ${controlledValue ?? defaultValue} of ${max}`,
    );
  }, [controlledValue, defaultValue, max]);

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={Gesture.Race(pan, tap)}>
        <View
          style={[
            styles.container,
            orientation === "vertical" && styles.containerVertical,
          ]}
          accessible
          accessibilityRole="adjustable"
          accessibilityLabel="Slider"
          accessibilityValue={{
            min,
            max,
            now: controlledValue ?? defaultValue,
          }}
        >
          {/* Track */}
          <View
            style={[
              styles.track,
              orientation === "vertical" && styles.trackVertical,
              disabled && styles.disabled,
              trackStyle,
            ]}
          >
            {/* Active Track */}
            <Animated.View
              style={[
                styles.activeTrack,
                orientation === "vertical" && styles.activeTrackVertical,
                activeTrackAnimatedStyle,
                activeTrackStyle,
              ]}
            />

            {/* Marks */}
            {showMarks &&
              markPositions.map((markPosition, index) => (
                <View
                  key={index}
                  style={[
                    styles.mark,
                    {
                      left: orientation === "horizontal" ? `${markPosition * 100}%` : undefined,
                      bottom: orientation === "vertical" ? `${markPosition * 100}%` : undefined,
                    },
                    markStyle,
                  ]}
                />
              ))}
          </View>

          {/* Thumb */}
          <Animated.View
            style={[
              styles.thumb,
              orientation === "vertical" && styles.thumbVertical,
              disabled && styles.disabled,
              thumbAnimatedStyle,
              thumbStyle,
            ]}
          />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: THUMB_SIZE,
    width: 200,
    justifyContent: "center",
  },
  containerVertical: {
    width: THUMB_SIZE,
    height: 100,
    alignItems: "center",
  },
  track: {
    height: TRACK_HEIGHT,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: TRACK_HEIGHT / 2,
    overflow: "hidden",
  },
  trackVertical: {
    width: TRACK_HEIGHT,
    height: "100%",
  },
  activeTrack: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: TRACK_HEIGHT / 2,
  },
  activeTrackVertical: {
    width: "100%",
  },
  thumb: {
    position: "absolute",
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    left: -THUMB_SIZE / 2,
  },
  thumbVertical: {
    left: (THUMB_SIZE - TRACK_HEIGHT) / 2,
  },
  mark: {
    position: "absolute",
    width: MARK_SIZE,
    height: MARK_SIZE,
    borderRadius: MARK_SIZE / 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    transform: [{ translateX: -MARK_SIZE / 2 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
