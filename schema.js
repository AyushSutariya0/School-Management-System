const mongoose= require("mongoose");
const validator=require("validator");
const Schema=mongoose.Schema;


const newstudent={
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value))throw new Error("email is invalid");
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<4)throw new Error("password is not enough long");
        }
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length>10)throw new Error("phone no is longer than 10 digit");
        }
    },
    date:{
        type:Date,
        required:true,
    },
    gender:{
        type:String,
    }
}

const studentform1= new Schema(newstudent);
const studentform= mongoose.model("studentform",studentform1);

module.exports=studentform;