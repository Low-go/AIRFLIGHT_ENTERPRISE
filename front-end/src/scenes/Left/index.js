import { useState } from "react";
import MainView from "./MainView"; // Main content view
import FleetView from "./FleetView"; // Fleet-specific view

const InfoScreen = () => {
  const [currentView, setCurrentView] = useState("main");

  return (
    <>
      {currentView === "main" && (
        <MainView onNavigateToFleet={() => setCurrentView("fleet")} />
      )}
      {currentView === "fleet" && <FleetView onBack={() => setCurrentView("main")} />}
    </>
  );
};

export default InfoScreen;
