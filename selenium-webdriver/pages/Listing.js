'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
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