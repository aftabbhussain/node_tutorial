//since we are creating route handlers using express so we need to import express here
const express = require('express');

const Person = require('./../models/Person');
//.Router is a express method which handles routes, so we save this function in const variable router
const router = express.Router();

router.post('/', async (req, res) => {
    try{
      //since we are using body parser to handle incoming HTTP data which stores the data in object format in req.body
      const data = req.body;

      //creating a new Person object using the data recieved from client which is of type Person
      const newPersonObj = new Person(data);

      //save the newPersonObj to the database defined by db.js in the document defined by Person
      //since this is a database operation we need to wait until the promise is resolved so we are using await keyword here and hence the call back is an async function
     const savedPerson = await newPersonObj.save();
     //if the data is saved successfull log "data saved" and set response status to 200 and return response data in json format and the data here is the saved object
     console.log('data saved');
     res.status(200).json(savedPerson);
    }
    catch(err){
      //if there is error it try will return from const savedPerson line and the error will be passed in err, we will set response status to 500 and return response
      //in json format which is error : 'Inernal server error'
      console.log(err);
      res.status(500).json({
        error: 'Internal server error'
      });
    }

});

router.get('/', async (req, res) => {
  try{
    const data = await Person.find();
    console.log('Data fetched');
    res.status(200).json(data);
  }
  catch(err){
    console.log('error');
    res.status(500).json({
      error : 'Internal server error'
    });
  }
});

router.get('/:workType', async (req, res) => {
  
  try{
    const workType = req.params.workType;
    if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
      const data = await Person.find({
        work : workType
      });
      console.log('data fetched for ', workType);
      res.status(200).json(data);
    }
    else{
      res.status(404).json({
        errorr : 'Invalid work type'
      });
    }
  }
  catch(err){
    console.log('error');
    res.status(500).json({
      erorr : 'Internal Server Error'
    });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id; //id is passed through the URL
  try{
    //fetch the json data sent by the HTTP request from body
    const data = req.body;
    const response = await Person.findByIdAndUpdate(id, data, {
      runValidators : true, //run mongoose validators
      new : true //return the updated person data to the response not the original
    });

    //if id is not matched to any person data, response will be NULL
    if(!response){ 
      return res.status(404).json({
        error : 'Person not found'
      })
    }
    console.log('data updated');
    res.status(200).json(response);
  } 
  catch(err){
    console.log(err);
    res.status(500).json({
      error : 'Internal Server error'
    });
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try{
    const response = await Person.findByIdAndDelete(id);

    if(!response){
      console.log('Person not found');
      return res.status(404).json({
        error : 'Person Not Found'
      });
    }
    console.log('Data Deleted');
    res.status(200).json(response);


  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error : 'Internal Server error'
    });
  }
})

module.exports = router;