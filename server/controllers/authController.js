const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

        res.status(201).json({

            success: true,
            message: "User Registered Successfully",

            user: {

                id: user._id,
                name: user.name,
                email: user.email

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ================= LOGIN =================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,
                message: "Please enter email and password"

            });

        }

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(401).json({

                success: false,
                message: "Invalid Password"

            });

        }

        user.isOnline = true;
        user.lastSeen = new Date();

        await user.save();

        const token = jwt.sign(

            {

                id: user._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                isOnline: user.isOnline,
                createdAt: user.createdAt

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ================= CURRENT USER =================

const getCurrentUser = async (req, res) => {

    res.status(200).json({

        success: true,

        user: req.user

    });

};

// ================= GET PROFILE =================

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user._id)

            .select("-password");

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        res.status(200).json({

            success: true,

            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {

    try {

        const { name, email } = req.body;
        console.log("Incoming Data:", req.body);
        console.log("Current User:", req.user);

        const user = await User.findById(req.user._id);

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found"

            });

        }

        // Check duplicate email only if changing it

        if (email && email !== user.email) {
            console.log("Old Email:", user.email);
            console.log("New Email:", email);

            const existingUser = await User.findOne({ email });

            if (existingUser) {

                return res.status(400).json({

                    success: false,
                    message: "Email already in use"

                });

            }

        }

        const updatedUser = await User.findByIdAndUpdate(

            req.user._id,

            {

                name: name || user.name,

                email: email || user.email

            },

            {

                new: true,
                runValidators: true

            }

        ).select("-password");

        res.status(200).json({

            success: true,

            message: "Profile updated successfully",

            user: updatedUser

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

module.exports = {

    registerUser,
    loginUser,
    getCurrentUser,
    getProfile,
    updateProfile

};