import {
  Platform,
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

import { colors } from "@/theme";

export interface TextProps extends RNTextProps {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export default function Text({ children, style, ...props }: TextProps) {
  const styles = [baseStyle, style];

  return (
    <RNText {...props} style={styles}>
      {children}
    </RNText>
  );
}

const baseStyle = {
  color: colors.foreground,
  letterSpacing: -0.2,
  fontFamily: Platform.select({
    android: "SourGummy-Regular",
    ios: "ISourGummy-Regular",
  }),
} satisfies TextStyle;

// export const sizes = {
//   xxs: { fontSize: 10, lineHeight: 14 } satisfies TextStyle,
//   xs: { fontSize: 12, lineHeight: 16.8 } satisfies TextStyle,
//   sm: { fontSize: 14, lineHeight: 19.6 } satisfies TextStyle,
//   base: { fontSize: 16, lineHeight: 22.4 } satisfies TextStyle,
//   lg: { fontSize: 18, lineHeight: 25.2 } satisfies TextStyle,
//   xl: { fontSize: 20, lineHeight: 28 } satisfies TextStyle,
//   "2xl": { fontSize: 24, lineHeight: 33.6 } satisfies TextStyle,
//   "3xl": { fontSize: 28, lineHeight: 39.2 } satisfies TextStyle,
//   "4xl": { fontSize: 32, lineHeight: 44.8 } satisfies TextStyle,
//   "5xl": { fontSize: 40, lineHeight: 56 } satisfies TextStyle,
//   "6xl": { fontSize: 52, lineHeight: 72.8 } satisfies TextStyle,
// };
