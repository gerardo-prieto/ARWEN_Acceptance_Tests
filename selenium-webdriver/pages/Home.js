'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL, platform) {
  this.post_button = webdriver.By.css("[data-qa=post-button]");
  this.myolx = webdriver.By.css("[data-qa=my-olx]"); // -> Missing
  this.logout_button = webdriver.By.css("[data-qa=logout-link]");
  this.select_city_link = webdriver.By.css("[data-qa=select-city]");
  this.change_city_link = webdriver.By.css("[data-qa=change-city]");
  this.search_field = webdriver.By.css("[data-qa=search-input]");
  this.search_button = webdriver.By.css("[data-qa=search-submit]");
  
  this.go = function() {
        driver.manage().deleteAllCookies();
        driver.get(baseURL + '/?location=www.olx.com.py');
        driver.manage().addCookie('forcedPlatform', platform);
        driver.navigate().refresh(); 
        driver.manage().window().setSize(2280, 2024);
    };
  

  this.goToPostingPage = function() {
        driver.findElement(this.post_button).click();
    };

  this.goToLoginPage = function() {
        driver.findElement(this.myolx).click();
    };

  this.logOut = function(){
    driver.findElement(this.myolx).click();
    driver.findElement(this.logout_button).click();
    };

  this.isUserLoggedOut = function(){
      var myolx = this.myolx;
      var user_logged_out = webdriver.By.css("[href*='/login']");
      driver.manage().timeouts().implicitlyWait(0, 1000);
      driver.isElementPresent(user_logged_out)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(true);
      });
      driver.manage().timeouts().implicitlyWait(config.timeout, 1000);    
  };


  this.isUserLoggedIn = function(username, password) {
      var myolx = this.myolx;
      var user_logged_out = webdriver.By.css("[href*='/login']");
      driver.manage().timeouts().implicitlyWait(0, 1000);
      driver.isElementPresent(user_logged_out)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(false);
      });
      driver.manage().timeouts().implicitlyWait(config.timeout, 1000);    
  };

  this.goToChangeCity = function(){
     driver.findElement(this.change_city_link).click();     
  };

  this.goToSelectCity = function(){
     driver.findElement(this.select_city_link).click();     
  };

  this.isUserLocatedInCity = function() {
    var change_city = this.change_city_link;
    driver.manage().timeouts().implicitlyWait(0, 1000); 
    driver.isElementPresent(change_city)
      .then(function assert(isPresent) {
        expect(isPresent).to.equal(true);
    });
    driver.manage().timeouts().implicitlyWait(config.timeout, 1000); 
  };

  this.globalSearch = function(term){
    driver.findElement(this.search_field).clear();
    driver.findElement(this.search_field).sendKeys(term);
    driver.findElement(this.search_button).click();
  };
}