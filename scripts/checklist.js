'use strict';
(function (window) {
  const App = window.App || {};
  const $ = window.jQuery;
  let clickCounter = [];
  let data;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);

    // console.log(this.$element);

    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on(
      'click dblclick',
      'input',
      function (e) {
        clickCounter.push(e.type);
        const email = e.target.value;
        // console.log(e);
        // console.log(email);
        // console.log(e);
        // console.log(e.target);
        // console.log(e.type);
        // console.log(clickCounter);
        // console.log(this);
        // Set input disabled and opacity 50%
        this.disableRow(email);

        // Delete the order after 5 second
        setTimeout(() => {
          if (clickCounter.includes('dblclick')) {
            console.log(`It is DUBLECLICK EVENT`);
            clickCounter = [];
          }
          if (clickCounter.includes('click')) {
            // console.log(this);
            this.removeRow(email);
            clickCounter = [];
            fn(email);
          }
        }, 1000);
      }.bind(this)
    );
  };

  // Set data in form area
  CheckList.prototype.setDataInForm = function (coffeeOrder) {
    // some day this area was filled
  };

  CheckList.prototype.addRow = function (coffeeOrder) {
    // Удаляем все имеющиеся строки, соответствующие данному адресу
    // электронной почты
    this.removeRow(coffeeOrder.emailAddress);

    // Создаем новый экземпляр строки на основе информации о заказе кофе
    const rowElement = new Row(coffeeOrder);

    // Добавляем свойство $element нового экземпляра строки в перечень
    this.$element.append(rowElement.$element);
  };

  // Function to delete row order
  CheckList.prototype.removeRow = function (email) {
    // console.log(this.$element);
    this.$element
      .find('[value ="' + email + '"]')
      .closest('[data-coffee-order = "checkbox"]')
      .remove();
  };

  // Function to disable order
  CheckList.prototype.disableRow = function (email) {
    // this.$element
    //   .find('[value ="' + email + '"]')
    //   .closest('input')
    //   .prop('disabled', true);
    this.$element
      .find('[value ="' + email + '"]')
      .closest('[data-coffee-order = "checkbox"]')
      .css('opacity', '0.5');
  };

  // const getRemoteData = function () {
  //   $.get(`http://localhost:8080/coffeeorders`, function (resp) {
  //     resp.forEach((element) => {
  //       console.log(element);
  //       CheckList.addRow(element);
  //     });
  //   });
  // };

  // getRemoteData();

  function Row(coffeeOrder) {
    const $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      class: 'checkbox',
    });
    let textColor = '';

    const $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress,
      id: 'orderInfo',
    });

    const $label = $('<label></label>', {
      // for: 'orderInfo',
    });

    let description = '[' + coffeeOrder.strength + 'x] ';
    description += coffeeOrder.size + ' ';

    // let description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
      switch (coffeeOrder.flavor) {
        case 'caramel':
          textColor = 'red';
          break;
        case 'almond':
          textColor = 'green';
          break;
        case 'mocha':
          textColor = 'blue';
          break;
        default:
          textColor = textColor;
          break;
      }
    }
    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    // description += ' [' + coffeeOrder.strength + 'x]';
    if (coffeeOrder.secretMenu) {
      description += ' {' + coffeeOrder.secretMenu + '}';
    }

    $label.append($checkbox);
    $label.append(description);
    // console.log($label[0]);
    // $label[0].style.color = textColor;
    $label.css('color', textColor);

    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
