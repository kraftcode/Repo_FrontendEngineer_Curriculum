import mobx from "mobx";
import renderer from "react-test-renderer";
import React from "react";
import Store from "../../Store";
import Storage from "../../Storage";
import AppComponent from "../../components/AppComponent.jsx";

// Importing and using Store.js as dependency since it was already tested in another test case. (J.F.'s philosophy)

describe.only("Store function tests. ", () => {
  let store;
  let first;
  let second;
  let hourlyTestRate = 42;

  beforeEach(() => {
    store = new Store(new Storage(), hourlyTestRate);
    // store.setLoading(false);
    first = store.addNewEntry(new Date("2015-03-04 15:05:06"));
  });

  xit(
    "Should render Loading Message when store is loading from storage. ",
    () => {
      const tree = renderer.create(<AppComponent store={store} />).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );

  it(
    "Should correctly render app tree with active button and one entry. ",
    async () => {
      await store.setLoading(false);
      console.log(mobx.toJS(store.currentList));
      // let store = {
      //   isLoading: false,
      //   currentList: [{ startDate: new Date(), endDate: null, rate: 42 }]
      // };

      const tree = renderer.create(<AppComponent store={store} />).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );

  xit(
    "Should correctly render app tree with inactive button and two entries.",
    () => {
      second = store.addNewEntry(new Date("2016-07-08 15:05:06"));
      store.setEndForEntry(store.active, new Date("2016-09-09 15:05:06"));

      const tree = renderer.create(<AppComponent store={store} />).toJSON();
      expect(tree).toMatchSnapshot();
    }
  );
});
