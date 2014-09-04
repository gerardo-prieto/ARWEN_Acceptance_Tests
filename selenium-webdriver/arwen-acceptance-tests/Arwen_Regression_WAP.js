var assert = require('assert'),
    fs = require('fs');

var chai = require("chai");
var expect = chai.expect;

var webdriver = require('../node_modules/selenium-webdriver'),
    test = require('../node_modules/selenium-webdriver/testing'),
    remote = require('../node_modules/selenium-webdriver/remote'),
    SeleniumServer = require('../node_modules/selenium-webdriver/remote').SeleniumServer;


var server = new SeleniumServer("../libs/selenium-server-standalone.jar", {
  port: 7444
});
    server.start ();

// Testing
//var baseURL = 'http://html5.m-testing.olx.com';

var timeout = 60000;

// Staging
//var baseURL = 'http://html5.m-staging.olx.com';

//var baseURL = 'http://m.olx.com.py';

var argv = require('optimist').demand('env').argv;
var baseURL = argv.env;


var driver;

var capabilities = {
    'browserName' : 'phantomjs' ,
    'logLevel': 'silent',
    'phantomjs.page.customHeaders.User-Agent' : 'WAP'
    }

// HOMEPAGE
function HomePage(){
  this.post_button = webdriver.By.css("[href*='posting']");
  this.ChangeCity_link = webdriver.By.css("[href*='/location']:not([href*='posting'])");
  this.search_field = webdriver.By.css("[data-qa=search-input]");
  this.search_button = webdriver.By.css("[data-qa=search-submit]");
  this.goToHomePage = function() {
        driver.manage().deleteAllCookies();
        driver.get(baseURL + '/?location=www.olx.com.py');
        driver.manage().deleteAllCookies();
        driver.manage().addCookie('forcedPlatform', 'wap');
        driver.navigate().refresh(); 
        driver.manage().window().setSize(2280, 2024);
    };
  

  this.goToPostingPage = function() {
        driver.findElement(this.post_button).click();
    };


  this.goToChangeCity = function(){
     driver.findElement(this.ChangeCity_link).click();     
  };

  this.isUserLocatedInCity = function() {
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain("location?location=");
        });
    }, timeout);
  };

  this.globalSearch = function(term){
    driver.findElement(this.search_field).clear();
    driver.findElement(this.search_field).sendKeys(term);
    driver.findElement(this.search_button).click();
  };
}

//LISTING

function ListingPage(){
  this.item_listing = "tr:nth-child(2) > td > [data-qa=list-item]";
  this.openItem = function (number){
    if(!number){
      driver.findElement(webdriver.By.css(this.item_listing)).click();
    }
      else {
        var locator = this.item_listing;
        var new_locator = locator.replace("2", number);
        driver.findElement(webdriver.By.css(new_locator)).click();  
    }
  };
}




//POSTING

function PostingPage(){
  this.city = webdriver.By.css("tr:nth-child(2) > td > [href*='location=']");
  this.category = "[href*='posting/186']";
  this.subcategory = "[href*='posting/186/279']";  
  this.title = webdriver.By.css("[id=text-title]");
  this.description = webdriver.By.css("[id=text-description]");
  this.price = webdriver.By.css("[id=text-priceC]");
  this.contactName = webdriver.By.css("[id=text-contactName]");
  this.phone = webdriver.By.css("[id=text-phone]");
  this.email = webdriver.By.css("[id=text-email]");
  this.submitButton = webdriver.By.css("[type=submit]:not([formaction])");
 


  this.selectCityCategoryAndSubcategory = function(category, subcategory) {
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


  this.postWith = function(title, description, price , contact_name, phone, email) {
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


//AFTER POSTING
function AfterPostingPage(){
    this.adLink = webdriver.By.css("[href*='iid']");

  this.openAdLink = function() {
      driver.findElement(this.adLink).click();
    };

  this.isItemDisplayed = function(title){
      driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return expect(res).to.contain(title);
      });
    }, timeout);
  };
}



