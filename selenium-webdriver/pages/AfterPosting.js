'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
    this.adLink = webdriver.By.css("[href*='-iid-']");

  this.openAdLink = function() {
      driver.findElement(this.adLink).click();
    };

  this.isItemDisplayed = function(title){
      driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain(title);
      });
    }, config.timeout);
  };
}