import Store from "../../Store";
import Storage from "../../Storage";

describe("Store tests. ", () => {
  let subject;
  let first;
  let second;
  let hourlyTestRate = 42;

  beforeEach(() => {
    subject = new Store(new Storage(), hourlyTestRate);
    first = subject.addNewEntry(new Date("2015-03-04 15:05:06"));
    second = subject.addNewEntry(new Date("2016-07-08 15:05:06"));
  });

  test(
    "Should add entries with specified start time and leave end time undefined.",
    () => {
      expect(subject.hourlyRate).toBe(hourlyTestRate);
      expect(subject.currentList[first].startDate.getTime()).toBe(
        1425477906000
      );
      expect(subject.currentList[first].endTime).toBe(undefined);
    }
  );

  test(
    "Should set correct end time for specified event and calculate its earnings.",
    () => {
      subject.setEndForEntry(subject.active, new Date("2016-09-09 15:05:06"));
      expect(subject.currentList[second].endDate.getTime()).toBe(1473426306000);
      expect(subject.currentList[second].earnings).toBe(63504);
      expect(subject.currentList[first].endTime).toBe(undefined);
    }
  );

  test("Should remove entry with specified ID from the event list.", () => {
    subject.removeEntry(second);
    expect(subject.currentList[second]).toBe(undefined);
  });
});
