const Order = require("../../../models/order");
const moment = require("moment");
// const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
function orderController() {
  return {
    store(req, res) {
      // console.log(req.body)
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "All fields are required");
        return res.redirect("/cart");
      }
      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        // phone: phone,
        phone,
        // address: address
        address,
      });
      order
        .save()
        .then((result) => {
          Order.populate(result, { path: "customerId" }, (err, placedOrder) => {
            req.flash("success", "Order placed successfully");
            //empty the cart after the order has been placed
            delete req.session.cart;

            // Emit
            const eventEmitter = req.app.get("eventEmitter");
            eventEmitter.emit("orderPlaced", result);

            return res.redirect("/customer/orders");
          });
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      // res.header('Cache-Control', 'no-cache',private,'no-store,must-revalidate,max-stale=0,post-check=0,pre-check-0')
      res.render("customers/orders", { orders: orders, moment: moment });
      // console.log(orders)
    },
    async show(req, res) {
      const order = await Order.findById(req.params.id);
      // Authorize user
      if (req.user._id.toString() === order.customerId.toString()) {
        // return res.render('customers/singleOrder', { order:order })
        return res.render("customers/singleOrder", { order });
      }
      return res.redirect("/");
    },
  };
}
module.exports = orderController;

//to store data in the database we need a collection
//and to create the collection we need to first create the model
