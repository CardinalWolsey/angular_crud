module.exports = function(app) {
  require('./controllers/unicorns_controller')(app);
  require('./directives/unicorn_form_directive')(app);
};
