const express = require('express');
const app = express();

//import dotenv file to this server.js file
require('dotenv').config();

//we establish the database connection earlier in the server file
//db.js is returning a database connenction which is defined in db.js file, also the connection is stored in db object
//now all the database operations in server.js file will be done in db
const db = require('./db');

//importing the Person mongoose model from person.js which we will require to handle db operations to the collection people
//person.js returns a mongoose model upon importing, so Person here will be the actual mongoose model

const MenuItem = require('./models/MenuItem');

//importing body-parser and storing it in the constant variable bodyParser
const bodyParser = require('body-parser');
//this adds the json method of bodyParser to express, now the incoming json data is automatically parsed into JS object and stored in req.body
app.use(bodyParser.json());


//Middle ware to log all the requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to ${req.originalUrl}`);
    next(); //this is crucial, it must be called to let to coninute the request reponse cycle
}
//.use method of express application object sets up middlewares that run for every incoming request
app.use(logRequest)

const passport = require('./auth');
app.use(passport.initialize());

//setting up the authentication middleware on the '/' port so when a client request cones 
//to that port passport will authenticate it
const localAuthMiddleware = passport.authenticate('local', {session : false});
app.get('/', (req, res) => {
    res.send('Welcome to hotel');
});

//import the person router files
const personRoutes = require('./routes/personRoutes');
app.use('/person', localAuthMiddleware, personRoutes);

//import the menuItem router files
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu',  menuItemRoutes); //we also authenticate this end point using passport

//if the port is defined on dotenv then take that or 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('server is listening on port 3000');
});

//endpoints

// app.post('/person', async (req, res) => {
//     try{
//       //since we are using body parser to handle incoming HTTP data which stores the data in object format in req.body
//       const data = req.body;

//       //creating a new Person object using the data recieved from client which is of type Person
//       const newPersonObj = new Person(data);

//       //save the newPersonObj to the database defined by db.js in the document defined by Person
//       //since this is a database operation we need to wait until the promise is resolved so we are using await keyword here and hence the call back is an async function
//      const savedPerson = await newPersonObj.save();
//      //if the data is saved successfull log "data saved" and set response status to 200 and return response data in json format and the data here is the saved object
//      console.log('data saved');
//      res.status(200).json(savedPerson);
//     }
//     catch(err){
//       //if there is error it try will return from const savedPerson line and the error will be passed in err, we will set response status to 500 and return response
//       //in json format which is error : 'Inernal server error'
//       console.log(err);
//       res.status(500).json({
//         error: 'Internal server error'
//       });
//     }

// })

//endpoint to get all the person data from the database
//all the data of the person from the data base will be sent as the response
// app.get('/person', async (req, res) => {
//   try{
//     const data = await Person.find();
//     console.log('Data fetched');
//     res.status(200).json(data);
//   }
//   catch(err){
//     console.log('error');
//     res.status(500).json({
//       error : 'Internal server error'
//     });
//   }
// });



// app.post('/menu', async (req, res) => {
//   try{
//     const data = req.body;
//     const newMenuItem = new MenuItem(data);

//     const savedMenuItem = await newMenuItem.save();
//     console.log('MenuItem saved successfully');
//     res.status(200).json(savedMenuItem);
//   }
//   catch(err){
//     console.log('Internal server error', err);
//     res.status(500).json({
//       error : 'Internal server error'
//     });

//   }
// })

// app.get('/menu', async (req, res) => {
//   try{
//     const data = await MenuItem.find();
//     console.log('menu item data fetched');
//     res.status(200).json(data);
//   }
//   catch(err){
//     console.log('Error',err);
//     res.status(500).json({
//       errorr : 'Inernal Server error'
//     })
//   }
// })

//parameterized API endpoint calls
// app.get('/person/:workType', async (req, res) => {
  
//   try{
//     const workType = req.params.workType;
//     if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
//       const data = await Person.find({
//         work : workType
//       });
//       console.log('data fetched for ', workType);
//       res.status(200).json(data);
//     }
//     else{
//       res.status(404).json({
//         errorr : 'Invalid work type'
//       });
//     }
//   }
//   catch(err){
//     console.log('error');
//     res.status(500).json({
//       erorr : 'Internal Server Error'
//     });
//   }
// });

// app.listen(3000, () => {
//     console.log('server is listening on port 3000');
// });

// //importing express and storing the express function in app variable
// const express = require('express');
// const app = express();
// //these are the various get endpoints which we define
// app.get('/', (req, res) => {
//   res.send('Hello World')
// })
// app.get('/idli', (req, res) =>{
//     res.send('Welcome to south indiaa');
// })
// app.post('/items', (req, res) => {
//   res.send('data sent successfully');
// })

// //this defines the port where our sever is listening to all the requests
// //we can also pass a callback function to listen method
// app.listen(3000, () => {
//     console.log('server is listening on port 3000');
// });



// // const express = require('express');
// // const notess = require('./notes');

// // notess.addd(3,5);

// //converting a json data string to js object
// const datastring = '{"name" : "Aftab", "age" : 19}';
// const dataobj = JSON.parse(datastring);
// console.log(dataobj.age);

// //converting a js object to json format
// const objectT0Convert = {
//     name: "Alice",
//     age: 25
// }
// const objjson = JSON.stringify(objectT0Convert);
// console.log(objjson);
// console.log(typeof objjson); // string

