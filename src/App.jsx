import { QueryClientProvider } from "@tanstack/react-query";
import { useState, createContext } from "react";

import queryClient from "./frontend/common/utils/QueryClient.js";

import Navigation from "./frontend/components/layout/Navigation/Navigation.jsx";
import Dashboard from "./frontend/pages/Dashboard/Dashboard.jsx";

import "./App.css";

export const DetailedViewContext = createContext(null);

export default function App() {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <DetailedViewContext.Provider value={{ showDetails, setShowDetails }}>
        <Navigation />
        <Dashboard />
      </DetailedViewContext.Provider>
    </QueryClientProvider>
  );
}
