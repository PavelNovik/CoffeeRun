'use strict';
(function (window) {
  const FORM_SELECTOR = '[data-coffee-order="form"]';
  const App = window.App;
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const FormHandler = App.FormHandler;
  const myTruck = new Truck('n3.14', new DataStore());
  window.myTruck = myTruck;
  const formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  formHandler.addRangeHandler();
  console.log(formHandler);
})(window);
