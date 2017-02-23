import TestJSON from './TestPersistString.json';
import Store from '../../Store';

describe('Store function tests. ', () => {
  let subject;
  let first;
  let second;
  let hourlyTestRate = 42;

  beforeEach( () => {
    subject = new Store(hourlyTestRate);
    first = subject.addNewEntry(new Date('2015-03-04 15:05:06'));
    second = subject.addNewEntry(new Date('2016-07-08 15:05:06'));
  });

  test('Should add entries with specified start time and leave end time undefined.', () => {
    expect(subject.hourlyRate).toBe(hourlyTestRate);
    expect(subject.currentList[first].startTime).toBe('15:05');
    expect(subject.currentList[first].endTime).toBe('');
  });

  test('Should set correct end time for specified event and calculate its earnings.', ()=> {
    subject.setEndForEntry(second, new Date('2016-09-09 15:05:06'));
    expect(subject.currentList[second].endTime).toBe('15:05');
    expect(subject.currentList[second].earnings).toBe('€63.504,00');
    expect(subject.currentList[first].endTime).toBe('');
  });

  test('Should remove entry with specified ID from the event list.', () => {
    subject.removeEntry(second);
    expect(subject.currentList[second]).toBe(undefined);
  });

  test('Should return current application state as JSON string for storage.', () => {
    let expectedJSON = TestJSON;
    let jsonFromStore = subject.getStateJSONForStorage();
    expect(jsonFromStore).toBe(expectedJSON);
  });
});
