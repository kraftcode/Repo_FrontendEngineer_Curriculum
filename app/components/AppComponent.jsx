import EntryListComponent from './EntryListComponent.jsx';
import Button from './ButtonComponent.jsx';

const AppComponent = (props) => (
  <div>
    <div>
      {Button(props)}
    </div>
    <div>
      {EntryListComponent(props.getCurrentList().reverse())}
    </div>
  </div>
);

export default AppComponent;