// LOCATION
function LocationPage(){
   this.city_text = "tr:nth-child(1) > td > [href*='location=']:not([href*='www.olx.com.py'])";
   this.selectCity = function(number) {
    if(!number){
      driver.findElement(webdriver.By.css(this.city_text)).click();
    }
      else {
        var locator = this.city_text;
        var new_locator = locator.replace("1", number);
        driver.findElement(webdriver.By.css(new_locator)).click();  
    }
  };
}



// ITEM PAGE
function ItemPage(){

  this.isItemDisplayed = function(){
      var item_page_element = webdriver.By.css("[data-qa=item]");
      driver.wait(function() {
      return driver.findElement(item_page_element).then(function(res) {
        return driver.findElement(item_page_element);
      });
    }, timeout);
  };
}

function ReplyAdPage(){
  this.message_field = webdriver.By.name("message");
  this.name_field = webdriver.By.name("name");
  this.email_field = webdriver.By.name("email");
  this.phone_field = webdriver.By.name("phone");
  this.reply_button = webdriver.By.css("[href*='/reply']");
  this.send_button = webdriver.By.css("[name=submit]");
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
    driver.findElement(this.send_button).click();
  };

  this.isConfirmationMessageDisplayed = function(){
    var confirmation_id = this.confirmation_id;
    driver.wait(function() {
      return driver.getPageSource().then(function(res) {
        return driver.findElement(confirmation_id);
      });
    }, timeout);
  };

}
  


test.describe('ARWEN Test Suite', function() {
    var homePage =  new HomePage();
    var postingPage = new PostingPage();
    var afterPostingPage = new AfterPostingPage();
    var locationPage = new LocationPage();
    var listingPage = new ListingPage();
    var itemPage = new ItemPage();
    var replyAdPage = new ReplyAdPage();

  test.before(function() {
    driver = new webdriver.Builder().
    usingServer(server.address()).
    withCapabilities(capabilities). 
    build();
    driver.manage().timeouts().implicitlyWait(timeout, 1000);

  });


  test.it('POST - Anonymous - No price', function() {
    homePage.goToHomePage();
    homePage.goToPostingPage();
    postingPage.selectCityCategoryAndSubcategory(186,279);
    postingPage.postWith("Title for testing", "Description for testing", "" ,"Mark tester", "1231231231", "robot_test@olx.com");
    afterPostingPage.openAdLink();
    afterPostingPage.isItemDisplayed("Title for testing");
  });


  test.it('POST - Anonymous - With price', function() {
    homePage.goToHomePage();
    homePage.goToPostingPage();
    postingPage.selectCityCategoryAndSubcategory(362,378);
    postingPage.postWith("Title for testing","Description for testing", "23123","Mark tester", "1231231231", "robot_test@olx.com");
    afterPostingPage.openAdLink();
    afterPostingPage.isItemDisplayed("Title for testing");
  });


  test.it('LOCATION - Select city', function() {
    homePage.goToHomePage();
    homePage.goToChangeCity();
    locationPage.selectCity(1);
    homePage.isUserLocatedInCity();
  });




  test.it('LOCATION - Change city', function() {
    homePage.goToHomePage();
    homePage.goToChangeCity();
    locationPage.selectCity(1);
    homePage.isUserLocatedInCity();
    homePage.goToChangeCity();
    locationPage.selectCity(2);
    homePage.isUserLocatedInCity();

  });


  test.it('SEARCH - Global search ', function() {
    homePage.goToHomePage();
    homePage.globalSearch("a");
    listingPage.openItem();
    itemPage.isItemDisplayed();
  });




  test.it('ITEM PAGE - Reply an Ad', function() {
    homePage.goToHomePage();
    homePage.globalSearch("a");
    listingPage.openItem();
    replyAdPage.replyAnAdWith('Reply message for testing', 'robot', 'robot_test@olx.com', '1231231231');
    replyAdPage.isConfirmationMessageDisplayed();
  });


  test.after(function() { driver.quit(); });
});