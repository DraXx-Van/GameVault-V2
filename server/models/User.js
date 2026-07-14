const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: ""
    },
    library: [{
        gameId: { type: Number,required: true},
        addedAt: { type: Date, default: Date.now },
        hoursPlayed: { type: Number, default: 0},
        status: {
            type: String,
            enum: ["Playing","Completed","On Hold","Dropped","Plan to Play"],
            default: "Plan to Play"
        },
        rating: { type: Number, min: 1, max: 5 },
        lastPlayed: { type: Date },
    }],
    wishlist: [{
        gameId: { type: Number,required: true},
        addedAt: { type: Date, default: Date.now },
    }],
    
},{timestamps: true});

module.exports = mongoose.model("User",UserSchema);