import React from "react";
import { observer } from "mobx-react";

const Button = observer((
  { active = false, activeClickHandler, inactiveClickHandler }
) => {
  const clickHandler = event => {
    if (active) {
      inactiveClickHandler();
      console.log(active);
    } else {
      activeClickHandler();
      console.log(active);
    }
  };

  return (
    <button
      className={active ? "button__red__active" : "button__blue__inactive"}
      onClick={clickHandler}
    >
      {active ? "Clock Out Now" : "Clock In Now"}
    </button>
  );
});

export default Button;
