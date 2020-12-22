import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
      type: String, 
      required: [true, "First name is required"]
  },
  lastName:{
    type: String, 
    required: [true, "Last name is required"]
},
email: {
    type: String,
    unique:true,
    required: [true, "Email is required"]
},
  password: {
    type: String, 
    required: [true, "Password is required"]
},
});

export const User = mongoose.model('User', userSchema)
