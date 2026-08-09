import { useState, useEffect } from "react";
import {
  createTasker,
  getTaskers,
  approveTasker,
  deleteTasker,
  updateTasker,
} from "../services/taskerService";
import { toast } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";
import {
getCategories
}
from "../services/categoryService";

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  service_category: "",
  experience: "",
};

const Taskers = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [taskers, setTaskers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories,setCategories] = useState([]);

  useEffect(() => {
    fetchTaskers();
    fetchCategories();
  }, []);

  const fetchTaskers = async () => {
    try {
      const response = await getTaskers();
      setTaskers(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategories=
async()=>{

try{

const response=
await getCategories();

setCategories(
response.data || []
);

}

catch(error){

console.log(error);

}

};

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateTasker(editId, formData);
        toast.success("Tasker updated");
        setEditId(null);
      } else {
        await createTasker(formData);
        toast.success("Tasker added");
      }
      setFormData(emptyForm);
      fetchTaskers();
      setShowModal(false);
    } catch {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveTasker(id);
      toast.success("Tasker approved");
      fetchTaskers();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tasker?")) return;
    try {
      await deleteTasker(id);
      toast.success("Tasker deleted");
      fetchTaskers();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleEdit = (tasker) => {
    setFormData({
      full_name: tasker.full_name,
      email: tasker.email,
      phone: tasker.phone,
      service_category: tasker.service_category,
      experience: tasker.experience,
    });
    setEditId(tasker.id);
    setShowModal(true);
  };

  const filtered = taskers.filter(
    (t) =>
      t.full_name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search) ||
      t.service_category.toLowerCase().includes(search.toLowerCase())
  );

  const approved = taskers.filter((t) => t.approval_status === "approved").length;
  const pending = taskers.filter((t) => t.approval_status === "pending").length;

  return (
    <AdminLayout>
      {/* Page header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Taskers</h1>
          <p className="page-subtitle">{taskers.length} taskers registered</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => { setShowModal(true); setEditId(null); setFormData(emptyForm); }}
        >
          + Add Tasker
        </button>
      </div>

      {/* Stats strip */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total", value: taskers.length, bg: "#f3f4f6", color: "#374151", icon: "👷" },
          { label: "Approved", value: approved, bg: "#d1fae5", color: "#065f46", icon: "✅" },
          { label: "Pending", value: pending, bg: "#fef3c7", color: "#92400e", icon: "⏳" },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              backgroundColor: s.bg,
              borderRadius: "12px",
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <span style={{ fontSize: "22px" }}>{s.icon}</span>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: s.color, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "12px", color: s.color, fontWeight: "600", opacity: 0.75 }}>
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name, email, phone or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          style={{ flex: 1 }}
        />
      </div>

      {/* Table */}
      <div className="table-wrap" style={{ overflowX: "auto" }}>
        <table style={{ minWidth: "900px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tasker</th>
              <th>Contact</th>
              <th>Category</th>
              <th>Experience</th>
              <th>Availability</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "48px", color: "var(--muted)" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>👷</div>
                  No taskers found
                </td>
              </tr>
            ) : (
              filtered.map((tasker, idx) => (
                <tr key={tasker.id}>
                  <td style={{ color: "var(--subtle)", fontWeight: "600" }}>{idx + 1}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                          color: "#fb923c",
                          fontWeight: "800",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {tasker.full_name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "14px" }}>{tasker.full_name}</div>
                        <div style={{ fontSize: "12px", color: "var(--muted)" }}>{tasker.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--muted)", fontSize: "13px" }}>{tasker.phone}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#ede9fe",
                        color: "#5b21b6",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {tasker.service_category}
                    </span>
                  </td>
                  <td style={{ fontWeight: "600" }}>{tasker.experience} yrs</td>
                  <td>

<span

style={{

padding:"5px 12px",

borderRadius:"999px",

fontSize:"12px",

fontWeight:"700",

backgroundColor:

tasker.availability_status==="available"

?

"#d1fae5"

:

tasker.availability_status==="busy"

?

"#fee2e2"

:

"#f3f4f6",

color:

tasker.availability_status==="available"

?

"#065f46"

:

tasker.availability_status==="busy"

?

"#991b1b"

:

"#374151"

}}

>

{

tasker.availability_status

||

"available"

}

</span>

</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor:
                          tasker.approval_status === "approved" ? "#d1fae5" : "#fef3c7",
                        color:
                          tasker.approval_status === "approved" ? "#065f46" : "#92400e",
                      }}
                    >
                      {tasker.approval_status === "approved" ? "✅ Approved" : "⏳ Pending"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {tasker.approval_status === "pending" && (
                        <button
                          className="btn btn-success btn-xs"
                          onClick={() => handleApprove(tasker.id)}
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className="btn btn-outline btn-xs"
                        onClick={() => handleEdit(tasker)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-xs"
                        onClick={() => handleDelete(tasker.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-box"
            style={{ maxWidth: "560px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>{editId ? "Update Tasker" : "Add New Tasker"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name</label>
                  <input type="text" name="full_name" className="form-input"
                    placeholder="John Doe" value={formData.full_name} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-input"
                    placeholder="john@email.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone</label>
                  <input type="text" name="phone" className="form-input"
                    placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  
                  <div
className="form-group"
style={{ marginBottom: 0 }}
>

<label className="form-label">

Service Category

</label>

<select

name="service_category"

className="form-input"

value={formData.service_category}

onChange={handleChange}

required

>

<option value="">
Select Category
</option>

{

categories.map(

(category)=>(

<option

key={category.id}

value={category.name}

>

{category.name}

</option>

)

)

}

</select>

</div>
                </div>
                <div className="form-group" style={{ marginBottom: 0, gridColumn: "span 2" }}>
                  <label className="form-label">Experience (Years)</label>
                  <input type="number" name="experience" className="form-input"
                    placeholder="3" value={formData.experience} onChange={handleChange} min="0" required />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }}
                  onClick={() => { setShowModal(false); setEditId(null); }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
                  {loading ? "Saving..." : editId ? "Update Tasker" : "Add Tasker"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Taskers;
