'use strict';
(function (window) {
  const App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    return this.db.add(order.emailAddress, order);
  };
  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  };
  // Truck.prototype.printOrders = function () {
  Truck.prototype.printOrders = function (printFn) {
    return this.db.getAll().then(
      function (orders) {
        const customerIdArray = Object.keys(orders);
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(
          function (id) {
            console.log(orders[id]);
            if (printFn) {
              printFn(orders[id]);
            }
          }.bind(this)
        );
      }.bind(this)
    );
    // const customerIdArray = Object.keys(this.db.getAll());
    // console.log('Truck #' + this.truckId + ' has pending orders:');
    // customerIdArray.forEach(
    //   function (id) {
    //     console.log(this.db.get(id));
    //   }.bind(this)
    // );
  };

  App.Truck = Truck;
  window.App = App;
})(window);
