const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    checkToken: async(req, res, next)=>{
        const token = req.header('auth-token')
        if (!token) {
            return res.status(401).json({
                code: 401,
                message: 'Unauthorized'
            })
        }
        try{
            const verified = jwt.verify(token, process.env.SECRET_KEY)
            req.user = verified
            next()
        } catch(err) {
            res.status(403).json({
                code: 403,
                message: 'Forbidden'
            })
        }
    }
}