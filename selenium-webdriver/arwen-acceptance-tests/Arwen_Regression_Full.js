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
var baseURL = 'http://html5.m-testing.olx.com';

var timeout = 40000;

// Staging
//var baseURL = 'http://html5.m-staging.olx.com';

//var baseURL = 'http://m.olx.com.py';


var driver;

var capabilities = {
    'browserName' : 'phantomjs' ,
    'logLevel': 'silent',
    'phantomjs.page.settings.userAgent' : 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16'
    }

// HOMEPAGE
function HomePage(){
  this.post_button = webdriver.By.css("[class=post]");
  this.login_button = webdriver.By.css("[href*='/login']");
  this.myolx = webdriver.By.css("[href*='/myolx']");
  this.logout_button = webdriver.By.css("[href*='/logout']");
  this.ChangeCity_link = webdriver.By.css("div[id=locationSelect] > a");
  this.search_field = webdriver.By.css("[data-qa=search-input]");
  this.search_button = webdriver.By.css("[data-qa=search-submit]");
  this.goToHomePage = function() {
        driver.manage().deleteAllCookies();
        driver.get(baseURL + '/?location=www.olx.com.py');
        driver.manage().addCookie('forcedPlatform', 'html4');
        driver.navigate().refresh(); 
        driver.manage().window().setSize(2280, 2024);
    };
  

  this.goToPostingPage = function() {
        driver.findElement(this.post_button).click();
    };

  this.goToLoginPage = function() {
        driver.findElement(this.login_button).click();
    };

  this.logOut = function(){
    driver.findElement(this.myolx).click();
    driver.findElement(this.logout_button).click();
    };

  this.isUserLoggedOut = function(){
      var login_button = this.login_button
      driver.wait(function() {
      return driver.findElement(login_button).then(function(res) {
        return driver.findElement(login_button);
      });
    }, timeout);
   };

  this.isUserLoggedIn = function(username, password) {
      var myolx = this.myolx
      driver.wait(function() {
      return driver.findElement(myolx).then(function(res) {
        return driver.findElement(myolx);
      });
    }, timeout);
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


//LOGIN

function LoginPage(){
  this.username_field = webdriver.By.css("[name=usernameOrEmail]");
  this.password_field = webdriver.By.css("[name=password]");
  this.submit_button = webdriver.By.css("[name=submit]");
  this.logInWith = function(username, password) {
    driver.findElement(this.username_field).clear();
    driver.findElement(this.username_field).sendKeys(username);
    driver.findElement(this.password_field).clear();
    driver.findElement(this.password_field).sendKeys(password);
    driver.findElement(this.submit_button).click();
  }; 
}




//POSTING

function PostingPage(){
  this.city = webdriver.By.css("[class=city]:first-child");
  this.category = webdriver.By.css("[class=normalList] > li:first-child > a");
  this.subcategory = webdriver.By.css("[class=normalList] > li:first-child > a");  
  this.title = webdriver.By.css("[id=text-title]");
  this.description = webdriver.By.css("[id=text-description]");
  this.contactName = webdriver.By.css("[id=text-contactName]");
  this.phone = webdriver.By.css("[id=text-phone]");
  this.email = webdriver.By.css("[id=text-email]");
  this.submitButton = webdriver.By.css("[type=submit][class*='btns']");
 


  this.selectCityCategoryAndSubcategory = function() {
      driver.findElement(this.city).click();
      driver.findElement(this.category).click();
      driver.findElement(this.subcategory).click();
    };


  this.postWith = function(title, description, contact_name, phone, email) {
    driver.findElement(this.title).clear();
    driver.findElement(this.title).sendKeys(title);
    driver.findElement(this.description).clear();
    driver.findElement(this.description).sendKeys(description);
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
    this.adLink = webdriver.By.css("[href*='-iid-']");

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
   this.city_link = webdriver.By.css("[class=normalList] > li:nth-child(1) > a");
  
   this.selectCity = function(number) {
    this.city_link = webdriver.By.css("[class=normalList] > li:nth-child("+number+") > a");
    driver.findElement(this.city_link).click();
  };
}

// ITEM PAGE
function ItemPage(){
  this.favorite_on = webdriver.By.css("[class*='favoriteOn']");
  this.favorite_off = webdriver.By.css("[class*='favoriteOff']");

  this.addItemToFavorites = function(){
 /*   if (driver.isElementPresent(this.favorite_on)){
        driver.findElement(this.favorite_on).click
    }
 */
    var favorite_on = this.favorite_off;
    var favorite_off = this.favorite_off;
    driver.findElement(this.favorite_off).click
    driver.wait(function() {
      return driver.findElement(favorite_on).then(function(res) {
        return driver.isElementPresent(favorite_on);
      });
    }, timeout);
    driver.findElement(favorite_on).click
    driver.wait(function() {
      return driver.findElement(favorite_off).then(function(res) {
        return driver.isElementPresent(favorite_off);
      });
    }, timeout);
  };



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
  this.send_button = webdriver.By.name("submit");
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

  test.before(function() {
    driver = new webdriver.Builder().
    usingServer(server.address()).
    withCapabilities(capabilities). 
    build();
    driver.manage().timeouts().implicitlyWait(30000, 1000);
  });


  test.it('POST - Anonymous', function() {
    var homePage =  new HomePage();
    var postingPage = new PostingPage();
    var afterPostingPage = new AfterPostingPage();
    homePage.goToHomePage();
    homePage.goToPostingPage();
    postingPage.selectCityCategoryAndSubcategory();
    postingPage.postWith("Title for testing","Description for testing", "Mark tester", "1231231231", "robot_test@olx.com");
    afterPostingPage.openAdLink();
    afterPostingPage.isItemDisplayed("Title for testing");
  });


  test.it('POST - Logged In', function() {
    var homePage =  new HomePage();
    var postingPage = new PostingPage();
    var afterPostingPage = new AfterPostingPage();
    var loginPage = new LoginPage();


    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.goToPostingPage();
    postingPage.selectCityCategoryAndSubcategory();
    postingPage.postWith("Title for testing","Description for testing", "Mark tester", "1231231231", "robot_test@olx.com");
    afterPostingPage.openAdLink();
    afterPostingPage.isItemDisplayed("Title for testing");
  });



  test.it('LOGIN with valid user', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.isUserLoggedIn();
  });


test.it('LOGOUT - Logout with valid user', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.logOut();
    homePage.isUserLoggedOut();

  });


test.it('LOCATION - Select city', function() {
    var homePage =  new HomePage();
    var locationPage = new LocationPage();

    homePage.goToHomePage();
    homePage.goToChangeCity();
    locationPage.selectCity(1);
    homePage.isUserLocatedInCity();
  });




test.it('LOCATION - Change city', function() {
    var homePage =  new HomePage();
    var locationPage = new LocationPage();

    homePage.goToHomePage();
    homePage.goToChangeCity();
    locationPage.selectCity(1);
    homePage.isUserLocatedInCity();
    homePage.goToChangeCity();
    locationPage.selectCity(2);
    homePage.isUserLocatedInCity();

  });


test.it('SEARCH - Search logged in', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();
    var listingPage = new ListingPage();
    var itemPage = new ItemPage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.globalSearch("a");
    listingPage.openItem();
    itemPage.isItemDisplayed();
  });




test.it('ITEM PAGE - Reply an Ad', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();
    var listingPage = new ListingPage();
    var itemPage = new ItemPage();
    var replyAdPage = new ReplyAdPage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.globalSearch("a");
    listingPage.openItem(1);
    replyAdPage.replyAnAdWith('Reply message for testing', 'robot', 'robot_test@olx.com', '1231231231');
    replyAdPage.isConfirmationMessageDisplayed();
  });


test.it('ITEM PAGE - Add Remove to Favorites', function() {
    var loginPage = new LoginPage();
    var homePage =  new HomePage();
    var listingPage = new ListingPage();
    var itemPage = new ItemPage();

    homePage.goToHomePage();
    homePage.goToLoginPage();
    loginPage.logInWith('robot_test@olx.com', 'robotium2014');
    homePage.globalSearch("a");
    listingPage.openItem(1);
    itemPage.addItemToFavorites();
  });

  test.after(function() { driver.quit(); });
});


/*
var url =
var number = url.match(/(\d+){4,20}/);
*/

