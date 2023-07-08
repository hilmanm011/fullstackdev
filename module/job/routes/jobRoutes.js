const express = require('express')
const jobRoutes = express.Router()

const { getJobList, getDetailJob } = require('../controllers/jobControllers')

// import middleware
const { checkToken } = require('../../middleware/checkToken')

jobRoutes.get('/list',checkToken, getJobList)
jobRoutes.get('/detail/:id',checkToken, getDetailJob)

module.exports = jobRoutes