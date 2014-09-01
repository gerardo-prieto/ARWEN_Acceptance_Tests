'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
  this.favorite_on = webdriver.By.css("[class*='favoriteOn']");
  this.favorite_off = webdriver.By.css("[class*='favoriteOff']");

  this.addItemToFavorites = function(){
 /*   if (driver.isElementPresent(this.favorite_on)){
        driver.findElement(this.favorite_on).click
    }
 */
    var favorite_on = this.favorite_off;
    var favorite_off = this.favorite_off;
    driver.findElement(this.favorite_off).click
    driver.wait(function() {
      return driver.findElement(favorite_on).then(function(res) {
        return driver.isElementPresent(favorite_on);
      });
    }, config.timeout);
    driver.findElement(favorite_on).click
    driver.wait(function() {
      return driver.findElement(favorite_off).then(function(res) {
        return driver.isElementPresent(favorite_off);
      });
    }, config.timeout);
  };



  this.isItemDisplayed = function(){
      var item_page_element = webdriver.By.css("[data-qa=item]");
      driver.wait(function() {
      return driver.findElement(item_page_element).then(function(res) {
        return driver.findElement(item_page_element);
      });
    }, config.timeout);
  };
}