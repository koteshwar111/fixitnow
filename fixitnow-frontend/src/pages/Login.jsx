import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAdmin } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginAdmin(formData);
      localStorage.setItem("adminToken", response.token);
      toast.success("Welcome back, Admin!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#fafaf8" }}>
      {/* Left panel — dark navy, same as customer */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 30% 60%, rgba(251,146,60,0.12) 0%, transparent 65%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>🔧</div>
          <h2
            style={{ fontSize: "32px", fontWeight: "800", marginBottom: "10px" }}
          >
            FixItNow
          </h2>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "rgba(251,146,60,0.15)",
              border: "1px solid rgba(251,146,60,0.3)",
              color: "#fb923c",
              padding: "4px 16px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "0.1em",
              marginBottom: "28px",
            }}
          >
            ADMIN PANEL
          </div>
          <p
            style={{
              opacity: 0.65,
              textAlign: "center",
              lineHeight: "1.7",
              maxWidth: "280px",
              margin: "0 auto",
            }}
          >
            Manage bookings, taskers, categories, payments and more from one
            central dashboard.
          </p>
          <div
            style={{
              marginTop: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: "100%",
              maxWidth: "280px",
            }}
          >
            {[
              "📊 Real-time Dashboard Stats",
              "👷 Tasker Approval & Management",
              "📋 Full Booking Control",
              "💳 Payment Overview",
            ].map((f) => (
              <div
                key={f}
                style={{
                  backgroundColor: "rgba(255,255,255,0.07)",
                  padding: "11px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  textAlign: "left",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ marginBottom: "36px" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#1c1917",
                marginBottom: "8px",
              }}
            >
              Admin Login 👋
            </h1>
            <p style={{ color: "#78716c", fontSize: "14px" }}>
              Sign in to access your admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="admin@fixitnow.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="form-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ paddingRight: "48px" }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", padding: "14px", marginTop: "8px", fontSize: "15px" }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In to Admin →"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "32px",
              fontSize: "12px",
              color: "#a8a29e",
            }}
          >
            Restricted access — authorised personnel only
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
