import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import { getPayments, getRevenue } from "../services/paymentService";

const PAY_STATUS = {
  paid:    { bg: "#d1fae5", color: "#065f46", label: "Paid" },
  pending: { bg: "#fef3c7", color: "#92400e", label: "Pending" },
  failed:  { bg: "#fee2e2", color: "#991b1b", label: "Failed" },
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPayments();
    fetchRevenue();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getPayments();
      setPayments(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await getRevenue();
      setRevenue(response.total_revenue || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = payments.filter(
    (p) =>
      (p.customer_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.payment_status || "").toLowerCase().includes(search.toLowerCase())
  );

  const paidCount = payments.filter((p) => p.payment_status === "paid").length;
  const pendingCount = payments.filter((p) => p.payment_status === "pending").length;
  const failedCount = payments.filter((p) => p.payment_status === "failed").length;

  const statCards = [
    { label: "Total Revenue", value: `₹${revenue}`, bg: "#d1fae5", color: "#065f46", icon: "💰" },
    { label: "Completed", value: paidCount, bg: "#dbeafe", color: "#1e40af", icon: "✅" },
    { label: "Pending", value: pendingCount, bg: "#fef3c7", color: "#92400e", icon: "⏳" },
    { label: "Failed", value: failedCount, bg: "#fee2e2", color: "#991b1b", icon: "❌" },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">{payments.length} payment records</p>
        </div>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {statCards.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: s.bg,
              borderRadius: "14px",
              padding: "20px 22px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span style={{ fontSize: "28px" }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: s.color, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "12px", color: s.color, fontWeight: "600", opacity: 0.7, marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          placeholder="Search by customer name or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ flex: 1 }}
        />
      </div>

      {/* Table */}
      <div className="table-wrap" style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "48px", color: "var(--muted)" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>💳</div>
                  No payment records found
                </td>
              </tr>
            ) : (
              filtered.map((payment) => {
                const sc = PAY_STATUS[payment.payment_status] || { bg: "#f3f4f6", color: "#374151", label: payment.payment_status };
                return (
                  <tr key={payment.id}>
                    <td>
                      <span
                        style={{
                          fontWeight: "700",
                          color: "var(--muted)",
                          fontFamily: "monospace",
                          fontSize: "13px",
                        }}
                      >
                        PAY-{String(payment.id).padStart(3, "0")}
                      </span>
                    </td>
                    <td style={{ fontWeight: "600" }}>{payment.customer_name}</td>
                    <td style={{ color: "var(--muted)" }}>{payment.service_name}</td>
                    <td style={{ fontWeight: "700", color: "var(--amber-dark)" }}>
                      ₹{payment.amount}
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: "13px" }}>
                      {payment.payment_method || "—"}
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{ backgroundColor: sc.bg, color: sc.color }}
                      >
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Payments;
