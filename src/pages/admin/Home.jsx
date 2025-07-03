import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./TopBar";
import Sidebar from "./SideBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";

function HomePageAdmin() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-4">
            <Topbar />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default HomePageAdmin;
