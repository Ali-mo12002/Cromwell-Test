const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type: string,
        required: true
    },
    email:{
        type: string,
        required: true,
        unique: true
    },
    password: {
        type: string,
        required: true
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
  UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
const User = mongoose.model('User', UserSchema);
  
module.exports = User;
