import React from "react";
import accounting from "accounting";
import {
  formatDay,
  formatDate,
  formatTime,
  formatDuration
} from "../lib/DateFormatter.js";

const EntryComponent = ({ startDate, endDate, earnings, duration }) => (
  <div className="entry">
    <div className="entry__top">
      <div className="entry__startDay">{formatDay(startDate)}</div>
      <div className="entry__startDate">{formatDate(startDate)}</div>
      <div className="entry__earnings">
        {accounting.formatMoney(earnings, "€", 2, ".", ",")}
      </div>
    </div>
    <div className="entry__bottom">
      <div className="entry__startTime">{formatTime(startDate)}</div>
      <div className="entry__endTime">{endDate ? formatTime(endDate) : ""}</div>
      <div className="entry__duration">{formatDuration(duration)}</div>
    </div>
  </div>
);

export default EntryComponent;
