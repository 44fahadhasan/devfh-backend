// Internal imports
const Project = require("../models/Project");

/**
 * @route   GET /api/projects
 * @desc    Retrieve all projects
 * @access  Public
 */
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().select(
      "website_name website_type scroll_image_url"
    );

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch projects" });
  }
};

/**
 * @route   GET /api/projects/overview/:id
 * @desc    Retrieve a single project overview by ID
 * @access  Public
 */
exports.getProjectOverviewById = async (req, res) => {
  try {
    const overview = await Project.findById(req.params.id).select(
      "overview website_name"
    );

    if (!overview) {
      return res
        .status(404)
        .json({ success: false, message: "Project overview not found" });
    }

    res.status(200).json({ success: true, data: overview });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID format" });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to fetch project overview" });
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Retrieve a single project by ID
 * @access  Public
 */
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID format" });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to fetch project" });
  }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Public
 */
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create project" });
  }
};

/**
 * @desc    Update an existing project by ID
 * @route   PUT /api/projects/:id
 * @access  Public
 */
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Validate before updating
    });

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID format" });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to update project" });
  }
};

/**
 * @desc    Delete a project by ID
 * @route   DELETE /api/projects/:id
 * @access  Public
 */
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid project ID format" });
    }

    res
      .status(500)
      .json({ success: false, message: "Failed to delete project" });
  }
};
