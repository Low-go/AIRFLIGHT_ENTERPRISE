import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { SidebarProvider } from "./contexts/SidebarContext";
import { CompanyProvider } from "./contexts/CompanyContext";
//import Geography from "./scenes/Geography";
// do their respective imports here

function App() {
  const [theme, colorMode] = useMode();
  return (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme = {theme}>
        <SidebarProvider>
          <CompanyProvider> {/** Test add, remove if need */}
            <CssBaseline/>
            <div className="app">
              <Sidebar/>
              <main className="content">
                <Topbar/>
                <Routes>
                  <Route path="/" element={<Dashboard/>} /> 
                  {/* <Route path="/mainInfo" element={<MainInfo/>} />
                  <Route path="/nodesPage" element={ <NodePage/>} />
                  <Route path="/geography" element={<Geography/>} />
                  <Route path="/faq" element={ <FAQ/>} /> */}
                </Routes>
              </main>
            </div>
          </CompanyProvider>
        </SidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;