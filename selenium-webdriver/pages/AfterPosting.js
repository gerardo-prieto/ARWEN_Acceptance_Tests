'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
    this.adLink = webdriver.By.css("[data-qa=posted_ad_link]");

  this.openAdLink = function() {
      driver.findElement(this.adLink).click();
    };

  this.isItemDisplayed = function(){
      var item_page_element = webdriver.By.css("[data-qa=item]");
      driver.isElementPresent(item_page_element)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(true);
          });
    };
}