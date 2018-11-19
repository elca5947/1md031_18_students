function MenuItem(id, kc, gl, la, veg) {
    this.burgerName = id;
    this.kCal= kc;
    this.glutenExists = gl;
    this.lactoseExists = la;
    this.veganBurger = veg;
    this.stock = 1;
    this.info = function() {
        return this.burgerName + ': ' + this.kCal + ' kCal';
    };
}

var beanBurger = new MenuItem("The Bean Version", 1000, "Yes", "Yes", "No");
var chickpeaBurger = new MenuItem("The Chickpea Version", 1100, "Yes", "Yes", "Yes");
var soyBurger = new MenuItem("The Soy Version", 1200, "Yes", "No", "No");

burgerList = [beanBurger, chickpeaBurger, soyBurger];
burgerInfo = [beanBurger.info(), chickpeaBurger.info(), soyBurger.info()];
boolExp = true;
stockBurger = [ {name: beanBurger.burgerName, stock: beanBurger.stock},
  {name: chickpeaBurger.burgerName, stock: chickpeaBurger.stock},
  {name: soyBurger.burgerName, stock: soyBurger.stock} ];

console.log(beanBurger.info());
