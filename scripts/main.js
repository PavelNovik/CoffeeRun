'use strict';
(function (window) {
  const App = window.App;
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const myTruck = new Truck('n3.14', new DataStore());
  window.myTruck = myTruck;
})(window);
