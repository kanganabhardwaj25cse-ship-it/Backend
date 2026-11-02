import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Username or email already exists" });
    }

    const user = await User.create({
        username,
        email:email.toLowerCase(),
        password,
        loggedIn: false,
    });
    res.status(201).json({ 
        message: "User created successfully",
        user: { id: user.id, email: user.email, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check whether email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user in database
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Implementation for logout functionality
        const {email} = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "Logout successful" });

    } 
    catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export {
   registerUser, loginUser, logoutUser};