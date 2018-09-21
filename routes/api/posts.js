const express = require('express');
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/', (req, res, next) => {
  res.json({
    'msg': 'Post was working'
  })
})



module.exports = router;