import Storage from '../../storage';

describe('localForage', () => {
  let testKey;
  let testJSObj;
  let subject;

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


  it('Should permanently persist JS-Object to local storage as JSON. ', () => {
    subject.asyncPersistAsJSON(testKey, testJSObj).then(function(resultObj){
      expect(resultObj).toMatchObject(testJSObj);
    });
  });

  it('Should retrieve persisted JSON value and return it parsed into JS-Object. ', async () => {
    await subject.asyncPersistAsJSON(testKey, testJSObj);
    await subject.asyncRetrieveAsJSON(testKey, function(resultObj){
      expect(resultObj).toMatchObject(testJSObj);
    });
  });
});
