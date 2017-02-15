import h from 'snabbdom/h';
import modules from 'snabbdom-to-html/modules';
import init from 'snabbdom-to-html/init';
import Store from '../../Store';

let subject;
let first;
let second;
let hourlyTestRate = 42;
let expectedJSON = `{\"0\":42,\"1\":\"{\\\"standardStartDate\\\":\\\"2015-03-04T14:05:06.000Z\\\",\\\"startDay\\\":\\\"Mi.\\\",\\\"startDate\\\":\\\"4. März 2015\\\",\\\"startTime\\\":\\\"15:05\\\"}\",\"2\":\"{\\\"standardStartDate\\\":\\\"2016-07-08T13:05:06.000Z\\\",\\\"startDay\\\":\\\"Fr.\\\",\\\"startDate\\\":\\\"8. Juli 2016\\\",\\\"startTime\\\":\\\"15:05\\\"}\"}`;

var toHTML = init([
  modules.class,
  modules.props,
  modules.attributes,
  modules.style,
]);

var output = toHTML(
  h('div', { style: { color: 'lime' } }, 'over the lazy fox')
);
console.log(output);

beforeEach( () => {
  subject = new Store(hourlyTestRate);
  first = subject.addNewEntry(new Date('2015-03-04 15:05:06'));
  second = subject.addNewEntry(new Date('2016-07-08 15:05:06'));
});

test('Should add entries with specified start time and leave end time undefined.', () => {
  expect(subject.hourlyRate).toBe(hourlyTestRate);
  expect(subject.currentList[first].startTime).toBe('15:05');
  expect(subject.currentList[first].endTime).toBe(undefined);
});

test('Should set correct end time for specified events and calculate earnings.', ()=> {
  subject.setEndForEntry(second, new Date('2016-09-09 15:05:06'));
  expect(subject.currentList[second].endTime).toBe('15:05');
  expect(subject.currentList[second].earnings).toBe('€63.504,00');
  expect(subject.currentList[first].endTime).toBe(undefined);
});

test('Should remove the entry via its ID from the event list.', () => {
  subject.removeEntry(second);
  expect(subject.currentList[second]).toBe(undefined);
});

test('Should correctly return application state as JSON string.', () => {
  let resultJSON = subject.getStateJSONForStorage();
  expect(resultJSON).toBe(expectedJSON);
});

test('Should return app state as correctly formatted renderable UI components.', () => {
  // subject.getRenderEntryList();
});
