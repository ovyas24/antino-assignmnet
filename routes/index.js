const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")
const {checkAuth, checkAdminAuth} = require('../middleware/check-auth');

router.use("/user", checkAuth, require('./user'))
router.use("/admin", checkAdminAuth, require('./admin'))
router.use('/auth', require('./auth'))

module.exports = router