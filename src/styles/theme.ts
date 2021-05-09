import { theme as chakraTheme, ThemeConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  ...chakraTheme.fonts,
  body: `"Noto Sans JP", "Noto Sans", "Fira Code" "Hiragino Sans", "ヒラギノ角ゴシック", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3"`,
  heading: `"Noto Sans JP", "Noto Sans", "Fira Code" "Hiragino Sans", "ヒラギノ角ゴシック", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3"`,
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "62em",
  xl: "64em",
});

const colors = {};

const styles = {
  global: {
    body: {
      color: "#505050",
    },
  },
};

const config: ThemeConfig = {
  ...chakraTheme.config,
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  ...chakraTheme,
  config,
  fonts,
  colors,
  styles,
  breakpoints,
  fontWeights: {
    normal: 300,
    medium: 600,
    bold: 700,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "64px",
  },
};

const customTheme = extendTheme(overrides);

export default customTheme;
