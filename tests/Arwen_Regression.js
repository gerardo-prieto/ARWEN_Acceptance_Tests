var assert = require('assert'),
    fs = require('fs');

var chai = require("chai");
var expect = chai.expect;

var webdriver = require('../node_modules/selenium-webdriver'),
    test = require('../node_modules/selenium-webdriver/testing'),
    remote = require('../node_modules/selenium-webdriver/remote'),
    SeleniumServer = require('../node_modules/selenium-webdriver/remote').SeleniumServer;
var config = require('../config');


var server = new SeleniumServer("../libs/selenium-server-standalone.jar", {
  port: 7444
});
    server.start ();


var argv = require('optimist').demand('env').argv;
var baseURL = argv.env;
var platform = argv.platform;

var driver;


test.describe('ARWEN Test Suite', function() {
  var pages;

  test.before(function() {
    driver = new webdriver.Builder().
    usingServer(server.address()).
    withCapabilities(config.capabilities[platform]). 
    build();
    driver.manage().timeouts().implicitlyWait(config.timeout);
    pages = require('../pages')(driver, baseURL, platform);
  });



  test.it('POST - Anonymous - No price - @wap @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToPostingPage();
    pages.Posting.selectCityCategoryAndSubcategory();
    pages.Posting.postWith("Title for testing", "Description for testing", "" , "Mark tester", "1231231231", "robotest@olx.com");
    pages.AfterPosting.openAdLink();
    pages.AfterPosting.isItemDisplayed("Title for testing");
  });


  test.it('POST - Anonymous - With price - @wap @html4 @html5 ', function() {
    pages.Home.go();
    pages.Home.goToPostingPage();
    pages.Posting.selectCityCategoryAndSubcategory(362,378);
    pages.Posting.postWith("Title for testing","Description for testing", "2000" , "Mark tester", "1231231231", "robotest@olx.com");
    pages.AfterPosting.openAdLink();
    pages.AfterPosting.isItemDisplayed("Title for testing");
  });



  test.it('POST - Logged In - No price - @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToLoginPage();
    pages.Login.logInWith('robotest@olx.com', 'robotpass');
    pages.Home.goToPostingPage();
    pages.Posting.selectCityCategoryAndSubcategory();
    pages.Posting.postWith("Title for testing","Description for testing", "" , "Mark tester", "1231231231", "robotest@olx.com");
    pages.AfterPosting.openAdLink();
    pages.AfterPosting.isItemDisplayed("Title for testing");
  });


  test.it('POST - Logged In - With price - @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToLoginPage();
    pages.Login.logInWith('robotest@olx.com', 'robotpass');
    pages.Home.goToPostingPage();
    pages.Posting.selectCityCategoryAndSubcategory(362,378);
    pages.Posting.postWith("Title for testing","Description for testing", "2000" , "Mark tester", "1231231231", "robotest@olx.com");
    pages.AfterPosting.openAdLink();
    pages.AfterPosting.isItemDisplayed("Title for testing");
  });



  test.it('LOGIN with valid user - @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToLoginPage();
    pages.Login.logInWith('robotest@olx.com', 'robotpass');
    pages.Home.isUserLoggedIn();
  });


test.it('LOGOUT - Logout with valid user - @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToLoginPage();
    pages.Login.logInWith('robotest@olx.com', 'robotpass');
    pages.Home.logOut();
    pages.Home.isUserLoggedOut();

  });


test.it('LOCATION - Select city - @wap @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToSelectCity();
    pages.Location.selectCity(1);
    pages.Home.isUserLocatedInCity();
  });


test.it('LOCATION - Change city - @wap @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToSelectCity();
    pages.Location.selectCity(1);
    pages.Home.isUserLocatedInCity();
    pages.Home.goToChangeCity();
    pages.Location.selectCity(2);
    pages.Home.isUserLocatedInCity();

  });



test.it('SEARCH - Search logged in - @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToLoginPage();
    pages.Login.logInWith('robotest@olx.com', 'robotpass');
    pages.Home.globalSearch("a");
    pages.Listing.openItem();
    pages.Item.isItemDisplayed();
  });


test.it('SEARCH - Search and open an Ad - @wap @html4 @html5', function() {
    pages.Home.go();
    pages.Home.globalSearch("a");
    pages.Listing.openItem();
    pages.Item.isItemDisplayed();
  });




test.it('ITEM PAGE - Reply an Ad - Anonymous - @wap @html4 @html5', function() {
    pages.Home.go();
    pages.Home.globalSearch("a");
    pages.Listing.openItem(1);
    pages.Reply.replyAnAdWith('Reply message for testing', 'robot', 'robotest@olx.com', '1231231231');
    pages.Reply.isConfirmationMessageDisplayed();
  });


test.it('ITEM PAGE - Reply an Ad - Logged in - @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToLoginPage();
    pages.Login.logInWith('robotest@olx.com', 'robotpass');
    pages.Home.globalSearch("a");
    pages.Listing.openItem(1);
    pages.Reply.replyAnAdWith('Reply message for testing', 'robot', 'robotest@olx.com', '1231231231');
    pages.Reply.isConfirmationMessageDisplayed();
  });



test.it('ITEM PAGE - Add and Remove to Favorites - @html4 @html5', function() {
    pages.Home.go();
    pages.Home.goToLoginPage();
    pages.Login.logInWith('robotest@olx.com', 'robotpass');
    pages.Home.globalSearch("a");
    pages.Listing.openItem(1);
    pages.Item.addItemToFavorites();
  });



  test.after(function() { driver.quit(); });
});
