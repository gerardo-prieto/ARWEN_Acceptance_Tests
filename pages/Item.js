'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL, platform) {
  if(platform == 'html4'){
    this.remove_favorite = webdriver.By.css("[data-qa=remove-favorite]"); 
    this.add_favorite = webdriver.By.css("[data-qa=add-favorite]");
  }
    else{
      this.remove_favorite = webdriver.By.css("[class*='fav'][class*='remove']"); 
      this.add_favorite = webdriver.By.css("[class*='fav'][class*='add']");
    }

  this.addItemToFavorites = function(){
    var remove_favorite = this.remove_favorite;
    var add_favorite = this.add_favorite;
    driver.manage().timeouts().implicitlyWait(0); 
    driver.isElementPresent(remove_favorite)
      .then(function check(isPresent) {
        if (isPresent){
          driver.findElement(remove_favorite).click();
        }
      })
      .then(function click() {
        driver.manage().timeouts().implicitlyWait(config.timeout);  
        driver.findElement(add_favorite).click();
        driver.manage().timeouts().implicitlyWait(0);  
      })
      .then(function check() {
        driver.isElementPresent(remove_favorite)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(true);
          });
      });
    driver.manage().timeouts().implicitlyWait(config.timeout);   
  };



  this.isItemDisplayed = function(){
      var item_page_element = webdriver.By.css("[data-qa=item]");
  //    driver.manage().timeouts().implicitlyWait(0); 
      driver.isElementPresent(item_page_element)
          .then(function assert(isPresent) {
            expect(isPresent).to.equal(true);
  //    driver.manage().timeouts().implicitlyWait(config.timeout);             
      });
  };       
}