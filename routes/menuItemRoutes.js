const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async (req, res) => {
  try{
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    const savedMenuItem = await newMenuItem.save();
    console.log('MenuItem saved successfully');
    res.status(200).json(savedMenuItem);
  }
  catch(err){
    console.log('Internal server error', err);
    res.status(500).json({
      error : 'Internal server error'
    });

  }
})

router.get('/', async (req, res) => {
  try{
    const data = await MenuItem.find();
    console.log('menu item data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log('Error',err);
    res.status(500).json({
      errorr : 'Inernal Server error'
    })
  }
})

router.get('/:taste', async (req, res) => {
  const taste = req.params.taste;
  if(taste == 'sweet' || taste == 'sour' || taste == 'spicy'){
    try{
      const data = await MenuItem.find({
        taste : taste
      });
      console.log('Data fetched for taste : '+taste);
      res.status(200).json(data);
    }  
    catch(err){
      console.log('Error');
      res.status(500).json({
        errors : 'Internal Server Error'
      });
    } 
  }
  else{
    console.log('Invalid taste');
    res.status(404).json({
      error : 'Invalid Taste'
    });
  }
})

module.exports = router;