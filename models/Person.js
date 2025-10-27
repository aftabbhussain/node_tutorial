//we are creating a mongoose schema so we need mongoose here
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
});

personSchema.pre('save', async function(next){
    const person = this;

    //hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //override the plain password with this hashed one
        person.password = hashedPassword;

        next();
    }
    catch(err){
        return next(err);
    }
});

//creating a custom personSchema function to compare passwords
//the candidatePassword parameter is passed from the authjs
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the password provided with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}


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