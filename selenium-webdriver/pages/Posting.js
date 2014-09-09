'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL, platform) {
  this.city = webdriver.By.css("[data-qa=city-name]:first-child");
  this.category = "[data-qa=category-name][href*='posting/186']";
  this.subcategory = "[data-qa=subcategory-name][href*='posting/186/279']";   
  this.title = webdriver.By.css("[id=text-title]");
  this.description = webdriver.By.css("[id=text-description]");
  this.price = webdriver.By.css("[id=text-priceC]");
  this.contactName = webdriver.By.css("[id=text-contactName]");
  this.phone = webdriver.By.css("[id=text-phone]");
  this.email = webdriver.By.css("[id=text-email]");
  this.submitButton = webdriver.By.css("[data-qa=submit-button]");
 


  this.selectCityCategoryAndSubcategory = function(category , subcategory) {
    driver.findElement(this.city).click();
    if(!category || !subcategory){
      driver.findElement(webdriver.By.css(this.category)).click();
      driver.findElement(webdriver.By.css(this.subcategory)).click();
    }
      else {
        var category_locator = this.category;
        var subcategory_locator = this.subcategory
        var new_category = category_locator.replace("186", category);
        var new_subcategory = subcategory_locator.replace("186/279", category + "/" + subcategory);
        driver.findElement(webdriver.By.css(new_category)).click();  
        driver.findElement(webdriver.By.css(new_subcategory)).click();
      }
    };



  this.postWith = function(title, description, price , contact_name , phone , email) {
    driver.findElement(this.title).clear();
    driver.findElement(this.title).sendKeys(title);
    driver.findElement(this.description).clear();
    driver.findElement(this.description).sendKeys(description);
    if (price){
      driver.findElement(this.price).clear();
      driver.findElement(this.price).sendKeys(price);
    }
    driver.findElement(this.contactName).clear();
    driver.findElement(this.contactName).sendKeys(contact_name);
    driver.findElement(this.phone).clear();
    driver.findElement(this.phone).sendKeys(phone);
    driver.findElement(this.email).clear();
    driver.findElement(this.email).sendKeys(email);
    driver.findElement(this.submitButton).click();
    };
}