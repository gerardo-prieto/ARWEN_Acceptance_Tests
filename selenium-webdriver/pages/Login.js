'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
  this.username_field = webdriver.By.css("[data-qa=username_field]");
  this.password_field = webdriver.By.css("[data-qa=password_field]");
  this.submit_button = webdriver.By.css("[data-qa=login_button]");
  this.logInWith = function(username, password) {
    driver.findElement(this.username_field).clear();
    driver.findElement(this.username_field).sendKeys(username);
    driver.findElement(this.password_field).clear();
    driver.findElement(this.password_field).sendKeys(password);
    driver.findElement(this.submit_button).click();
  }; 
}