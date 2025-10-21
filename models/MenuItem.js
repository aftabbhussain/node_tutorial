const mongoose = require('mongoose');

//mongoose.Schema takes definiton (object) as an argument
const MenuItemSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        requied : true
    },
    taste : {
        //taste field will take a string of 3 values only
        type : String,
        enum : ['spicy', 'sour', 'sweet'],
        required : true
    },
    is_drink : {
        type : Boolean,
        required : true
    },
    ingredients : {
        type : [String],
        required : true
    },
    num_sales : {
        type : Number,
        required : true,
        default : 0
    }
});


const MenuItem = mongoose.model('MenuItem', MenuItemSchema);
module.exports = MenuItem;