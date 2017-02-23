import EntryComponent from './EntryComponent.jsx';

const EntryListComponent = (props) => (
  <ul>
    {props.map(function(element){
      return <li> <EntryComponent props={element} /> </li>;
    })}
  </ul>
);

export default EntryListComponent;
