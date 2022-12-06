'use strict';
(function (window) {
  const App = window.App || {};
  const $ = window.jQuery;
  const range = $('input[type="range"]');
  //   console.log(range);

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }
  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler from form');
    console.log(this.$formElement);
    // console.log(this.$formElement[0][7]);
    this.$formElement.on('submit', function (e) {
      e.preventDefault();

      const data = {};
      $(this)
        .serializeArray()
        .forEach(function (item) {
          data[item.name] = item.value;
          console.log(item.name + ' is ' + item.value);
        });
      console.log(data);
      fn(data);
      this.reset();
      //   console.log(this);
      //   console.log(this.elements);
      this.elements[0].focus();
    });
  };
  FormHandler.prototype.addRangeHandler = function () {
    console.log('Setting range handler from form');
    // console.log(range);
    range.on('change', function (e) {
      e.preventDefault();
      const val = $(this)[0].value;
      const labelText = $(this)[0].labels[1];
      //   console.log($(this));
      //   console.log($(this)[0].value);
      labelText.innerText = val;
      if (val < 33) {
        labelText.style.color = 'green';
      }
      if (val >= 33 && val < 70) {
        labelText.style.color = 'brown';
      }
      if (val >= 70) {
        labelText.style.color = 'red';
      }
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);