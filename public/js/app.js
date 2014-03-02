(function(angular) {

  var djm = angular.module('djm', ['ui.router', 'ui.bootstrap']);

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

  djm.controller('NavCtrl', function($scope) {
    $scope.isCollapsed = true;
  });

})(angular);