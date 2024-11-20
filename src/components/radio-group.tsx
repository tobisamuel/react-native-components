import React, {
  createContext,
  ElementRef,
  forwardRef,
  useContext,
} from "react";
import {
  AccessibilityProps,
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";

import { useControllableState } from "@/hooks/useControllableState";

// Types
interface RadioGroupContextValue {
  value?: string;
  disabled: boolean;
  required: boolean;
  onValueChange: (value: string) => void;
}

interface RadioGroupProps extends ViewProps, AccessibilityProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

// Context
const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined,
);

const useRadioGroupContext = (componentName: string) => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error(
      `<${componentName}> must be used within a <RadioGroup> component`,
    );
  }
  return context;
};
// Context for RadioGroupItem
interface RadioGroupItemContextValue {
  isSelected: boolean;
  isDisabled: boolean;
}

const RadioGroupItemContext = createContext<
  RadioGroupItemContextValue | undefined
>(undefined);

const useRadioGroupItemContext = (componentName: string) => {
  const context = useContext(RadioGroupItemContext);
  if (!context) {
    throw new Error(
      `<${componentName}> must be used within a <RadioGroupItem> component`,
    );
  }
  return context;
};

// Root Component
const RadioGroup = forwardRef<View, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onValueChange,
      disabled = false,
      required = false,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      prop: controlledValue,
      defaultProp: defaultValue,
      onChange: onValueChange,
    });

    return (
      <RadioGroupContext.Provider
        value={{
          value,
          disabled,
          required,
          onValueChange: setValue,
        }}
      >
        <View
          ref={ref}
          accessibilityRole="radiogroup"
          style={style}
          {...props}
        >
          {children}
        </View>
      </RadioGroupContext.Provider>
    );
  },
);

// Custom state type for our radio group item
type RadioGroupItemState = {
  isSelected: boolean;
  isDisabled: boolean;
};

// Utility type to merge Pressable's style prop with our custom state
type MergedStyle<T> =
  | StyleProp<T>
  | ((state: RadioGroupItemState) => StyleProp<T>);

// Item Component
interface RadioGroupItemProps
  extends Omit<PressableProps, "children" | "style"> {
  value: string;
  disabled?: boolean;
  children?:
    | ((state: RadioGroupItemState) => React.ReactNode)
    | React.ReactNode;
  style?: MergedStyle<ViewStyle>;
}

const RadioGroupItem = forwardRef<
  ElementRef<typeof Pressable>,
  RadioGroupItemProps
>(({ value, disabled: itemDisabled, style, children, ...props }, ref) => {
  const {
    value: groupValue,
    disabled: groupDisabled,
    onValueChange,
  } = useRadioGroupContext("RadioGroupItem");

  const isDisabled = groupDisabled || !!itemDisabled || false;
  const isSelected = groupValue === value;

  const state: RadioGroupItemState = {
    isSelected,
    isDisabled,
  };

  return (
    <Pressable
      ref={ref}
      style={typeof style === "function" ? () => style(state) : style}
      accessibilityRole="radio"
      accessibilityState={{
        disabled: isDisabled,
        checked: isSelected,
      }}
      onPress={() => {
        if (!isDisabled && !isSelected) {
          onValueChange(value);
        }
      }}
      {...props}
    >
      <RadioGroupItemContext.Provider value={state}>
        {typeof children === "function" ? children(state) : children}
      </RadioGroupItemContext.Provider>
    </Pressable>
  );
});

// Indicator Component
interface RadioGroupIndicatorProps extends ViewProps {
  forceMount?: boolean;
}

const RadioGroupIndicator = forwardRef<View, RadioGroupIndicatorProps>(
  ({ style, forceMount, ...props }, ref) => {
    const { isSelected } = useRadioGroupItemContext("RadioGroupIndicator");

    if (!isSelected && !forceMount) {
      return null;
    }

    return <View ref={ref} style={style} {...props} />;
  },
);

// Compose the final component
const Root = RadioGroup;
const Item = RadioGroupItem;
const Indicator = RadioGroupIndicator;

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroup.Item";
RadioGroupIndicator.displayName = "RadioGroup.Indicator";

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
  //
  Root,
  Item,
  Indicator,
};

export type { RadioGroupProps, RadioGroupItemProps, RadioGroupIndicatorProps };
