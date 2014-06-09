exports.config = {
  seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.42.0.jar',
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