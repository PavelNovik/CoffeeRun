'use strict';
(function (window) {
  var App = window.App || {};
  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@bignerdranch\.com$/.test(email);
    },
  };
  App.Validation = Validation;
  window.App = App;
})(window);
