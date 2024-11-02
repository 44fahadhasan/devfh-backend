// External imports
const express = require("express");

// Internal imports
const projectController = require("../controllers/projectController");

// Initialize the router
const router = express.Router();

/**
 * @route   GET /api/projects
 * @desc    Retrieve all projects
 * @access  Public
 */
router.get("/", projectController.getAllProjects);

/**
 * @route   GET /api/projects/overview/:id
 * @desc    Retrieve a single project overview by ID
 * @access  Public
 */
router.get("/overview/:id", projectController.getProjectOverviewById);

/**
 * @route   GET /api/projects/:id
 * @desc    Retrieve a single project by ID
 * @access  Public
 */
router.get("/:id", projectController.getProjectById);

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Public
 */
router.post("/", projectController.createProject);

/**
 * @route   PUT /api/projects/:id
 * @desc    Update an existing project by ID
 * @access  Public
 */
router.put("/:id", projectController.updateProject);

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete a project by ID
 * @access  Public
 */
router.delete("/:id", projectController.deleteProject);

// Export the router
module.exports = router;
