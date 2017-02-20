const Entry = (element) => (
  <div className="entry">
    <div className="entry__top">
      <div className="entry__startDay">{element.props.startDay}</div>
      <div className="entry__startDate">{element.props.startDate}</div>
      <div className="entry__earnings">{element.props.earnings}</div>
    </div>
    <div className="entry__bottom">
      <div className="entry__startTime">{element.props.startTime}</div>
      <div className="entry__endTime">{element.props.endTime}</div>
      <div className="entry__duration">{element.props.duration}</div>
    </div>
  </div>
);

export default Entry;
