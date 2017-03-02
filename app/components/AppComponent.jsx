import EntryListComponent from './EntryListComponent.jsx';
import Button from './ButtonComponent.jsx';

const AppComponent = (props) => {

  const renderComponent = () => {
    if (props.store.isLoading) {
      return <div>Lade</div>;
    } else {
      return (
        <div>
          <div>
            <Button
              active={props.store.active}
              activeClickHandler={props.store.addNewEntry}
              inactiveClickHandler={props.store.setEndForEntry}
            />
          </div>
          <div>
            <EntryListComponent list={props.store.getCurrentList().reverse()} />
          </div>
        </div>
      );
    }
  };

  return renderComponent();
};

export default AppComponent;
