require('angular/angular');
var angular = window.angular;

var unicornApp = angular.module('UnicornApp', []);
require('./services/services')(unicornApp);
require('./unicorns/unicorns')(unicornApp);
