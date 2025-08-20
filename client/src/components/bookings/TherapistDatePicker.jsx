import React from "react";
import { toYMD } from "../../utilities/DateHelpers"
import { Therapists } from "../../data/Therapists";

const TherapistDatePicker = ({ therapistId, setTherapistId, date, setDate}) => {
  return (
    <div className="row g-3 align-items-end">
      <div className="col-12 col-md-4">
        <label className="form-label">Select Therapist</label>
        <select
          className="form-select"
          value={therapistId}
          onChange={(e) => setTherapistId(Number(e.target.value))}
        >
          <option value="">Choose a therapist</option>
            {Therapists.map((t) => (
            <option className="text-muted" key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label">Pick a date</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={toYMD(new Date())}
        />
      </div>

      {/* <div className="col-6 col-md-2">
        <label className="form-label">Start hour</label>
        <input
          type="number"
          className="form-control"
          value={workStartHour}
          min={0}
          max={23}
          onChange={(e) => setWorkStartHour(Number(e.target.value))}
        />
      </div>
      <div className="col-6 col-md-2">
        <label className="form-label">End hour</label>
        <input
          type="number"
          className="form-control"
          value={workEndHour}
          min={1}
          max={24}
          onChange={(e) => setWorkEndHour(Number(e.target.value))}
        />
      </div> */}
    </div>
  );
};

export default TherapistDatePicker;
