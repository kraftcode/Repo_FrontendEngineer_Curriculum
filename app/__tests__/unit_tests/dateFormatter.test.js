import moment from 'moment';
import formateDate from '../../lib/dateFormatter';

moment.locale('de');

test('Should correctly formate input date and return it as a String. ', () => {
  let testdate = moment().format('2013-02-08 09:30:26');
  let resultString = formateDate(testdate);
  expect(resultString).toBe('Fr. 8. Februar 2013 09:30');
});
