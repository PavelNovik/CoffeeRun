'use strict';
(function (window) {
  const App = window.App;
  const Truck = App.Truck;
  const DataStore = App.DataStore;
  const myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
})(window);
