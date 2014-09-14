exports.config = {
  seleniumServerJar: process.env.SELENIUM_JAR || '../node_modules/protractor/selenium/selenium-server-standalone-2.42.2.jar',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  capabilities: {
    'browserName': 'firefox'
  },
  baseUrl: 'http://localhost:3000',
  specs: ['../tests/*.js'],
  jasmineNodeOpts: {
    showColors: true,
  }
};