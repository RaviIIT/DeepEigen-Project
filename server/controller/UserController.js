const userModel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// login callback
const loginController = async (req, res) => {
  console.log("reached loginController");
  try {
    const user = await userModel.findOne({ email: req.body.email });
    
    if (!user) {
      return res
        .status(400)
        .send({ message: "User not found", success: false });
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      console.log("password is mismatched");
      return res
        .status(200)
        .send({ message: "Invalid email or Password", success: false });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;
    return res
      .status(200)
      .send({ message: "Login Success", success: true, token,userid:userId });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(400)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    return res
      .status(201)
      .send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
