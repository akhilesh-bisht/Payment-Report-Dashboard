import { User } from "../models/user.model.js";

// Login or Signup User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if the user exists in the database
    let user = await User.findOne({ email: normalizedEmail });

    // If user doesn't exist, create a new one (sign up)
    if (!user) {
      // Create a new user
      user = new User({
        email: normalizedEmail,
        password,
      });

      // Save the new user to the database
      await user.save();
      console.log("New user created:", user);

      // Generate an access token for the new user
      const accessToken = user.generateAccessToken();

      // Set the access token in the secure cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });

      // Respond with a success message
      return res.status(201).json({
        message: "User created successfully. Welcome!",
        user: { _id: user._id, email: user.email },
        accessToken, // Send the access token back in the response
      });
    }

    // If the user exists, check if the password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate an access token for the existing user
    const accessToken = user.generateAccessToken();

    // Set the access token in the secure cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    // Respond with success
    return res.status(200).json({
      message: "User logged in successfully",
      user: { _id: user._id, email: user.email },
      accessToken,
    });
  } catch (error) {
    console.error("Login/Signup Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout User
export const logoutUser = async (req, res) => {
  try {
    // Clear the access token cookie to log the user out
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    // Respond with success message
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
