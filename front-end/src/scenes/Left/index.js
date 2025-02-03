import { useState } from "react";
import MainView from "./MainView"; // Main content view
import FleetView from "./FleetView"; // Fleet-specific view
import CreateFleetView from "./CreateFleetView";
import ContactsView from "./ContactsView";
import { useCompany } from "../../contexts/CompanyContext";
import CreateContactsView from "./CreateContactsView";
import FleetInfo from "./FleetInfo";
import ContactsInfo from "./ContactsInfo";

const InfoScreen = () => {
  const {currentView, setCurrentView} = useCompany();
  const [selectedContact, setSelectedContact] = useState(null);

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
        onNavigateToContactsInfo= {(contact) => { 
          setCurrentView("contact-info");
          setSelectedContact(contact); // test
        }}
      />
    )}
    {currentView === "create-contact" && (
      <CreateContactsView onBack = {() => setCurrentView("main")}/>
    )}
    {currentView === "fleet-info" && (
      <FleetInfo onBack = {() => setCurrentView("fleet")}/>
    )}
    {currentView === "contact-info" && (
      <ContactsInfo 
        contact={selectedContact}
        onBack = {() => setCurrentView("contact")}/>
    )}
    </>
  );
};

export default InfoScreen;
