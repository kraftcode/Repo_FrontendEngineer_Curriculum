import React from "react";
import { observer } from "mobx-react";
import accounting from "accounting";
import {
  formatDay,
  formatDate,
  formatTime,
  formatDuration
} from "../lib/DateFormatter.js";

const EntryComponent = observer(({ element }) => (
  <div className='entry'>
    <div className="entry__top">
      <div className="entry__startDay">{element.endDate ? formatDay(element.startDate) : element.message}</div>
      <div className={element.endDate ? "entry__startDate" : 'entry__active--nodisplay'}>{formatDate(element.startDate)}</div>
      <div className="entry__earnings">
        {accounting.formatMoney(element.earnings, "€", 2, ".", ",")}
      </div>
    </div>
    <div className="entry__bottom">
      <div className={element.endDate ? "entry__startTime" : 'entry__active--nodisplay'}>{formatTime(element.startDate)}</div>
      <progress className={element.endDate ? 'entry__active--nodisplay' : "progressbar"} max="1" value={element.duration/(8*60*60)} />
      <div className="entry__endTime">{element.endDate ? formatTime(element.endDate) : ""}</div>
      <div className="entry__duration">{formatDuration(element.duration)}</div>
    </div>
  </div>
));

export default EntryComponent;
