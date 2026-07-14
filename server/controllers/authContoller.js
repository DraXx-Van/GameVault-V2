const User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

module.exports.registerUser = asyncHandler(async ( req,res ) => {
    const { username,email,password } = req.body;
    
    if(!username || !email || !password ){
        throw new AppError("Please fill all the fields",400);
    }
    
    const existingUser = await User.findOne({
        $or: [{email},{username}]
    });

    if(existingUser){
        throw new AppError("User already exists",400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    if(newUser){
        const token = jwt.sign({ id: newUser._id },process.env.JWT_SECRET,{
            expiresIn: "30d"
        });

        res.status(200).json({message: "account created succesfully", user: {
            id:newUser._id,
            username,
            email,
            token
        }});
    }
}) 

module.exports.loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new AppError("Fill all details", 400);
    }

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({
            user: {
                username,
                email: user.email,
                token,
                id: user._id
            }
        });
    } else {
        throw new AppError("Invalid username or password", 401);
    }
});