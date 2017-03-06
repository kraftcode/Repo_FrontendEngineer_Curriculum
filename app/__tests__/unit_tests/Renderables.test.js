import mobx from "mobx";
import { render, shallow } from "enzyme";
import React from "react";
import Store from "../../Store";
import Storage from "../../Storage";
import AppComponent from "../../components/AppComponent.jsx";
import EntryListComponent from "../../components/EntryListComponent.jsx";
import Button from "../../components/ButtonComponent.jsx";

// Importing and using Store.js as dependency since it was already tested in another test case. (J.F.'s philosophy)

describe.only("Store function tests. ", () => {
  let store;
  let first;
  let second;
  let hourlyTestRate = 42;

  beforeEach(() => {
    store = new Store(new Storage(), hourlyTestRate);
    first = store.addNewEntry(new Date("2015-03-04 15:05:06"));
  });

  it(
    "Should render Loading Message when store is loading from storage. ",
    () => {
      const tree = render(<AppComponent store={store} />).html();
      expect(tree).toMatchSnapshot();
    }
  );

  it(
    "Should correctly render app tree with inactive button and two entries.",
    () => {
      store.setLoading(false);
      store.setEndForEntry(store.active, new Date("2016-09-09 15:05:06"));
      second = store.addNewEntry(new Date("2016-07-08 15:05:06"));
      store.setEndForEntry(store.active, new Date("2016-09-09 15:05:06"));

      const tree = render(<AppComponent store={store} />).html();
      expect(tree).toMatchSnapshot();
    }
  );

  it("Should render active button component. ", () => {
    const activeButton = render(
      <Button
        active={store.active}
        activeClickHandler={store.addNewEntry}
        inactiveClickHandler={store.setEndForEntry}
      />
    ).html();
    expect(activeButton).toMatchSnapshot();
  });

  it("Should render inactive button component. ", () => {
    store.setEndForEntry(store.active, new Date("2016-09-09 15:05:06"));
    const inactiveButton = render(
      <Button
        active={store.active}
        activeClickHandler={store.addNewEntry}
        inactiveClickHandler={store.setEndForEntry}
      />
    ).html();
    expect(inactiveButton).toMatchSnapshot();
  });

  it("Should render an entry list with two entries. ", () => {
    store.setEndForEntry(store.active, new Date("2016-09-09 15:05:06"));
    store.addNewEntry(new Date("2016-07-08 15:05:06"));
    store.setEndForEntry(store.active, new Date("2016-09-09 15:05:06"));
    const entryList = render(
      <EntryListComponent list={store.getCurrentList().reverse()} />
    ).html();
    expect(entryList).toMatchSnapshot();
  });
});
