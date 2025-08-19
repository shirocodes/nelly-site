import React, { useEffect, useMemo, useState, useContext } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { getBookedSlots, createAppointment } from "../apis/Appointments"
import {AuthContext} from '../context/AuthContext'
import { toYMD, generateSlots, normalizeBooked, overlaps } from "../utilities/DateHelpers"


import TherapistDatePicker from "../components/bookings/TherapistDatePicker"
import SlotSelector from "../components/bookings/SlotSelector"
import BookingDetailsForm from "../components/bookings/BookingDetailsForm"

const normalizeReason = (r) =>
  r.trim().replace(" ", "_").replace("-", "_").toUpperCase();

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const prefilledTherapistId = searchParams.get("therapistId");

  const [therapistId, setTherapistId] = useState(prefilledTherapistId || "");
  const [date, setDate] = useState(toYMD(new Date()));
  const [slotMins] = useState(30);
  const [workStartHour, setWorkStartHour] = useState(9);
  const [workEndHour, setWorkEndHour] = useState(17);

  const [booked, setBooked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [childAge, setChildAge] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");

  const bookedRanges = useMemo(() => normalizeBooked(booked), [booked]);
  const slots = useMemo(
    () => generateSlots(date, workStartHour, workEndHour, slotMins),
    [date, workStartHour, workEndHour, slotMins]
  );

  const isSlotBooked = (slot) =>
    bookedRanges.some((b) => overlaps(slot.start, slot.end, b.start, b.end));

  // Fetch booked slots
  useEffect(() => {
    const fetchBooked = async () => {
      setFetchError("");
      setSelectedSlot(null);

      if (!therapistId || !date) return;
      setLoading(true);

      try {
        const start_date = `${date}T00:00:00`;
        const end_date = `${date}T23:59:59`;
        const res = await getBookedSlots(therapistId, { start_date, end_date });
        setBooked(res.data.booked_slots || []);
      } catch (err) {
        setFetchError(err.response?.data?.msg || "Failed to load availability.");
        setBooked([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooked();
  }, [therapistId, date]);

  // --- POST booking ---
  const handleBooking = async () => {
    if (!selectedSlot || !therapistId || !reason) {
      setPostError("Please select a slot and reason.");
      return;
    }
    if (!user) {
      alert("You must be logged in to book.");
      return navigate("/login");
    }

    setPosting(true);
    setPostError("");

    try {
      await createAppointment({
        therapist_id: therapistId,
        start_time: selectedSlot.start.toISOString(),
        end_time: selectedSlot.end.toISOString(),
        child_age: childAge || null,
        reason: normalizeReason(reason),
        notes: notes || "",
      });

      // success → redirect
      navigate("/account/appointments", { replace: true });
    } catch (err) {
    
      if (err.response) {
      setPostError(err.response.data?.msg || "Booking failed. Server error.");
    } else if (err.request) {
      setPostError("No response from server. Check API base URL / CORS.");
    } else {
      setPostError("Error: " + err.message);
    }
    } finally {
          setPosting(false);
        }
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3">Book an Appointment</h2>

      <TherapistDatePicker
        therapistId={therapistId} setTherapistId={setTherapistId}
        date={date} setDate={setDate}
        workStartHour={workStartHour} setWorkStartHour={setWorkStartHour}
        workEndHour={workEndHour} setWorkEndHour={setWorkEndHour}
      />

      <div className="mt-3">
        {loading && <div className="alert alert-secondary">Loading booked slots…</div>}
        {fetchError && <div className="alert alert-danger">{fetchError}</div>}
      </div>

      {therapistId && !loading && (
        <SlotSelector
          slots={slots}
          isSlotBooked={isSlotBooked}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          date={date}
        />
      )}

      <BookingDetailsForm
        therapistId={therapistId}
        date={date}
        selectedSlot={selectedSlot}
        childAge={childAge} setChildAge={setChildAge}
        reason={reason} setReason={setReason}
        notes={notes} setNotes={setNotes}
        postError={postError}
        posting={posting}
        handleBooking={handleBooking}
      />
    </div>
  );
};

export default BookingPage;
