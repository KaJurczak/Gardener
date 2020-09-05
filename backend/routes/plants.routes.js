const express = require('express');
const router = express.Router();

const Plant = require('../models/plant.model');

router.get('/plants', async (req, res) => {
  try {
    const result = await Plant
      .find()
      .select('polishName photo price');
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/plants/:id', async (req, res) => {
  try {
    const result = await Plant
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else {res.json(result); console.log('req.param', req.params.id);}
  }
  catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
