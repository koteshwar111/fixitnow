import AdminLayout from "../layouts/AdminLayout";

const Coupons = () => {
  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Coupons</h1>
          <p className="page-subtitle">Manage discount coupons</p>
        </div>
        <button className="btn btn-primary">+ Add Coupon</button>
      </div>

      <div
        className="card"
        style={{
          padding: "60px 40px",
          textAlign: "center",
          borderStyle: "dashed",
          borderWidth: "2px",
          borderColor: "var(--border)",
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎟️</div>
        <h3 style={{ fontSize: "18px", fontWeight: "800", color: "var(--charcoal)", marginBottom: "8px" }}>
          Coupons Coming Soon
        </h3>
        <p style={{ color: "var(--muted)", fontSize: "14px" }}>
          This section will let you create and manage discount coupon codes.
        </p>
      </div>
    </AdminLayout>
  );
};

export default Coupons;
