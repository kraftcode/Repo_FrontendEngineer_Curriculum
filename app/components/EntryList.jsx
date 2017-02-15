const EntryList = (props) => (
  <ul>
    {props.list.map(function(listValue){
      return <li>{listValue}</li>;
    })}
  </ul>
);

export default EntryList;
