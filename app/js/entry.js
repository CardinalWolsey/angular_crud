require('angular/angular');
var angular = window.angular;

var unicornApp = angular.module('UnicornApp', []);
require('./unicorns/unicorns')(unicornApp);
