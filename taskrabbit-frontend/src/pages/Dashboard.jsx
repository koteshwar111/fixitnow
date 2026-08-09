import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getDashboardStats } from "../services/dashboardService";

const StatCard = ({ icon, label, value, iconBg, trend }) => (
  <div className="stat-card">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div
        className="stat-icon"
        style={{ backgroundColor: iconBg || "#fff7ed" }}
      >
        {icon}
      </div>
      {trend !== undefined && (
        <div
          style={{
            fontSize: "12px",
            fontWeight: "600",
            color: trend >= 0 ? "#059669" : "#dc2626",
            backgroundColor: trend >= 0 ? "#d1fae5" : "#fee2e2",
            padding: "3px 10px",
            borderRadius: "999px",
          }}
        >
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div>
      <p style={{ fontSize: "13px", color: "var(--muted)", fontWeight: "500", marginBottom: "4px" }}>
        {label}
      </p>
      <h2 style={{ fontSize: "32px", fontWeight: "800", color: "var(--charcoal)", lineHeight: 1 }}>
        {value}
      </h2>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const d = stats.dashboard || {};

  const cards = [
    {
      icon: "🗂️",
      label: "Total Categories",
      value: loading ? "—" : d.total_categories ?? 0,
      iconBg: "#dbeafe",
    },
    {
      icon: "👷",
      label: "Total Taskers",
      value: loading ? "—" : d.total_taskers ?? 0,
      iconBg: "#d1fae5",
    },
    {
      icon: "📋",
      label: "Total Bookings",
      value: loading ? "—" : d.total_bookings ?? 0,
      iconBg: "#ede9fe",
    },
    {
      icon: "💰",
      label: "Total Revenue",
      value: loading ? "—" : `₹${d.revenue ?? 0}`,
      iconBg: "#fff7ed",
    },
  ];

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <AdminLayout>
      {/* Hero banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
          borderRadius: "16px",
          padding: "32px 36px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 80% 50%, rgba(251,146,60,0.12) 0%, transparent 60%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "#fb923c",
              fontWeight: "700",
              fontSize: "12px",
              letterSpacing: "0.1em",
              marginBottom: "8px",
              textTransform: "uppercase",
            }}
          >
            {greeting}
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "26px",
              fontWeight: "800",
              marginBottom: "6px",
            }}
          >
            Welcome back, Admin 👋
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>
            Here's what's happening with FixItNow today.
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "32px",
        }}
      >
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>

      {/* Quick links */}
      <div className="card" style={{ padding: "28px" }}>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "800",
            color: "var(--charcoal)",
            marginBottom: "20px",
          }}
        >
          Quick Actions
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {[
            { icon: "🗂️", label: "Manage Categories", to: "/categories", color: "#dbeafe", text: "#1e40af" },
            { icon: "👷", label: "View Taskers", to: "/taskers", color: "#d1fae5", text: "#065f46" },
            { icon: "📋", label: "All Bookings", to: "/bookings", color: "#ede9fe", text: "#5b21b6" },
            { icon: "💳", label: "Payments", to: "/payments", color: "#fff7ed", text: "#92400e" },
          ].map((item) => (
            <a
              key={item.to}
              href={item.to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 16px",
                borderRadius: "12px",
                backgroundColor: item.color,
                color: item.text,
                fontWeight: "600",
                fontSize: "14px",
                textDecoration: "none",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
