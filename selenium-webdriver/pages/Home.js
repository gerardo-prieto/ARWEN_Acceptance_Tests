'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
  this.post_button = webdriver.By.css("[class=post]");
  this.login_button = webdriver.By.css("[href*='/login']");
  this.myolx = webdriver.By.css("[href*='/myolx']");
  this.logout_button = webdriver.By.css("[href*='/logout']");
  this.change_city_link = webdriver.By.css("div[id=locationSelect] > a");
  this.search_field = webdriver.By.css("[data-qa=search-input]");
  this.search_button = webdriver.By.css("[data-qa=search-submit]");
  
  this.go = function() {
        driver.manage().deleteAllCookies();
        driver.get(baseURL + '/?location=www.olx.com.py');
        driver.manage().addCookie('forcedPlatform', 'html4');
        driver.navigate().refresh(); 
        driver.manage().window().setSize(2280, 2024);
    };
  

  this.goToPostingPage = function() {
        driver.findElement(this.post_button).click();
    };

  this.goToLoginPage = function() {
        driver.findElement(this.login_button).click();
    };

  this.logOut = function(){
    driver.findElement(this.myolx).click();
    driver.findElement(this.logout_button).click();
    };

  this.isUserLoggedOut = function(){
      var login_button = this.login_button
      driver.wait(function() {
      return driver.findElement(login_button).then(function(res) {
        return driver.findElement(login_button);
      });
    }, config.timeout);
   };

  this.isUserLoggedIn = function(username, password) {
      var myolx = this.myolx
      driver.wait(function() {
      return driver.findElement(myolx).then(function(res) {
        return driver.findElement(myolx);
      });
    }, config.timeout);
   };

  this.goToChangeCity = function(){
     driver.findElement(this.change_city_link).click();     
  };

  this.isUserLocatedInCity = function() {
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("location?location=");
        });
    }, config.timeout);
  };

  this.globalSearch = function(term){
    driver.findElement(this.search_field).clear();
    driver.findElement(this.search_field).sendKeys(term);
    driver.findElement(this.search_button).click();
  };
}


//LISTING
function ListingPage(){
  this.item_listing = "li:nth-child(1) > [data-qa=list-item]";
  this.openItem = function (number){
    if(!number){
      driver.findElement(webdriver.By.css(this.item_listing)).click();
    }
      else {
        var locator = this.item_listing;
        var new_locator = locator.replace("1", number);
        driver.findElement(webdriver.By.css(new_locator)).click();  
    }
  };
}
