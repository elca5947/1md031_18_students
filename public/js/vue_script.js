'use strict';
var socket = io();

var vm = new Vue({
  el: '#myID',
  data: {
    arbitraryVariableName: 'Select how many burgers you like:',
    menuArray: burgerList,
    infoArray: burgerInfo,
    menu: food,
    pickedBurger: [],
    fullName: '',
    eMail: '',
    streetName: '',
    houseNumber: '',
    paymentMethod: '',
    genderInfo: '',
    orderInfo: {
      Burger: '',
      Name: '',
      Email: '',
      Payment: '',
      Gender: '',
      Location: ''
    },
    booleanExpression: boolExp,
    stockArray: stockBurger,
    orders: { x:'', y:''},
    positionDetails: {}
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    orderDone: function () {

      this.orderInfo.Burger = this.pickedBurger;
      this.orderInfo.Name = this.fullName;
      this.orderInfo.Email = this.eMail;
      this.orderInfo.Payment = this.paymentMethod;
      this.orderInfo.Gender = this.genderInfo;
      this.orderInfo.Location = [this.orders.x, this.orders.y];
    },
  getNext: function () {
    var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
      return Math.max(last, next);
    }, 0);
    return lastOrder + 1;
  },
  displayOrder: function (event) {
    var offset = {x: event.currentTarget.getBoundingClientRect().left,
                  y: event.currentTarget.getBoundingClientRect().top};
    this.orders.x = event.clientX;
    this.orders.y = event.clientY;
    this.positionDetails = { posx: event.clientX - 10 - offset.x,
                             posy: event.clientY - 10 - offset.y };
  },
  addOrder: function () {
    //var offset = {x: event.currentTarget.getBoundingClientRect().left,
    //              y: event.currentTarget.getBoundingClientRect().top};
    var msgX = this.positionDetails.posx;
    var msgY = this.positionDetails.posy;
    socket.emit("addOrder", { orderId: this.getNext(),
                              details: { x: msgX,
                                         y: msgY },
                              orderItems: [this.orders.x, this.orders.y]
                            });
    },
    buttonHandler: function () {
      this.orderDone();
      this.addOrder();
    }
  }
})
