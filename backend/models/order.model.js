const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  plantsInCart: { type: Array, required: true, ref: 'cart' },
  order: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true },
    addInfo: { type: String },
  },
});

module.exports = mongoose.model('Order', orderSchema);
