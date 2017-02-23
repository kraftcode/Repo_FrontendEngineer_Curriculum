import toHTML from 'snabbdom-to-html';
import EntryComponent from '../../components/EntryComponent.jsx';
import EntryListComponent from '../../components/EntryListComponent.jsx';
import ButtonComponent from '../../components/ButtonComponent.jsx';
import Store from '../../Store';

// Importing and using Store.js as dependency since it was already tested in another test case. (J.F.'s philosophy)

describe('Store function tests. ', () => {
  let store;
  let first;
  let second;
  let hourlyTestRate = 42;

  beforeEach( () => {
    store = new Store(hourlyTestRate);
    first = store.addNewEntry(new Date('2015-03-04 15:05:06'));
    second = store.addNewEntry(new Date('2016-07-08 15:05:06'));
    store.setEndForEntry(second, new Date('2016-09-09 15:05:06'));
  });

  test('Should render HTML EntryComponent tag built from store list entry without end date. ', () => {
    let element = store.getCurrentList()[0];
    let subject = <EntryComponent props={element} />;
    let expected = toHTML(subject);
    expect(expected).toMatchSnapshot(); // update snapshots by running: npm test:unit -- -u
  });

  test('Should render HTML EntryComponent tag from store list entry with end date. ', () => {
    let element = store.getCurrentList()[1];
    let subject = <EntryComponent props={element} />;
    let expected = toHTML(subject);
    expect(expected).toMatchSnapshot(); // update snapshots by running: npm test:unit -- -u
  });

  test('Should render HTML ListEntryComponent tag composed of all elements in store list. ', () => {
    let subject = EntryListComponent(store.getCurrentList());
    let expected = toHTML(subject);
    expect(expected).toMatchSnapshot(); // update snapshots by running: npm test:unit -- -u
  });

  test('Should render HTML ButtonComponent tag with inactive button. ', () => {
    store.setButtonActive();
    let subject = ButtonComponent(store);
    let expected = toHTML(subject);
    expect(expected).toMatchSnapshot(); // update snapshots by running: npm test:unit -- -u
  });

  test('Should render HTML ButtonComponent tag with active button. ', () => {
    store.setButtonInactive();
    let subject = ButtonComponent(store);
    let expected = toHTML(subject);
    expect(expected).toMatchSnapshot(); // update snapshots by running: npm test:unit -- -u
  });

});
