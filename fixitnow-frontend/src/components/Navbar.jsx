import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/categories": "Categories",
  "/taskers": "Taskers",
  "/bookings": "Bookings",
  "/payments": "Payments",
  "/coupons": "Coupons",
  "/banners": "Banners",
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <div className="admin-navbar">
      <div>
        <div className="admin-navbar-title">{title}</div>
        <div style={{ fontSize: "12px", color: "var(--muted)", marginTop: "1px" }}>
          FixItNow Admin Panel
        </div>
      </div>

      <div className="admin-navbar-right">
        {/* Admin badge */}
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: "var(--amber)",
            backgroundColor: "var(--amber-light)",
            padding: "4px 12px",
            borderRadius: "999px",
            border: "1px solid var(--amber-border)",
          }}
        >
          ● Admin
        </div>

        {/* Avatar dropdown */}
        <div style={{ position: "relative" }}>
          <div
            className="admin-avatar"
            onClick={() => setOpen(!open)}
            title="Account"
          >
            A
          </div>

          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                boxShadow: "var(--shadow-hover)",
                width: "160px",
                overflow: "hidden",
                zIndex: 300,
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "13px",
                  color: "var(--muted)",
                }}
              >
                Signed in as<br />
                <strong style={{ color: "var(--charcoal)" }}>Admin</strong>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "#dc2626",
                  fontWeight: "600",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#fee2e2")}
                onMouseLeave={(e) => (e.target.style.background = "none")}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
