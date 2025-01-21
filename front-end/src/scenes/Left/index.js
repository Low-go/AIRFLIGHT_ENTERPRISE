import { useState } from "react";
import MainView from "./MainView"; // Main content view
import FleetView from "./FleetView"; // Fleet-specific view
import CreateFleetView from "./CreateFleetView";

const InfoScreen = () => {
  const [currentView, setCurrentView] = useState("main");

  return (
    <>
    {currentView === "main" && (
      <MainView onNavigateToFleet={() => setCurrentView("fleet")} />
    )}
    {currentView === "fleet" && (
      <FleetView 
        onBack={() => setCurrentView("main")}
        onCreateNew={() => setCurrentView("create-fleet")}
      />
    )}
    {currentView === "create-fleet" && (
      <CreateFleetView onBack={() => setCurrentView("fleet")} />
    )}
    </>
  );
};

export default InfoScreen;
