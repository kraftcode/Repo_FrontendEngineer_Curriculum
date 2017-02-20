import Entry from './Entry.jsx';

const EntryList = (currentList) => (
  <ul>
    {currentList.currentList.map(function(element){
      console.log(element);
      return <li> <Entry props={element} /> </li>;
    })}
  </ul>
);

export default EntryList;
