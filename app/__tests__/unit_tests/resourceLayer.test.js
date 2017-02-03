import localForage from 'localforage';
import localForageMockDriver from '../../__mocks__/localForageMockDriver';
import Storage from '../../resourceLayer';


// localForage.defineDriver(localForageMockDriver)
//   .then(() => {
//     console.log('Driver defined');
//     console.log(localForage);
//
//     localForage.setDriver('localForageDriverMock')
//       .then(() => {
//         console.log('in set Driver', localForage.driver());
//       });
//   })
//   .catch(() => console.log('Driver rejected'));

describe('localForage', () => {
  let testKey;
  let testJSObj;
  let subject;

  // beforeAll(() => {
  //   return localForage
  //     .defineDriver(localForageMockDriver)
  //     .then(() => (localForage.setDriver('localForageDriverMock')));
  // });

  beforeEach(() => {
    testKey = 'persistKey';
    testJSObj = {
      testValue : 'Teststring value for asynchronous persistence with localforage API.',
      somenumber: 42,
    };

    subject = new Storage();
  });

  afterEach(() => {
    global.localStorage.clear();
  });


  it('Should permanently persist JS-Object to local storage as JSON. ', async () => {
    let resultObj = {};
    await subject.asyncPersistAsJSON(testKey, testJSObj, function(value){
      resultObj = value;
      return value;
    });

    expect(resultObj).toMatchObject(testJSObj);
  });

  it('Should retrieve persisted JSON value and return it parsed into JS-Object. ', async () => {
    let resultObj = {};
    await subject.asyncPersistAsJSON(testKey, testJSObj);
    await subject.asyncRetrieveAsJSON(testKey, function(value){
      resultObj = value;
    });
    expect(resultObj).toMatchObject(testJSObj);
  });
});