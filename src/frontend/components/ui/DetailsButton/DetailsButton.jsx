import { useContext, useRef } from "react";

import { ToolTip } from "../index.js";

import { DetailedViewContext } from "../../../../App.jsx";

import { ExpandIcon, CollapseIcon } from "../../../common/index.js";

import "./DetailsButton.css";

export default function DetailsButton() {
  const buttonRef = useRef(null);

  const { showDetails, setShowDetails } = useContext(DetailedViewContext);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="navigation__details" ref={buttonRef}>
      <button className="navigation__details-button" onClick={toggleDetails}>
        {!showDetails ? <ExpandIcon /> : <CollapseIcon />}
      </button>
      <ToolTip
        content={`${showDetails ? "simple " : "detailed "} view`}
        parentRef={buttonRef}
      />
    </div>
  );
}
