import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../../api";
import ToggleMode from "../../ToggleMode";
import "./DoctorDashboard.css";
import Footer from "../../common/Footer";

function DoctorDashboard() {
  const navigate = useNavigate();
  const [doctorName] = useState(localStorage.getItem("name") || "");
  const [appointments, setAppointments] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState({});
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const status = localStorage.getItem("status");
    if (!token || role !== "doctor" || status !== "approved") {
      navigate("/loginDoctor");
      return;
    }
    fetchAppointments();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get("/auth/doctor-dashboard/appointments");
      // Filter only pending appointments
      const pendingAppointments = response.data.appointments
        .filter((a) => a.status === "pending")
        .map((a) => ({ ...a, scheduledDate: "", scheduledTime: "" }));

      setAppointments(pendingAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSchedule = async (appointmentId, patientId, date, time) => {
    if (!date || !time) {
      alert("Please select both date and time!");
      return;
    }

    setScheduleLoading((prev) => ({ ...prev, [appointmentId]: true }));
    const token = localStorage.getItem("token");
    const scheduledDateTime = new Date(`${date}T${time}:00`).toISOString();

    try {
      const response = await API.post(
        "/auth/doctor-dashboard/scheduleAppointments",
        { doctorName, patientId, appointmentId, scheduledDateTime }
      );
      alert(response.data.message);
      fetchAppointments(); // Refresh after scheduling
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      alert("Failed to schedule appointment.");
    } finally {
      setScheduleLoading((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  const handleCancel = async (appointmentId) => {
    const reason = prompt("Please enter the reason for cancellation:");
    if (!reason) return;

    setCancelLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await API.post(
        "/auth/doctor-dashboard/cancelAppointment",
        { appointmentId, reason }
      );
      alert(response.data.message);
      fetchAppointments(); // Refresh after cancelling
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment.");
    } finally {
      setCancelLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginDoctor");
  };

  return (
    <div className="app-container">
      <div className="dashboard-container">
        <header className="main-header">
          <div className="header-content">
            <div className="logo-container">
              <h1 className="logo-text">HealthSetu</h1>
            </div>
            <div className="tagline-container">
              <span className="logo-tagline">Your Health, Our Priority</span>
            </div>
            <div className="nav-menu">
              <button
                onClick={() => navigate("/doctor-dashboard/doctor-Meetings")}
              >
                Meetings
              </button>
              <button
                onClick={() => navigate("/doctor-dashboard/doctor-profile")}
              >
                Profile
              </button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="theme-toggle-wrapper">
            <ToggleMode />
          </div>
        </header>

        <main className="dashboard-content" style={{marginTop: "10px"}}>
          <section className="welcome-section">
            <h1>Welcome to HealthSetu, Dr. {doctorName}!</h1>
            <p>Your dashboard to manage appointments and more</p>
          </section>

          <section className="appointments-section">
            <h2>Pending Appointments</h2>
            {appointments.length === 0 ? (
              <p>No pending appointments.</p>
            ) : (
              <div className="appointments-grid">
                {appointments.map((appointment, idx) => (
                  <div key={appointment._id} className="appointment-card">
                    <p>Appointment with {appointment.patient?.name}</p>
                    <p>Reason: {appointment.reason}</p>

                    <label>
                      Select Date:
                      <input
                        type="date"
                        value={appointment.scheduledDate}
                        onChange={(e) => {
                          const updated = [...appointments];
                          updated[idx].scheduledDate = e.target.value;
                          setAppointments(updated);
                        }}
                      />
                    </label>

                    <label>
                      Select Time:
                      <input
                        type="time"
                        value={appointment.scheduledTime}
                        onChange={(e) => {
                          const updated = [...appointments];
                          updated[idx].scheduledTime = e.target.value;
                          setAppointments(updated);
                        }}
                      />
                    </label>

                    <button
                      className="action-button"
                      onClick={() =>
                        handleSchedule(
                          appointment._id,
                          appointment.patient._id,
                          appointment.scheduledDate,
                          appointment.scheduledTime
                        )
                      }
                      disabled={scheduleLoading[appointment._id]}
                    >
                      {scheduleLoading[appointment._id]
                        ? "Scheduling..."
                        : "Schedule"}
                    </button>

                    <button
                      className="action-button cancel"
                      onClick={() => handleCancel(appointment._id)}
                      disabled={cancelLoading}
                    >
                      {cancelLoading ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DoctorDashboard;