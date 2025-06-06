import { useState, useEffect, useRef, useCallback } from "react";

import { NightIcon, DayIcon } from "../../../common/index.js";

import { ToolTip } from "../index.js";

import "./ThemeButton.css";

export default function ThemeButton() {
  const [isDark, setIsDark] = useState(true);

  const buttonRef = useRef(null);

  const switchTheme = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.className = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <div className="navigation__theme" ref={buttonRef}>
      <button className="navigation__theme-button" onClick={switchTheme}>
        {isDark ? <DayIcon /> : <NightIcon />}
      </button>
      <ToolTip content="change theme" parentRef={buttonRef} />
    </div>
  );
}
