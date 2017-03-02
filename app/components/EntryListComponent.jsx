import EntryComponent from './EntryComponent.jsx';

const EntryListComponent = (props) => (
  <ul>
    {props.list.map(function(element){
      return (
        <li>
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
);

export default EntryListComponent;
