const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  plantsInCart: { type: Array, required: true, ref: 'cart' },
  order: {
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    email: { type: String, required: true },
    ulica: { type: String, required: true },
    nrDomu: { type: String, required: true },
    miasto: { type: String, required: true },
    kodPocztowy: { type: String, required: true },
    dodatkoweInfo: { type: String },
  },
});

module.exports = mongoose.model('Order', orderSchema);
