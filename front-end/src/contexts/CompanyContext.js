import { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {

    const [selectedCompany, setSelectedCompany ] = useState(null);
    const [companyContacts, setCompanyContacts] = useState(null);
    const [companyFleets, setCompanyFleets] = useState(null);

    // the current view state of info screen is also saved and maintained
    const [currentView, setCurrentView] = useState("main");

    const handleCompanySelect = (company) => {
        setSelectedCompany(company); // current comapany user has selected

        // this is temporary for testing purposes
        console.log("Selected Company Data:", {
            "Company Name": company.company_name,
            "Phone Number": company.phone_number,
            "Notes": company.notes
        });

        // Reset Children when new company selected
        setCompanyContacts(null);
        setCompanyFleets(null);

        //set info screen back to main
        setCurrentView('main');
    };

    //
    const fetchCompanyContacts = async (companyId) => {
        if (!companyContacts){
            const response = await fetch(`http://127.0.0.1:8000/api/companies/${companyId}/contacts`); // double check this
            const data = await response.json();
            setCompanyContacts(data);
        }
    }

    const fetchCompanyFleets = async (companyId) => {
        if (!companyFleets){
            const response = await fetch(`http://127.0.0.1:8000/api/companies/${companyId}/fleets`); // double check this
            const data = await response.json();
            setCompanyFleets(data);
        }
    }

    return (
        <CompanyContext.Provider value={{
            selectedCompany,
            companyContacts,
            companyFleets,
            currentView,
            setCurrentView,
            handleCompanySelect,
            fetchCompanyContacts,
            fetchCompanyFleets,
        }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};


//TODO replace urls in the future