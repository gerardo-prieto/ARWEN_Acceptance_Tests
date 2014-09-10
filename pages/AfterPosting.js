'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL, platform) {
    this.ad_link = webdriver.By.css("[data-qa=posted-ad-link]");

  this.openAdLink = function() {
      driver.findElement(this.ad_link).click();
    };

  this.isItemDisplayed = function(){
      var item_page_element = webdriver.By.css("[data-qa=item]");
 //     driver.manage().timeouts().implicitlyWait(0); 
      driver.isElementPresent(item_page_element)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(true);
          });
 //     driver.manage().timeouts().implicitlyWait(config.timeout); 
    };
}