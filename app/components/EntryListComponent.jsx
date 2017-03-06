import React from "react";
import { observer } from "mobx-react";
import EntryComponent from "./EntryComponent.jsx";

const EntryListComponent = observer(props => (
  <ul>
    {props.list.map(function(element) {
      return (
        <li key={element.id}>
          <EntryComponent
            startDate={element.startDate}
            endDate={element.endDate}
            earnings={element.earnings}
            duration={element.duration}
          />
        </li>
      );
    })}
  </ul>
));

export default EntryListComponent;
