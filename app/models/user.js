/**
 * Created by abhi on 10-Feb-18.
 */
const mongoose = require('mongoose');             // Import Mongoose Package
const Schema   = mongoose.Schema;                 // Assign Mongoose Schema function
const bcrypt   = require('bcrypt-nodejs');        // Import Bcrypt Package
const titlize  = require('mongoose-title-case');  // Import Mongoose Title Case Plugin


// User Mongoose Schema
const UserSchema = new Schema({
    name            :    { type: String,  required: true},
    password        :    { type: String,  required: true, select: false },
    email           :    { type: String,  required: true , unique: true },
    username        :    { type: String,  required: true }

});

// Middleware to ensure password is encrypted before saving user to database
UserSchema.pre('save', function(next) {
    const user = this;

    // Function to encrypt password
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err)
            return next(err);   // Exit if error is found
        user.password = hash;   // Assign the hash to the user's password so it is saved in database encrypted
        next();                 // Exit Bcrypt function
    });
});

// Mongoose Plugin to change fields to title case after saved to database (ensures consistency)
UserSchema.plugin(titlize, {
    paths: ['name']
});

// Method to compare passwords in API (when user logs in)
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
};

module.exports = mongoose.model('User', UserSchema); // Export User Model for us in API
