'use strict';

var chai = require('chai');
var expect = chai.expect;
var webdriver = require('../node_modules/selenium-webdriver');
var config = require('../config');

module.exports = function(driver, baseURL, platform) {
   if (platform != 'wap'){
       this.city_link = "li:nth-child(1) > [data-qa=city-name]"; 
   }
     else{
        this.city_link = "tr:nth-child(1) > * > [data-qa=city-name]";
     }  
   this.selectCity = function(number) {
   if(!number){
      driver.findElement(webdriver.By.css(this.city_link)).click();
    }
     else {
      var city_link = this.city_link;
      var new_city_link = city_link.replace("1", number);
      driver.findElement(webdriver.By.css(new_city_link)).click();  
    }
  };
}
