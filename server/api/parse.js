const express = require('express')
const router = express.Router();
router.post('/analysis', (req, res, next) => {
  const { _report_data } = req.body
})

module.exports = router 