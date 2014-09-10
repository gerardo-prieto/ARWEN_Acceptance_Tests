'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL, platform) {
  this.message_field = webdriver.By.name("message");
  this.name_field = webdriver.By.name("name");
  this.email_field = webdriver.By.name("email");
  this.phone_field = webdriver.By.name("phone");
  this.reply_button = webdriver.By.css("[data-qa=reply-button]");
  this.reply_send_button = webdriver.By.css("[data-qa=reply-send-button]");
  this.confirmation_message = webdriver.By.css("[data-qa=reply-message-sent]");

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
    var confirmation_message = this.confirmation_message;
 //   driver.manage().timeouts().implicitlyWait(0); 
    driver.isElementPresent(confirmation_message)
     .then(function assert(isPresent) {
       expect(isPresent).to.equal(true);
    });
 //   driver.manage().timeouts().implicitlyWait(config.timeout); 
  };
}