import { useCallback, useState } from "react";

/**
 * Configuration for useControllableState
 * @template T The type of the state value
 */
interface UseControllableStateProps<T> {
  /**
   * The controlled value. If provided, component is in controlled mode
   */
  prop?: T;
  /**
   * The default value for uncontrolled mode
   */
  defaultProp: T;
  /**
   * Callback when value changes
   */
  onChange?: (value: T) => void;
}

/**
 * Setter function for controllable state
 */
type SetControllableState<T> = (value: T) => void;

/**
 * Return type for useControllableState hook
 */
type UseControllableStateReturn<T> = readonly [T, SetControllableState<T>];

/**
 * Hook for managing controlled and uncontrolled state
 * Optimized for React Native's performance requirements
 *
 * @example
 * ```tsx
 * const [checked, setChecked] = useControllableState({
 *   prop: controlledChecked,
 *   defaultProp: false,
 *   onChange: onCheckedChange,
 * });
 * ```
 */
export function useControllableState<T>(
  props: UseControllableStateProps<T>,
): UseControllableStateReturn<T> {
  const { prop, defaultProp, onChange } = props;

  // Initialize with defaultProp, will only be used in uncontrolled mode
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultProp);

  // Determine if we're in controlled mode
  const isControlled = prop !== undefined;

  // Use controlled value if available, otherwise use uncontrolled
  const value = isControlled ? prop : uncontrolledValue;

  // Memoize the setter to prevent unnecessary re-renders
  const setValue: SetControllableState<T> = useCallback(
    (nextValue) => {
      // In controlled mode, just call onChange
      if (isControlled) {
        onChange?.(nextValue);
        return;
      }

      // In uncontrolled mode, update internal state and call onChange
      setUncontrolledValue(nextValue);
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return [value, setValue] as const;
}
