import { User } from "../models/index.js";
import { StatusCodes } from "http-status-codes";

const login = async function (req, res) {
  const data = req.body;
  const numOfKeys = Object.keys(data).length;
  if (numOfKeys === 0 || !data.email || !data.password)
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      status: StatusCodes.BAD_REQUEST,
      message: "Email and Password required",
    });

  const user = await User.findOne({ email: data.email });
  if (!user)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      status: StatusCodes.UNAUTHORIZED,
      message: "Invalid Email or Password",
    });
  // Validate the password using the document method (validatePassword)
  /**
   * @function
   * @argument password @type String
   * @returns @type Boolean
   */
  const isValidPassword = await user.validatePassword(data.password);
  if (!isValidPassword)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      status: StatusCodes.UNAUTHORIZED,
      message: "Invalid Email or Password",
    });
  // Generate jwt for valid email and password
  const { _id, email, phoneNumber, accountType, firstName, lastName, country } =
    user;
  const accessToken = user.generateToken({ userId: _id, email, phoneNumber });
  return res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: "Login successful",
    user: {
      userId: _id,
      email,
      phoneNumber,
      accountType,
      firstName,
      lastName,
      country,
    },
    accessToken,
  });
};

const register = async function (req, res) {
  const data = req.body;
  const numOfKeys = Object.keys(data).length;
  if (numOfKeys === 0)
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: true,
      status: StatusCodes.BAD_REQUEST,
      message: "Provide all fields",
    });
  const newUser = await User.create(data);
  const { _id, email, phoneNumber, accountType, firstName, lastName, country } =
    newUser;
  const accessToken = newUser.generateToken({
    userId: _id,
    email,
    phoneNumber,
  });
  return res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: "Account created successfully",
    user: {
      userId: _id,
      email,
      phoneNumber,
      accountType,
      firstName,
      lastName,
      country,
    },
    accessToken,
  });
};

export { login, register };
