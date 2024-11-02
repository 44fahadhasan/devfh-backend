// External imports
const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const LinkSchema = new Schema(
  {
    linkLabel: {
      type: String,
      required: [true, "Link label is required"],
      trim: true,
      maxlength: [50, "Link label must not exceed 50 characters"],
    },
    url: {
      type: String,
      required: [true, "URL is required"],
      trim: true,
      match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid URL format"],
    },
  },
  { _id: false } // Disables the _id field for Link Schema
);

// ProjectInfo Schema for nested project information
const ProjectInfoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [50, "Title must not exceed 50 characters"],
    },
    listType: {
      type: String,
      enum: {
        values: ["horizontal", "vertical"],
        message: "listType must be either 'horizontal' or 'vertical'",
      },
      default: "vertical",
    },
    lists: {
      type: [
        {
          type: Schema.Types.Mixed, // Allows mixed types in the array
          validate: {
            validator: function (value) {
              // Validation to ensure first item is a string or array of links
              return (
                typeof value === "string" ||
                (Array.isArray(value) &&
                  value.every(
                    (link) =>
                      "linkLabel" in link &&
                      "url" in link &&
                      link instanceof Object
                  ))
              );
            },
            message:
              "Lists must contain either strings or an array of link objects",
          },
        },
      ],
      required: [true, "At least one link is required"],
      validate: {
        validator: (val) => val.length <= 5,
        message: "Links must not exceed 5 items",
      },
    },
  },
  { _id: false } // Disables the _id field for ProjectInfo Schema
);

// Overview Schema for nested project overview
const OverviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Project overview title is required"],
      trim: true,
      maxlength: [300, "Project overview title must not exceed 300 characters"],
    },
    description: {
      type: String,
      required: [true, "Project overview description is required"],
      trim: true,
      maxlength: [1000, "Description must not exceed 1000 characters"],
    },
    ProjectInfos: {
      type: [ProjectInfoSchema],
      required: [true, "Project information is required"],
      validate: {
        validator: (val) => val.length <= 7,
        message: "ProjectInfos must not exceed 7 items",
      },
    },
    links: {
      type: [LinkSchema],
      required: [true, "Links are required"],
      validate: {
        validator: (val) => val.length <= 3,
        message: "Links must not exceed 3 items",
      },
    },
  },
  { _id: false } // Disables the _id field for Overview Schema
);

// Image Schema for nested images
const ImageSchema = new Schema(
  {
    img: {
      type: String,
      required: [true, "Image URL is required"],
      match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid image URL format"],
    },
    label: {
      type: String,
      required: [true, "Image label is required"],
      trim: true,
      maxlength: [300, "Image label must not exceed 300 characters"],
    },
  },
  { _id: false } // Disables the _id field for Image Schema
);

// Main Project Schema with references and validations
const projectSchema = new Schema(
  {
    website_name: {
      type: String,
      required: [true, "Website name is required"],
      trim: true,
      maxlength: [100, "Website name must not exceed 100 characters"],
    },
    website_type: {
      type: String,
      required: [true, "Website type is required"],
      trim: true,
      maxlength: [100, "Website type must not exceed 100 characters"],
    },
    scroll_image_url: {
      type: String,
      required: [true, "Scroll image URL is required"],
      match: [
        /^https?:\/\/[^\s$.?#].[^\s]*$/,
        "Invalid scroll image URL format",
      ],
    },
    overview: {
      type: OverviewSchema,
      required: [true, "Project overview is required"],
    },
    images_url: {
      type: [ImageSchema],
      required: [true, "Images are required"],
      validate: {
        validator: (val) => val.length <= 10,
        message: "Images must not exceed 10 items",
      },
    },
    // Reference to User model for tracking who created the website
    // created_by: {
    //   type: Types.ObjectId,
    //   ref: "User",
    //   required: [true, "Created by field is required"],
    // },
  },
  {
    timestamps: true, // Automatically includes createdAt and updatedAt fields
    versionKey: false, // Disables the __v field for document versioning
  }
);

// Create the Project model
const Project = mongoose.model("Project", projectSchema);

// Export the Project model
module.exports = Project;
