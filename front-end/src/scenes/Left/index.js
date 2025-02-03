import { useState } from "react";
import MainView from "./MainView"; // Main content view
import FleetView from "./FleetView"; // Fleet-specific view
import CreateFleetView from "./CreateFleetView";
import ContactsView from "./ContactsView";
import { useCompany } from "../../contexts/CompanyContext";
import CreateContactsView from "./CreateContactsView";
import FleetInfo from "./FleetInfo";

const InfoScreen = () => {
  const {currentView, setCurrentView} = useCompany();

  return (
    <>
    {/* this is the first condition, if either button is pressed we change view within main */}
    {currentView === "main" && (
      <MainView 
        onNavigateToFleet={() => setCurrentView("fleet")} 
        onNavigateToContacts = {() => setCurrentView("contact")}
      />
    )}
    {currentView === "fleet" && (
      <FleetView 
        onBack={() => setCurrentView("main")}
        onCreateNew={() => setCurrentView("create-fleet")}
        onNavigateToFleetInfo={() => setCurrentView("fleet-info")}
      />
    )}
    {currentView === "create-fleet" && (
      <CreateFleetView 
        onBack={() => setCurrentView("fleet")} />
    )}
    {currentView === "contact" && (
      <ContactsView 
        onBack = {() => setCurrentView("main")}
        onCreateNew={() => setCurrentView("create-contact")}
      />
    )}
    {currentView === "create-contact" && (
      <CreateContactsView onBack = {() => setCurrentView("main")}/>
    )}
    {currentView === "fleet-info" && (
      <FleetInfo onBack = {() => setCurrentView("fleet")}/>
    )}
    </>
  );
};

export default InfoScreen;
