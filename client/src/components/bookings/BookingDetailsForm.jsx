import React from "react";
import { formatTime } from "../../utilities/DateHelpers";

const AppointmentReasons = ["Assessment", "Therapy Session", "Follow-up", "Consultation"];

const BookingDetailsForm = ({ therapistId, date, selectedSlot, childAge, setChildAge, reason, setReason, notes, setNotes, postError, posting, handleBooking }) => {
  if (!selectedSlot) return <p className="text-muted">Pick a time slot to continue.</p>;

  return (
    <div className="alert alert-success mt-3">
      <div>
        <strong>Therapist:</strong> {therapistId}<br />
        <strong>Date:</strong> {date}<br />
        <strong>Time:</strong> {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
      </div>

      <div className="mt-3">
        <div className="mb-2">
          <label>Child Age</label>
          <input type="number" className="form-control" value={childAge} onChange={(e) => setChildAge(e.target.value)} />
        </div>

        <div className="mb-2">
          <label>Reason</label>
          <select className="form-select" value={reason} onChange={(e) => setReason(e.target.value)} required>
            <option value="">Select reason</option>
            {AppointmentReasons.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="mb-2">
          <label>Notes (optional)</label>
          <textarea className="form-control" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
      </div>

      {postError && <div className="alert alert-danger mt-2">{postError}</div>}
       {/* --- Dual-action buttons --- */}
          <div className="d-flex flex-column flex-md-row gap-2 justify-content-end mt-3">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => window.location.href = "/#services"}
            >
              ← Back to Services
            </button>

            <button
              className="btn btn-success"
              onClick={handleBooking}
              disabled={posting}
            >
              {posting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
    </div>
  );
};

export default BookingDetailsForm;
