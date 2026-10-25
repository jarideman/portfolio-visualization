import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Dashboard</NavLink>
      <NavLink to="/trades">Trades</NavLink>
      <NavLink to="/account">Account info</NavLink>
    </nav>
  );
}