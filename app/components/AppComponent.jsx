import React from "react";
import { observer } from "mobx-react";
import EntryListComponent from "./EntryListComponent.jsx";
import Button from "./ButtonComponent.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import TextHeaderComponent from "./TextHeaderComponent.jsx";

const AppComponent = observer(props => {
  const renderComponent = () => {
    if(props.store.isLoading) {
      return <LoadingScreen />;
    } else {
      return(
        <div className="container">
          <TextHeaderComponent company={"Evil Corp."} />
          <div className="buttonfield" />
          <Button active={props.store.active} activeClickHandler={props.store.addNewEntry} inactiveClickHandler={props.store.setEndForEntry} />
          <div className={props.store.active ? "entry__active__topbox" : "entry__inactive__topbox"} />
          <EntryListComponent list={props.store.currentList.reverse()} />
        </div>
      );
    }
  };
  return renderComponent();
});

export default AppComponent;
