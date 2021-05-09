import { useColorMode, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: "black",
    dark: "white",
  };
  return (
    <IconButton
      aria-label="Toggle dark mode"
      variant="ghost"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      color={iconColor[colorMode]}
    />
  );
};

export default ThemeSwitch;
