import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
import generateToken from "../utils/generateToken.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PROFILE (Protected)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // delete user's recipes also (optional)
    await Recipe.deleteMany({ userId });

    // delete user
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.user._id; // user comes from auth middleware
    const profilePath = "/uploads/" + req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: profilePath },
      { new: true }
    );

    res.json({
      message: "Profile picture updated",
      url: updatedUser.profilePic,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile upload failed" });
  }
};

export const removeProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: null },
      { new: true }
    );

    res.json({
      message: "Profile picture removed",
      url: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove profile picture" });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.username || user.name; // your frontend sends username
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // hashed automatically in pre-save
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
