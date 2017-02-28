const Button = ({ active = false, activeClickHandler, inactiveClickHandler }) => {
  const clickHandler = (event) => {
    if (active) {
      inactiveClickHandler();
    } else {
      activeClickHandler();
    }
  };

  return (
    <button
      className={(active) ? 'button__red__active' : 'button__blue__inactive'}
      on-click={clickHandler}
    >
      {(active) ? 'Clock Out Now' : 'Clock In Now'}
    </button>
  );
};

export default Button;
