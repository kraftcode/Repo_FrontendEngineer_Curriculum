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
      .assert.title('Webpack demo');
  },

  'step two' : function (browser) {
    browser
    .waitForElementVisible('body', 1000)
    .waitForElementVisible('h1', 1000)
    .expect.element('h1').to.be.present;
    browser.end(); // must call end() to properly close testing!
  },
};
