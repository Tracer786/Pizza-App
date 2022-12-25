function homeController() {
  //factory functions - pattern for writing functions
  //it is general object creation

  //if we want to fetch the data we need the model
  const Menu = require("../../models/menu");
  return {
    //grouping methods
    //index is the key
    // index(req, res) {
    async index(req, res) { //to use with await


      // This was one method to fetch the data

      // Menu.find().then(function (pizzas) {
      //   // find method is used to fetch all the data
      //   //then executes when data is received

      //   console.log(pizzas)

      //   return res.render("home", { pizzas: pizzas });
      //   //first pizzas is the key
      //   //and we are passing the pizzas of the functio to this key which is an array of objects
      // })


      //The other way is 

      const pizzas = await Menu.find()
      //for using await the function must be asynchronous
      // console.log(pizzas)
      return res.render("home", { pizzas: pizzas })


    }
  }
}

module.exports = homeController;
