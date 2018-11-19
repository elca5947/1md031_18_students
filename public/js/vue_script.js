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
      Gender: ''
    },
    booleanExpression: boolExp,
    stockArray: stockBurger,
    orders: {}
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
    },
  getNext: function () {
    var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
      return Math.max(last, next);
    }, 0);
    return lastOrder + 1;
  },
  addOrder: function (event) {
    socket.emit("addOrder", { orderId: this.getNext(),
                                details: { x: event.clientX-10 - event.currentTarget.getBoundingClientRect().left,
                                           y: event.clientY-10 - event.currentTarget.getBoundingClientRect().top},
                                orderItems: ["Beans", "Curry"]
                              });
    },
    displayOrder: function (event) {

    }
  }
})
