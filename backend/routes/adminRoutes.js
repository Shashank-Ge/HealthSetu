const express = require('express');
const adminProtect = require('../middleware/adminProtect');
const router = express.Router();

router.get('/admin-dashboard', adminProtect, (req, res) => {
  res.json({ message: `Welcome Admin ${req.admin.id}` });
});

module.exports = router;
