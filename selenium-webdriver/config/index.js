'use strict';

module.exports = {
    timeout: 10000,
    capabilities: {
        wap: {
            'browserName' : 'phantomjs' ,
            'logLevel': 'silent',
            'phantomjs.page.customHeaders.User-Agent' : 'WAP'
        },
        html4: {
            'browserName' : 'firefox' ,
            'logLevel': 'silent',
            'phantomjs.page.customHeaders.User-Agent' : 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16'
        }
    }
};