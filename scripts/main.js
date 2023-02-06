'use strict';
(function (window) {
  const FORM_SELECTOR = '[data-coffee-order="form"]';
  const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  const SERVER_URL = 'http://localhost:8080/coffeeorders';
  const App = window.App;
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const RemoteDataStore = App.RemoteDataStore;
  const FormHandler = App.FormHandler;
  const Validation = App.Validation;
  const CheckList = App.CheckList;
  const remoteDS = new RemoteDataStore(SERVER_URL);
  const webshim = window.webshim;
  // const myTruck = new Truck('n3.14', new DataStore());
  const myTruck = new Truck('n3.14', remoteDS);
  window.myTruck = myTruck;
  const checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  const formHandler = new FormHandler(FORM_SELECTOR);

  // formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  formHandler.addSubmitHandler(function (data) {
    // получив значение константы data мы вызываем функцию и методом call вызываем две дополнительные функции
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms', {
    addValidators: true,
    lazyCustomMessages: true,
  });
  formHandler.addRangeHandler();
  // console.log(formHandler);
})(window);
