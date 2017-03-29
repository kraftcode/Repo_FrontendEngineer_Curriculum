module.exports = {
  before: function() {
    console.log("BEFORE FUNCTION: setting up...");
    // do stuff...
  },

  after: function() {
    console.log("AFTER FUNCTION: closing down...");
  },

  beforeEach: function() {
    console.log("BEFORE EACH FUNCTION...");
  },

  afterEach: function() {
    console.log("AFTER EACH FUNCTION...");
  },

  "step one - should find basic UI components present. ": function(browser) {
    browser
      .url("http://localhost:8080/")
      .expect.element("button").to.be.present;

    browser.expect.element("ul").to.be.present;

    browser.click("button");

    browser.expect.element("li").to.be.present;

    browser.end();
  },

  "step two - should toggle correct text on button dependant on click state. ": function(browser) {
    browser.url("http://localhost:8080/").waitForElementPresent("button", 1000);
    browser.expect.element("button").text.to.equal("Clock In Now");

    browser.click("button");

    browser.expect.element("button").text.to.equal("Clock Out Now");
  },

  "step 3 - should display different css class for the active li element. ": function(browser) {
    browser
    .url("http://localhost:8080/");

    browser.assert.cssClassPresent('#main', 'entry__inactive__topbox');

    browser.click("button");

    browser.assert.cssClassPresent('#main', 'entry__active__topbox');

    browser.end(); // must call end() to properly close e2e testing!
  }

  // ,
  // "step 4 - should display Error Screen when error occurs. ": function(browser) {
  //   browser
  //   .url("http://localhost:8080/");
  //   throw new Error('TEST ERROR THROWN! ');
  //   browser.expect.cssClassPresent('#main', 'container__error');
  //   browser.expect.cssClassPresent('#main', 'image__error');
  // }

};
