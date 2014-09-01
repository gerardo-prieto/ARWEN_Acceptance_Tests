'use strict';

module.exports = {
    timeout: 60000,
    capabilities: {
        wap: {
            'browserName' : 'phantomjs' ,
            'logLevel': 'silent',
            'phantomjs.page.customHeaders.User-Agent' : 'WAP'
        }
    }
};