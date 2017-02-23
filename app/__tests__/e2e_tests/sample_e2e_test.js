module.exports = {
  before : function() {
    console.log('BEFORE FUNCTION: setting up...');
    // do stuff...
  },

  after : function() {
    console.log('AFTER FUNCTION: closing down...');
  },

  beforeEach : function() {
    console.log('BEFORE EACH FUNCTION...');
  },

  afterEach : function() {
    console.log('AFTER EACH FUNCTION...');
  },

  'step one' : function (browser) {
    browser
      .url('http://localhost:8080/')
      .expect.element('button').to.be.present;
    browser.end();
  },

  // 'step two' : function (browser) {
  //   browser
  //   .assert.containsText('Clock In Now');
  //   browser.end(); // must call end() to properly close testing!
  // },
};
