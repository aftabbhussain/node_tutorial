//we are creating a mongoose schema so we need mongoose here
const mongoose = require('mongoose');


//define the  Person schema using mongoose
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    work : {
        type : String,
        enum : ['chef', 'waiter', 'manager'],
        required : true
    },
    mobile : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    username : {
        required : true,
        type : String
    },
    password : {
        requierd : true,
        type : String
    }


})

//now using the Person schema that we defined earlier, we are creating a mongoose model

//While you can name the variable anything you want when you import it (const MyHuman = require(...)), 
// the string argument 'Person' is the unique, non-negotiable identifier Mongoose uses for its core operations, 
// like linking data and naming the collection.

//if we change this string, when we save data a new collection will be created with this name's plural and the data will be saved there
//in short this is the name mongoose uses to uniquely identify a collection
const Person = mongoose.model('Person', personSchema);

//exporting the mongoose model
module.exports = Person;

//this person.js file returns a mongoose model