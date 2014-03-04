exports.config = {
  seleniumAddress: 'http://127.0.0.2:4444/wd/hub',
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:3000',
  specs: ['../tests/*.js'],
  jasmineNodeOpts: {
    showColors: true,
  }
};