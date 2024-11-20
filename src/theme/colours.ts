const palette = {
  background: "hsl(0 0% 100%)",
  foreground: "hsl(222.2 84% 4.9%)",

  primary: "#F97216",
  primaryForeground: "#E7FDF3",

  secondary: "hsl(220 14.3% 95.9%)",
  secondaryForeground: "hsl(220.9 39.3% 11%)",

  accent: "hsla(285 33% 47% / 0.05)",

  muted: "hsl(220 14.3% 95.9%)",
  mutedForeground: "hsl(220 8.9% 46.1%)",

  destructive: "hsl(0 79% 63%)",
  destructiveForeground: "hsl(0 79% 63%)",

  info: "hsl(213 77% 60%)",

  success: "hsl(142 71% 93%)",
  successForeground: "hsl(155 100% 40%)",

  border: "rgba(99, 99, 99, 0.5)",
  input: "hsl(220 13% 91%)",
  ring: "hsl(224 71.4% 4.1%)",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const;

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",

  background: palette.background,
  foreground: palette.foreground,

  primary: palette.primary,
  primaryForeground: palette.primaryForeground,

  secondary: palette.secondary,
  secondaryForeground: palette.secondaryForeground,

  accent: palette.accent,
  accentForeground: palette.primary,

  muted: palette.muted,
  mutedForeground: palette.mutedForeground,

  destructive: palette.destructive,
  destructiveForeground: palette.destructiveForeground,

  success: palette.success,
  successForeground: palette.successForeground,

  info: palette.info,
  infoForeground: palette.primaryForeground,
  border: palette.border,
};
