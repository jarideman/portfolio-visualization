import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trades from "./pages/Trades";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./shared/components/Sidebar";
import AccountInfo from "./pages/AccountInfo";
import { useState } from "react";

import "./App.css";

function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className="app-content"
        style={{
          marginLeft: collapsed ? "72px" : "240px",
          padding: "30px",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades" element={<Trades />} />
          <Route path="/account" element={<AccountInfo />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}