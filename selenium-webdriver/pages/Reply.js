'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL) {
  this.message_field = webdriver.By.name("message");
  this.name_field = webdriver.By.name("name");
  this.email_field = webdriver.By.name("email");
  this.phone_field = webdriver.By.name("phone");
  this.reply_button = webdriver.By.css("[data-qa=reply-button]");
  this.reply_send_button = webdriver.By.css("data-qa=reply-send-button");
  this.confirmation_id = webdriver.By.css("[class=items_success_view]");

  this.replyAnAdWith = function(message, name, email, phone){
    var reply_button = this.reply_button;
    driver.findElement(reply_button).click();
    driver.findElement(this.message_field).sendKeys(message);
    driver.findElement(this.name_field).clear();
    driver.findElement(this.name_field).sendKeys(name);
    driver.findElement(this.email_field).clear();
    driver.findElement(this.email_field).sendKeys(email);
    driver.findElement(this.phone_field).clear();
    driver.findElement(this.phone_field).sendKeys(phone);
    driver.findElement(this.reply_send_button).click();
  };

  this.isConfirmationMessageDisplayed = function(){
    var confirmation_id = this.confirmation_id;
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return driver.findElement(confirmation_id);
      });
    }, config.timeout);
  };
}