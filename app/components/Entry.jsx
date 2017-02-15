const Entry = (props) => (
  <div className="entry">
    <div className="entry__top">
      <div className="entry__startDay">{props.startDay}</div>
      <div className="entry__startDate">{props.startDate}</div>
      <div className="entry__earnings">{props.earnings}</div>
    </div>
    <div className="entry__bottom">
      <div className="entry__startTime">{props.startTime}</div>
      <div className="entry__endTime">{props.endTime}</div>
      <div className="entry__duration">{Math.round(props.duration)}</div>
    </div>
  </div>
);

export default Entry;
