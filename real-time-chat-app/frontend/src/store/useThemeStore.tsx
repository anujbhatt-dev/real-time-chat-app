import { create } from "zustand";
import Theme from "../types";

type ThemeI = {
    themeName: string;
};

type ThemeActions = {
    setThemeName: (thm: string) => void;
};

const getStoredTheme = (): string => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme-name");
    return storedTheme ? storedTheme : Theme.Acid; // Default to Acid if not found
  }
  return Theme.Acid;
};

export const useThemeStore = create<ThemeI & ThemeActions>((set) => ({
    themeName: getStoredTheme(),
    setThemeName: (str) => {
        set({ themeName: str });
        if (typeof window !== "undefined") {
            localStorage.setItem("theme-name", str); // Manually store the theme
        }
    }
}));
