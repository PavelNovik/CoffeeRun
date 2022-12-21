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

    CheckList.prototype.addRow = function (coffeeOrder) {
        // Создаем новый экземпляр строки на основе информации о заказе кофе
        const rowElement = new Row(coffeeOrder);

        // Добавляем свойство $element нового экземпляра строки в перечень
        this.$element.append(rowElement.$element);
    };

    function Row(coffeeOrder) {
        const $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox',
        });
        const $label = $('<label></label>');

        const $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        const description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;

    }

    App.CheckList = CheckList;
    window.App = App;
})(window);
