import mongoose from "mongoose";

const AdvertSchema = new mongoose.Schema(
  {
    adType: {
      type: String,
      required: [true, "Please provide ad type"],
      enum: {
        values: ["For Sale", "For Stud", "Wanted", "Rehome"],
        message: "Invalid {PATH} of {VALUE}",
      },
      trim: true,
    },
    breed: {
      type: String,
      required: [true, "Please provide breed"],
      trim: true,
    },
    litterSize: {
      type: Number,
      required: [true, "Please provide litter size"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    sex: {
      type: String,
      trim: true,
      required: [true, "Please provide sex"],
    },
    puppyDOB: {
      type: Date,
      required: [true, "Please provide puppy dob"],
      trim: true,
    },
    puppyDateReadyToLeave: {
      type: Date,
      required: [true, "Please provide puppy date ready to leave"],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide short description"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      trim: true,
    },
    displayMobileNumber: {
      type: String,
      enum: {
        values: ["Yes", "No"],
        message: "{VALUE} is not valid for {PATH}",
      },
      default: "Yes",
    },
    mobileNumber: {
      type: String,
      required: [true, "Please provide mobile number"],
      match: [/^[^A-Za-z]*$/g, "Invalid phone number"],
    },
    microchipped: {
      type: String,
      enum: {
        values: ["Yes", "No"],
        message: "{VALUE} is not valid for {PATH}",
      },
      default: "Yes",
    },
    neutered: {
      type: String,
      enum: {
        values: ["Yes", "No"],
        message: "{VALUE} is not valid for {PATH}",
      },
      default: "No",
    },
    vaccinationUpToDate: {
      type: String,
      enum: {
        values: ["Yes", "No"],
        message: "{VALUE} is not valid for {PATH}",
      },
      default: "Yes",
    },
    kcRegistered: {
      type: String,
      enum: {
        values: ["Yes", "No"],
        message: "{VALUE} is not valid for {PATH}",
      },
      default: "No",
    },
    motherWithPuppies: {
      type: [String],
      default: undefined,
      required: [true, "Please provide photo(s) of mother with puppies"],
    },
    photoOfPuppies: {
      type: [String],
      default: undefined,
      required: [true, "Please provide photo(s) of puppies"],
    },
    videoOfPuppies: {
      type: [String],
      default: undefined,
      required: [true, "Please provide video of puppies"],
    },
    planType: {
      type: String,
      required: [true, "Please provide plan type"],
      enum: {
        values: ["premium", "standard", "premium Plus"],
        message: "Invalid {PATH} of {VALUE}",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "User not provided"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Advert = mongoose.model("Adverts", AdvertSchema);

export default Advert;
