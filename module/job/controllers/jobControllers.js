const { getAllJob, getJobDetail } = require("../helpers/callAPI")


module.exports = {
    getJobList: async(req, res)=>{
        try {
            let query = {}
            const { description, location, full_time, page } = req.query
            if (description) {
                query.description = description
            }
            if (location) {
                query.location = location
            }
            if (full_time) {
                query.full_time = full_time
            }
            if (page) {
                query.page = page
            }

            await getAllJob(query)
            .then((data)=>{
                res.status(200).json({
                    status: 200,
                    query,
                    data
                })
            }).catch((err)=>{
                res.status(400).json({
                    status: 400,
                    message: err.message,
                })
            })

        } catch (err) {
            res.status(500).json({
                code: 500,
                message: 'failed get job list'
            })
        }
    },
    getDetailJob: async(req, res)=>{
        try {
            const { id } = req.params
            const detailJob = await getJobDetail(id)
            res.status(200).json({
                status: 200,
                data: detailJob.data
            })
        } catch (err) {
            res.status(500).json({
                code: 500,
                message: 'failed get detail job'
            })
        }
    }
}