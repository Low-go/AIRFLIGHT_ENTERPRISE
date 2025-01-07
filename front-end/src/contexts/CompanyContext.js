import { createContext, useContext, useState } from 'react';


const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {

    const [selectedCompany, setSelectedCompany ] = useState(null);

    const handleCompanySelect = (company) => {
        setSelectedCompany(company); // current comapany user has selected

        // this is temporary for testing purposes
        console.log("Selected Company Data:", {
            "Company Name": company.company_name,
            "Phone Number": company.phone_number,
            "Notes": company.notes
        });
    };

    return (
        <CompanyContext.Provider value={{
            selectedCompany,
            handleCompanySelect
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
