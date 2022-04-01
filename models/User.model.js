const mongoose = require('mongoose');

const schema= mongoose.Schema;

const userSchema= new schema({
 name:{
     type: String,
     required: true,
 },
 email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password :{
    type:String,
    required: true
},

},
{
    timestamps :true
});
module.exports= Contact =mongoose.model("user",userSchema);

