'use strict';
(function (window) {
  const App = window.App || {};
  const $ = window.jQuery;
  const range = $('input[type="range"]');

  const size = 'coffezilla';
  const myModal = $('#myModal');
  const secretMenu = document.querySelector('#secret');
  const addMenu = `
                              <label for="secretMenu">Super options</label>
                            <select name="secretMenu" id="secretMenu" class="form-control">
                            <option value="">None</option>
                            <option value="timeTravel">Time Travel</option>
                            <option value="mindControl">Mind Control</option>
                            <option value="goodCode">Good Code</option>
                            </select>
                            
                            `;

  let counter = 0;

  function addMenuIntoHtml() {
    secretMenu.insertAdjacentHTML('beforeend', addMenu);
  }

  function startingView() {
    $('[for="strengthLevel"]').last().css('color', 'green').text('30');
  }
  startingView();

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
    this.$formElement.on('submit', function (e) {
      e.preventDefault();

      const data = {};
      let status = true;
      $(this)
        .serializeArray()
        .forEach(function (item) {
          data[item.name] = item.value;
          // console.log(item.name + ' is ' + item.value);
        });
      if (
        data.flavor &&
        +data.strength === 100 &&
        data.size === size &&
        counter === 0
      ) {
        const userText = `My congratulations!!! Your ${data.flavor} ${data.size} coffee is the best of choise. You can choose the next options for your order!`;
        if (!data.secretMenu) {
          myModal.modal('show');
          document.querySelector('.modal-body p').innerText = userText;
          status = false;
          counter++;
        }
        const btnSubModal = $('.modal-footer .btn').last();

        if (data.emailAddress !== '') {
          btnSubModal.on('click', addMenuIntoHtml);
        }
      }

      if (!status) return;
      console.log(data);
      fn(data);

      this.reset();
      startingView();
      secretMenu.innerHTML = '';
      counter = 0;

      this.elements[0].focus();
    });
  };
  FormHandler.prototype.addInputHandler = function (fn) {
    console.log(`Setting input handler for form`);
    this.$formElement.on('input', '[name="emailAddress"]', function (e) {
      const emailAddress = e.target.value;
      // console.log(fn(emailAddress));
      let message = '';
      if (fn(emailAddress)) {
        $(e.target).setCustomValidity('');
      } else {
        message = emailAddress + ' is not an autorized address!';
        $(e.target).setCustomValidity(message);
      }
    });
  };

  FormHandler.prototype.addRangeHandler = function () {
    range.on('change', function (e) {
      e.preventDefault();
      const val = $(this)[0].value;
      const labelText = $(this)[0].labels[1];

      labelText.innerText = val;
      if (val < 33) {
        labelText.style.color = 'green';
      }
      if (val >= 33 && val < 70) {
        labelText.style.color = 'yellow';
      }
      if (val >= 70) {
        labelText.style.color = 'red';
      }
    });
  };
  App.FormHandler = FormHandler;
  window.App = App;
})(window);
