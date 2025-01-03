import React, { createContext, useState, useMemo } from 'react';

// Create the context
export const SidebarContext = createContext({
    isCollapsed: false,
    setIsCollapsed: () => {},
});

// Create a provider component
export const SidebarProvider = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Memoize the context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
            isCollapsed,
            setIsCollapsed,
        }),
        [isCollapsed]
    );

    return (
        <SidebarContext.Provider value={value}>
            {children}
        </SidebarContext.Provider>
    );
};

// Custom hook 
export const useSidebar = () => {
    const context = React.useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};