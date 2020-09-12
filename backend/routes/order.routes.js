const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');

router.post('/order', async (req, res) => {
  try {
    const result = new Order({
      order: req.body.order,
      plantsInCart: req.body.plantsInCart,
    });
    result.save();
    if(!result) res.status(404).json({ post: 'Not found' });
    else {res.json(result);}
  }
  catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
