import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    section: "Overview",
    links: [
      { to: "/dashboard", label: "Dashboard", icon: "📊" },
    ],
  },
  {
    section: "Management",
    links: [
      { to: "/categories", label: "Categories", icon: "🗂️" },
      { to: "/taskers", label: "Taskers", icon: "👷" },
      { to: "/bookings", label: "Bookings", icon: "📋" },
    ],
  },
  {
    section: "Finance",
    links: [
      { to: "/payments", label: "Payments", icon: "💳" },
    ],
  },
  {
    section: "Marketing",
    links: [
      { to: "/coupons", label: "Coupons", icon: "🎟️" },
      { to: "/banners", label: "Banners", icon: "🖼️" },
    ],
  },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/dashboard" && location.pathname.startsWith(path));

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        🔧 FixItNow
        <span>ADMIN</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="sidebar-section-label">{section.section}</div>
            {section.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={isActive(link.to) ? "active" : ""}
              >
                <span className="nav-icon">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: "12px",
          color: "rgba(255,255,255,0.3)",
          flexShrink: 0,
        }}
      >
        FixItNow Admin v1.0
      </div>
    </div>
  );
};

export default Sidebar;
