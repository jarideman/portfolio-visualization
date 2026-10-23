import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trades from "./pages/Trades";
import Dashboard from "./pages/Dashboard";
import Navbar from "./shared/Navbar";
import AccountInfo from "./pages/AccountInfo";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/account" element={<AccountInfo />} />
      </Routes>
    </BrowserRouter>
  );
}
