module.exports = function(app) {
  app.directive('unicornFormDirective', function() {
    return {
      restrict: 'AC',
      replace: true,
      templateUrl: 'templates/bear_form_template.html',
      scoep: {
        buttonText: '@',
        headingText: '@',
        formName: '@',
        unicorn: '=',
        save: '&'
      }
    }
  });
};
