const Router        = require('express').Router()
const authRoutes    = require('../module/auth/routes/authRoutes')
const jobRoutes     = require('../module/job/routes/jobRoutes')

Router.use('/auth', authRoutes)
Router.use('/jobs', jobRoutes)

module.exports = Router