import React from "react";
import { observer } from "mobx-react";
import EntryComponent from "./EntryComponent.jsx";

const EntryListComponent = observer(props => (
  <ul className="list">
    {props.list.map(function(element) {
      return (
        <li key={element.id} className="list">
          <EntryComponent
            element={element}
          />
        </li>
      );
    })}
  </ul>
));

export default EntryListComponent;
