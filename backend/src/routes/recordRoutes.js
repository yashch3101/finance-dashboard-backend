const express = require("express");
const router = express.Router();

const {
    createRecord,
    getRecords,
    getRecordById,
    updateRecord,
    deleteRecord,
} = require("../controllers/recordController");

const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Create -> Only Admin
router.post("/", protect, authorizeRoles("admin"), createRecord);

// Read -> all users
router.get("/", protect, getRecords);
router.get("/:id", protect, getRecordById);

// Update + Delete -> only Admin
router.patch("/:id", protect, authorizeRoles("admin"), updateRecord);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRecord);

module.exports = router;