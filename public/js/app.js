(function(angular) {

  var djm = angular.module('djm', ['ui.router', 'ui.bootstrap','angular-google-analytics']);

  djm.config(function($locationProvider) {
    $locationProvider.html5Mode(true);
  });

  djm.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html"
    })
    .state('about', {
      url: "/about",
      templateUrl: "partials/about.html"
    })
    .state('projects', {
      url: "/projects",
      templateUrl: "partials/projects.html"
    })
    .state('blog', {
      url: "/blog",
      templateUrl: "partials/blog.html"
    });
  });

  djm.config(function(AnalyticsProvider) {
    // initial configuration
    AnalyticsProvider.setAccount('UA-51704699-1');

    // track all routes (or not)
    AnalyticsProvider.trackPages(true);

    //Optional set domain (Use 'none' for testing on localhost)
    //AnalyticsProvider.setDomainName('XXX');

    // Use analytics.js instead of ga.js
    AnalyticsProvider.useAnalytics(true);

    // Ignore first page view... helpful when using hashes and whenever your bounce rate looks obscenely low.
    // AnalyticsProvider.ignoreFirstPageLoad(true);

    //Enable enhanced link attribution
    AnalyticsProvider.useEnhancedLinkAttribution(true);

    //Enable analytics.js experiments
    //AnalyticsProvider.setExperimentId('12345');

    //Set custom cookie parameters for analytics.js
    // AnalyticsProvider.setCookieConfig({
    //   cookieDomain: 'foo.example.com',
    //   cookieName: 'myNewName',
    //   cookieExpires: 20000
    // });

    // change page event name
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

  })
  .run(function(Analytics) {
    // In case you are relying on automatic page tracking, you need to inject Analytics
    // at least once in your application (for example in the main run() block)
  });


  djm.controller('NavCtrl', function($scope) {
    $scope.isCollapsed = true;

    $scope.collapse = function() {
      $scope.isCollapsed = true;
    };
  });

})(angular);