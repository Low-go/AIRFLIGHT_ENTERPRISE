import { useState } from "react";
import MainView from "./MainView"; // Main content view
import FleetView from "./FleetView"; // Fleet-specific view
import FleetForm from "./FleetForm";
import ContactsView from "./ContactsView";
import { useCompany } from "../../contexts/CompanyContext";
import ContactsForm from "./ContactsForm";
import FleetInfo from "./FleetInfo";
import ContactsInfo from "./ContactsInfo";
import PartView from "./PartView";
import PartForm from "./PartForm";
import PartInfo from "./PartInfo";

const InfoScreen = () => {
  const {currentView, setCurrentView} = useCompany();
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedFleet, setSelectedFleet] = useState(null);
  const [selectedPart, setSelectedPart ] = useState(null);

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
        onNavigateToFleetInfo={(fleet) => {
          setCurrentView("fleet-info");
          setSelectedFleet(fleet);
        }}
      />
    )}
    {currentView === "create-fleet" && (
      <FleetForm 
        mode = "create" onBack={() => setCurrentView("fleet")} />
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
      <ContactsForm mode = "create" onBack = {() => setCurrentView("main")}/>
    )}
    {currentView === "fleet-info" && (
      <FleetInfo 
        fleet = {selectedFleet}
        onBack = {() => setCurrentView("fleet")}
        onNavigateToEdit={(fleet) => {
          setCurrentView("edit-fleet")
        }}
        onNavigateToPartView={() => setCurrentView("part")}
        />
    )}
    {currentView === "contact-info" && (
      <ContactsInfo 
        contact={selectedContact}
        onBack = {() => setCurrentView("contact")}
        onNavigateToEdit={(contact) =>{
          setCurrentView("edit-contact")
        }}
        />
    )}
    {currentView === "edit-fleet" && (
      <FleetForm 
        mode="edit"
        fleetData={selectedFleet}
        onBack={() => setCurrentView("fleet-info")}
      />
      )}
      {currentView === "edit-contact" && (
        <ContactsForm 
          mode="edit"
          contactData = {selectedContact}
          onBack={() => setCurrentView("contact-info")}
        />
      )}
      {currentView === 'part' && (
        <PartView
          onBack = {() => setCurrentView("fleet-info")}
          onCreateNew={() => setCurrentView("create-part")}
          fleetId={selectedFleet.id}
          onNavigateToPartInfo={(part) => {
            setSelectedPart(part);
            setCurrentView("part-info");
          }}
        />
      )}
      {currentView === 'create-part' && (
        <PartForm
          mode="create"
          onBack={() => setCurrentView("part")}
          fleetId={selectedFleet.id}
          
        />
      )}
      {currentView === 'part-info' && (
        <PartInfo
          part={selectedPart}
          fleet={selectedFleet}
          onBack={() => setCurrentView("part")}
          
        />
      )}
    </>
  );
};

export default InfoScreen;
