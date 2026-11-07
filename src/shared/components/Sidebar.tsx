import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  UserRound,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import "./Sidebar.css";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/trades", label: "Trades", icon: ArrowLeftRight },
    { to: "/account", label: "Account info", icon: UserRound },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Trading dashboard</h2>}

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              title={collapsed ? link.label : undefined}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">
                <Icon size={20} strokeWidth={1.8} />
              </span>

              <span className="sidebar-label">
                {link.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
