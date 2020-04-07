const express = require('express')
const router = express.Router();
router.post('/analysis', (req, res, next) => {
  console.log(JSON.parse(JSON.stringify(req.body)));
})

module.exports = router