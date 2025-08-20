import React from "react";
import { formatTime } from "../../utilities/DateHelpers";

const SlotSelector = ({ slots, isSlotBooked, selectedSlot, setSelectedSlot, date }) => (
  <div className="mt-2">
    <h5 className="mb-2" style={{ color: "#004d40", fontWeight: "500" }}>
      Available times on <strong>{date}</strong>
    </h5>

    {slots.length === 0 ? (
      <div className="alert alert-warning mt-2 p-2">No working hours configured for this day.</div>
    ) : (
      <div
        className="card p-2 mb-3"
        style={{
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(202, 181, 202, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "12px",
        }}
      >
        <div
          className="d-flex gap-2 overflow-auto"
          style={{ padding: "0.15rem" }}
        >
          {slots.map((s, idx) => {
            const taken = isSlotBooked(s);
            const selected = selectedSlot?.start.getTime() === s.start.getTime();

            return (
              <button
                key={idx}
                type="button"
                disabled={taken}
                className={`btn btn-sm ${
                  selected
                    ? "btn-primary"
                    : taken
                    ? "btn-outline-secondary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setSelectedSlot(s)}
                title={`${formatTime(s.start)} – ${formatTime(s.end)}`}
                style={{
                  minWidth: "60px",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.85rem",
                  borderRadius: "8px",
                  flex: "0 0 auto", // prevents shrinking in horizontal scroll
                }}
              >
                {formatTime(s.start)}
              </button>
            );
          })}
        </div>
      </div>
    )}
  </div>
);

export default SlotSelector;
