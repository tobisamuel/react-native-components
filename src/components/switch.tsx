import React, { createContext, forwardRef, useContext } from "react";
import {
  Pressable,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useControllableState } from "@/hooks/useControllableState";

// Types
type SwitchStyleFunction = (props: { checked: boolean; disabled: boolean }) => StyleProp<ViewStyle>;
type SwitchStyle = StyleProp<ViewStyle> | SwitchStyleFunction;

interface SwitchContextValue {
  checked: boolean;
  disabled: boolean;
  toggle: () => void;
}

// Context
const SwitchContext = createContext<SwitchContextValue | undefined>(undefined);

const useSwitchContext = (componentName: string): SwitchContextValue => {
  const context = useContext(SwitchContext);
  if (!context) {
    throw new Error(
      `${componentName} must be used within a Switch component`,
    );
  }
  return context;
};

// Root Switch Component
interface SwitchProps extends Omit<ViewProps, "style"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  style?: SwitchStyle;
  children?: React.ReactNode | ((props: { checked: boolean; disabled: boolean }) => React.ReactNode);
}

const Switch = forwardRef<View, SwitchProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [checked, setChecked] = useControllableState<boolean>({
      prop: controlledChecked,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });

    const toggle = () => {
      if (!disabled) {
        setChecked(!checked);
      }
    };

    const contextValue = {
      checked,
      disabled,
      toggle,
    };

    const resolvedStyle = typeof style === "function" 
      ? style({ checked, disabled }) 
      : style;

    const resolvedChildren = typeof children === "function"
      ? children({ checked, disabled })
      : children;

    return (
      <SwitchContext.Provider value={contextValue}>
        <Pressable 
          onPress={toggle} 
          disabled={disabled}
          accessibilityRole="switch"
          accessibilityState={{ checked, disabled }}
        >
          <View ref={ref} style={resolvedStyle} {...props}>
            {resolvedChildren}
          </View>
        </Pressable>
      </SwitchContext.Provider>
    );
  },
);

// Thumb Component
interface SwitchThumbProps extends Omit<ViewProps, "style"> {
  style?: SwitchStyle;
  children?: React.ReactNode | ((props: { checked: boolean; disabled: boolean }) => React.ReactNode);
}

const SwitchThumb = forwardRef<View, SwitchThumbProps>(
  ({ style, children, ...props }, ref) => {
    const { checked, disabled } = useSwitchContext("SwitchThumb");

    const resolvedStyle = typeof style === "function"
      ? style({ checked, disabled })
      : style;

    const resolvedChildren = typeof children === "function"
      ? children({ checked, disabled })
      : children;

    return (
      <View ref={ref} style={resolvedStyle} {...props}>
        {resolvedChildren}
      </View>
    );
  },
);

Switch.displayName = "Switch";
SwitchThumb.displayName = "SwitchThumb";

export { Switch, SwitchThumb };
