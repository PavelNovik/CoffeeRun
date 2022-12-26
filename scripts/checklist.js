'use strict';
(function (window) {
  const App = window.App || {};
  const $ = window.jQuery;
  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on(
      'click',
      'input',
      function (e) {
        const email = e.target.value;
        console.log(e);
        // Set input disabled and opacity 50%
        this.disableRow(email);

        // Delete the order after 5 second
        setTimeout(() => {
          this.removeRow(email);
        }, 5000);
        fn(email);
      }.bind(this)
    );
    this.$element.dblclick(function (e) {
      console.log(e);
      console.log('duble click');
    });
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
    this.$element
      .find('[value ="' + email + '"]')
      .closest('[data-coffee-order = "checkbox"]')
      .remove();
  };

  // Function to disable order
  CheckList.prototype.disableRow = function (email) {
    this.$element
      .find('[value ="' + email + '"]')
      .closest('input')
      .prop('disabled', true);
    this.$element
      .find('[value ="' + email + '"]')
      .closest('[data-coffee-order = "checkbox"]')[0].style.opacity = '0.5';
  };

  function Row(coffeeOrder) {
    const $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      class: 'checkbox',
    });
    let textColor = '';
    const $label = $('<label></label>');

    const $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress,
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
    $label[0].style.color = textColor;

    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
