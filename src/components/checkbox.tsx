import React, { createContext, ElementRef, forwardRef, useContext } from "react";
import {
  AccessibilityProps,
  Pressable,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import { useControllableState } from "@/hooks/useControllableState";

// Types
interface CheckboxContextValue {
  checked: boolean;
  disabled?: boolean;
}

interface CheckboxProps extends Omit<ViewProps, "style">, AccessibilityProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  style?: StyleProp<ViewStyle> | ((state: { checked: boolean; disabled?: boolean }) => StyleProp<ViewStyle>);
  children?: React.ReactNode;
}

// Context
const CheckboxContext = createContext<CheckboxContextValue | undefined>(undefined);

const useCheckboxContext = (componentName: string) => {
  const context = useContext(CheckboxContext);
  if (!context) {
    throw new Error(
      `<${componentName}> must be used within a <Checkbox> component`,
    );
  }
  return context;
};

// Root Component
const Checkbox = forwardRef<ElementRef<typeof Pressable>, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      required,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useControllableState({
      prop: controlledChecked,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });

    const handlePress = () => {
      if (disabled) return;
      setChecked(!checked);
    };

    const state = { checked, disabled };

    return (
      <CheckboxContext.Provider value={state}>
        <Pressable
          ref={ref}
          onPress={handlePress}
          disabled={disabled}
          accessibilityRole="checkbox"
          accessibilityState={{
            checked,
            disabled,
          }}
          style={typeof style === "function" ? () => style(state) : style}
          {...props}
        >
          {children}
        </Pressable>
      </CheckboxContext.Provider>
    );
  },
);

// Indicator Component
interface CheckboxIndicatorProps extends Omit<ViewProps, "style"> {
  forceMount?: boolean;
  style?: StyleProp<ViewStyle> | ((state: { checked: boolean; disabled?: boolean }) => StyleProp<ViewStyle>);
}

const CheckboxIndicator = forwardRef<View, CheckboxIndicatorProps>(
  ({ style, forceMount, children, ...props }, ref) => {
    const context = useCheckboxContext("CheckboxIndicator");

    if (!context.checked && !forceMount) {
      return null;
    }

    return (
      <View
        ref={ref}
        style={typeof style === "function" ? style(context) : style}
        {...props}
      >
        {children}
      </View>
    );
  },
);

// Compose the final component
const Root = Checkbox;
const Indicator = CheckboxIndicator;

Checkbox.displayName = "Checkbox";
CheckboxIndicator.displayName = "Checkbox.Indicator";

export { Checkbox, CheckboxIndicator, Root, Indicator };
