'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function(driver, baseURL, platform) {
    var pages = {};

    fs.readdirSync(__dirname).forEach(function each(filename) {
        var name = path.basename(filename, '.js');
        var Page;

        if (name === 'index') {
            return;
        }
        Page = require('./' + name);
        pages[name] = new Page(driver, baseURL, platform);
    });
    return pages;
};
