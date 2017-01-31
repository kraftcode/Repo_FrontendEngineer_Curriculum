import formateDate from '../../lib/dateFormatter';

test('Should correctly formate input date and return it as a String. ', () => {
  var testDate = new Date('January 20, 2017 08:29:22');
  console.log('LOGGING: ' + testDate);
  var resultString = formateDate(testDate);
  expect(resultString).toBe('2017 M01 20, Fri 08:29:22');
});
