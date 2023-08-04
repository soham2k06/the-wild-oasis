import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();
function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "isDarkMode"
  );

  useEffect(
    function () {
      if (isDarkMode) {
        toggleClass("dark-mode", "light-mode");
      } else {
        toggleClass("light-mode", "dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleClass(className, removeClassName) {
    const elementClassList = document.documentElement.classList;
    elementClassList.add(className);
    elementClassList.remove(removeClassName);
  }

  function handleToggle() {
    setIsDarkMode((show) => !show);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, handleToggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext is used outside DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
