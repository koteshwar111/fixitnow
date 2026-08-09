import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminLayout from "../layouts/AdminLayout";
import {
  createBooking,
  getBookings,
  updateBookingStatus,
} from "../services/bookingService";
import {
getCategories
}
from "../services/categoryService";
import {
getTaskers
}
from "../services/taskerService";

const STATUS_CONFIG = {
  pending:     { bg: "#fef3c7", color: "#92400e", label: "Pending" },
  assigned:    { bg: "#dbeafe", color: "#1e40af", label: "Assigned" },
  in_progress: { bg: "#ede9fe", color: "#5b21b6", label: "In Progress" },
  completed:   { bg: "#d1fae5", color: "#065f46", label: "Completed" },
  cancelled:   { bg: "#fee2e2", color: "#991b1b", label: "Cancelled" },
};

const emptyForm = {

customer_name:"",

service_name:"",

service_id:"",

tasker_id:"",

booking_date:"",

service_date:"",

service_time:"",

total_amount:""

};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [categories,setCategories]= useState([]);
  const [taskers,setTaskers]= useState([]);

  useEffect(() => {
    fetchBookings();
    fetchCategories();
    fetchTaskers();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data || []);
    } 
    
    
    catch (error) {
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
const fetchTaskers=
async()=>{

try{

const response=
await getTaskers();

setTaskers(
response.data || []
);

}

catch(error){

console.log(error);

}

};

  const handleChange=(e)=>{

const{
name,
value
}=e.target;

if(
name==="service_id"
){

const selected=

categories.find(

c=>

String(c.id)
===

String(value)

);

setFormData({

...formData,

service_id:value,

service_name:

selected?.name
||

"",
tasker_id:""

});

return;

}

setFormData({

...formData,

[name]:
value

});

};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking(formData);
      toast.success("Booking added");
      setFormData(emptyForm);
      fetchBookings();
      setShowModal(false);
    } catch {
      toast.error("Failed to add booking");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success("Status updated");
      fetchBookings();
    } catch {
      toast.error("Update failed");
    }
  };

  const filtered = bookings.filter((b) => {
    const matchSearch =
      (b.customer_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.service_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.booking_status || "").toLowerCase().includes(search.toLowerCase()) ||
      String(b.total_amount).includes(search) ||
      (b.booking_date || "").slice(0, 10).includes(search);
    const matchStatus =
      statusFilter === "all" || b.booking_status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Bookings</h1>
          <p className="page-subtitle">{bookings.length} total bookings</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Booking
        </button>
      </div>

      {/* Status filter pills */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        {["all", "pending", "assigned", "in_progress", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              fontSize: "13px",
              fontWeight: "600",
              border: "1.5px solid",
              cursor: "pointer",
              transition: "all 0.15s",
              backgroundColor:
                statusFilter === s
                  ? s === "all" ? "#1a1a2e" : STATUS_CONFIG[s]?.bg
                  : "var(--white)",
              color:
                statusFilter === s
                  ? s === "all" ? "#fb923c" : STATUS_CONFIG[s]?.color
                  : "var(--muted)",
              borderColor:
                statusFilter === s
                  ? s === "all" ? "#1a1a2e" : STATUS_CONFIG[s]?.bg
                  : "var(--border)",
            }}
          >
            {s === "all" ? "All" : STATUS_CONFIG[s]?.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="search-bar">
        <input
          placeholder="Search customer, service, status, amount or date..."
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
              <th>Customer</th>
              <th>Service</th>
              <th>Booking Date</th>
              <th>Service Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "48px", color: "var(--muted)" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>📋</div>
                  No bookings found
                </td>
              </tr>
            ) : (
              filtered.map((booking) => {
                const sc = STATUS_CONFIG[booking.booking_status] || { bg: "#f3f4f6", color: "#374151", label: booking.booking_status };
                return (
                  <tr key={booking.id}>
                    <td>
                      <div style={{ fontWeight: "600" }}>{booking.customer_name}</div>
                    </td>
                    <td style={{ color: "var(--muted)" }}>{booking.service_name}</td>
                    <td style={{ color: "var(--muted)", fontSize: "13px" }}>
                      {booking.booking_date?.slice(0, 10)}
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: "13px" }}>
                      {booking.service_date || "—"}
                    </td>
                    <td style={{ color: "var(--muted)", fontSize: "13px" }}>
                      {booking.service_time || "—"}
                    </td>
                    <td style={{ fontWeight: "700", color: "var(--amber-dark)" }}>
                      ₹{booking.total_amount}
                    </td>
                    <td>
                      <select
                        value={booking.booking_status}
                        onChange={(e) => handleStatus(booking.id, e.target.value)}
                        style={{
                          backgroundColor: sc.bg,
                          color: sc.color,
                          border: "none",
                          borderRadius: "999px",
                          padding: "5px 12px",
                          fontSize: "12px",
                          fontWeight: "700",
                          cursor: "pointer",
                          outline: "none",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="assigned">Assigned</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-box"
            style={{ maxWidth: "600px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Add New Booking</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Customer Name</label>
                  <input name="customer_name" className="form-input" placeholder="Customer"
                    value={formData.customer_name} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>

<label className="form-label">

Service Name

</label>

<select

name="service_id"

className="form-input"

value={formData.service_id}

onChange={handleChange}

required

>

<option value="">
Select Service
</option>

{

categories.map(

(item)=>(

<option
key={item.id}
value={item.id}
>

{item.name}

</option>

)

)

}

</select>
<div
className="form-group"
style={{marginBottom:0}}
>

<label
className="form-label"
>

Assign Tasker

</label>

<select

name="tasker_id"

className="form-input"

value={
formData.tasker_id || ""
}

onChange={
handleChange
}

>

<option value="">

Select Tasker

</option>

{

taskers

.filter(

(tasker)=>

String(
tasker.service_category
|| ""
)

.trim()

.toLowerCase()

===

String(
formData.service_name
|| ""
)

.trim()

.toLowerCase()

)

.map(

(tasker)=>(

<option

key={tasker.id}

value={tasker.id}

>

{tasker.full_name}

</option>

)

)

}
</select>

</div>

</div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Booking Date</label>
                  <input type="date" name="booking_date" className="form-input"
                    value={formData.booking_date} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Service Date</label>
                  <input type="date" name="service_date" className="form-input"
                    value={formData.service_date} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Service Time</label>
                  <input type="time" name="service_time" className="form-input"
                    value={formData.service_time} onChange={handleChange} required />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Total Amount (₹)</label>
                  <input type="number" name="total_amount" className="form-input"
                    placeholder="0" value={formData.total_amount} onChange={handleChange} min="1" required />
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }}
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Add Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Bookings;
