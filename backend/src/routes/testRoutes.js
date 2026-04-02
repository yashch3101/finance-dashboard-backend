const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require("../middlewares/authMiddleware");

// Only logged in users can access this route
router.get("/protected", protect, (req, res) => {
    res.json({
        message: "Protected route accessed successfully",
        user: req.user,
    });
});

// Only admin users can access this route
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
    res.json({
        message: "Admin route accessed successfully",
    });
});

module.exports = router;