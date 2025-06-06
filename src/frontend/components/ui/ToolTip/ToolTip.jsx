import { useState, useEffect, useRef } from "react";

import "./ToolTip.css";

export default function ToolTip({ content, parentRef }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (parentRef.current !== null) {
      parentRef.current.addEventListener("mouseenter", () =>
        setIsVisible(true)
      );
      parentRef.current.addEventListener("mouseleave", () =>
        setIsVisible(false)
      );
    }

    return () => {
      if (parentRef.current !== null) {
        parentRef.current.removeEventListener("mouseenter", () => ref(true));
        parentRef.current.removeEventListener("mouseleave", () =>
          setIsVisible(false)
        );
      }
    };
  }, [parentRef]);

  useEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.classList.toggle(
        "navigation__tooltip--hidden",
        !isVisible
      );
    }
  }, [isVisible]);

  return (
    <p
      className={`navigation__tooltip${isVisible ? "" : "--hidden"}`}
      ref={tooltipRef}
    >
      {content}
    </p>
  );
}
