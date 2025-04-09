import { createContext, useContext, useState, useCallback } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {

    const [selectedCompany, setSelectedCompany ] = useState(null);
    const [companyContacts, setCompanyContacts] = useState(null);
    const [companyFleets, setCompanyFleets] = useState(null);

    //loading stuff
    const [isLoadingContacts, setIsLoadingContacts] = useState(false);
    const [isLoadingFleets, setIsLoadingFleets] = useState(false);

    // the current view state of info screen is also saved and maintained
    const [currentView, setCurrentView] = useState("main");

    // Right screen nodes, saving their state so state persists
    const [flowNodes, setFlowNodes] = useState([]);
    const [flowEdges, setFlowEdges] = useState([]);

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
        setIsLoadingContacts(false);
        setIsLoadingFleets(false);

        //reset the nodes and edges to 0
        setFlowNodes([]);
        setFlowEdges([]);

        //set info screen back to main
        setCurrentView('main');
    };


    const fetchCompanyContacts = useCallback(async (companyId) => {
        try {
            setIsLoadingContacts(true);
            const response = await fetch(`http://127.0.0.1:8000/api/companies/${companyId}/contacts`);
            const data = await response.json();
            setCompanyContacts(data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setIsLoadingContacts(false);
        }
    }, []);

    const fetchCompanyFleets = useCallback(async (companyId) => {
        try {
            setIsLoadingFleets(true);
            const response = await fetch(`http://127.0.0.1:8000/api/companies/${companyId}/fleets`);
            const data = await response.json();
            setCompanyFleets(data);
        } catch (error) {
            console.error("Error fetching fleets:", error);
        } finally {
            setIsLoadingFleets(false);
        }
    }, []);

    return (
        <CompanyContext.Provider value={{
            selectedCompany,
            companyContacts,
            companyFleets,
            isLoadingContacts,
            isLoadingFleets,
            currentView,
            flowNodes,
            flowEdges,
            setFlowNodes,
            setFlowEdges,
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