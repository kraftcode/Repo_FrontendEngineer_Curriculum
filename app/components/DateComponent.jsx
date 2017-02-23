const DateDisplay = (props) => {
  return (
    <div style={props.dateStyle}>
      {props.dateString}
    </div>
  );
};

export default DateDisplay;
