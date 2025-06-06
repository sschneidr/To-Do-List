import { DetailsButton, ThemeButton } from "../../ui";

import "./Navigation.css";

export default function Navigation() {
  return (
    <div className="navigation">
      <ThemeButton />
      <DetailsButton />
    </div>
  );
}
