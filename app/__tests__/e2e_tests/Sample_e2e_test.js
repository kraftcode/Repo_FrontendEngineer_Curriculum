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

    browser
      .expect.element('ul').to.be.present;

    browser
      .expect.element('li').to.be.present;
    browser.end();
  },

  'step two' : function (browser) {
    browser
    .url('http://localhost:8080/')
    .waitForElementPresent('button', 1000);
    browser
    .expect.element('button').text.to.equal('Clock In Now');

    browser
    .click('button');

    browser
    .expect.element('button').text.to.equal('Clock Out Now');

    browser.end(); // must call end() to properly close testing!
  }
};
