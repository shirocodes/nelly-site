import React from "react";
import { formatTime } from "../../utilities/DateHelpers";

const SlotSelector = ({ slots, isSlotBooked, selectedSlot, setSelectedSlot, date }) => (
  <div className="mt-3">
    <h5>
      Available times on <strong>{date}</strong>
    </h5>
    {slots.length === 0 ? (
      <div className="alert alert-warning mt-2">No working hours configured for this day.</div>
    ) : (
      <div className="d-flex flex-wrap gap-2 mt-2">
        {slots.map((s, idx) => {
          const taken = isSlotBooked(s);
          const selected = selectedSlot?.start.getTime() === s.start.getTime();

          return (
            <button
              key={idx}
              type="button"
              disabled={taken}
              className={`btn ${
                selected ? "btn-primary" : taken ? "btn-outline-secondary" : "btn-outline-primary"
              }`}
              onClick={() => setSelectedSlot(s)}
            >
              {formatTime(s.start)} – {formatTime(s.end)}
            </button>
          );
        })}
      </div>
    )}
  </div>
);

export default SlotSelector;
