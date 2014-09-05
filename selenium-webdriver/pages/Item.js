'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
  this.favorite_on = webdriver.By.css("[class*='favoriteOn']"); // missing
  this.favorite_off = webdriver.By.css("[class*='favoriteOff']"); // missing

  this.addItemToFavorites = function(){
    var favorite_on = this.favorite_on;
    var favorite_off = this.favorite_off;

    driver.isElementPresent(favorite_on)
      .then(function check(isPresent) {
        if (isPresent){
          driver.findElement(favorite_on).click();
        }
      })
      .then(function click() {
        driver.findElement(favorite_off).click();
      })
      .then(function check() {
        driver.isElementPresent(favorite_on)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(true);
          });
      });
  };



  this.isItemDisplayed = function(){
      var item_page_element = webdriver.By.css("[data-qa=item]");
      driver.isElementPresent(item_page_element)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(true);
      });
  };       
}