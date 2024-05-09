const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ]
});

// Middleware pre que realiza la población automáticamente
cartSchema.pre('findOne', function (next) {
  this.populate('products.product', '_id title price image');
  next();
});

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;