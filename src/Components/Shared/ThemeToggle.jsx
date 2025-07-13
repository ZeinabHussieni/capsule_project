import React from "react";
import { useTheme } from "../../ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <div className="icon-toggle" onClick={handleThemeToggle}>
      {theme === "light" ? (
        <img src="/sun.svg" alt="Light Mode" className="icon" />
      ) : (
        <img src="/moon.svg" alt="Dark Mode" className="icon" />
      )}
    </div>
  );
};

export default ThemeToggle;
