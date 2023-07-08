const axios = require('axios')

const getAllJob = (searchParams)=>{
    return new Promise((resolve, reject)=>{
        const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json`
        
        axios.get(url, {
            params: searchParams
        })
        .then(function (response) {
            const result = {
                message: 'success get all job',
                data: response.data
            }
            resolve(result)
        })
        .catch(function (err) {
            reject({
                message: err.message || 'internal server error',
            })
        })
    })  
}

const getJobDetail = (id)=>{
    return new Promise((resolve, reject)=>{
        const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
        axios.get(url)
        .then((response) => {
            const result = {
                message: 'success get detail job',
                data: response.data
            }
            resolve(result)
        }).catch((err) => {
            reject({
                message: err.message || 'internal server error',
            })
        });
    })

}

module.exports = {
    getAllJob,
    getJobDetail
}