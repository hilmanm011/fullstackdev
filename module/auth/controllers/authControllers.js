const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const { registerValidation } = require('../helpers/validation');

// import models
const User = require('../models/User')

module.exports = {
    authRegister: async(req, res)=>{
        try {
            
            // validation
            const { error } = registerValidation(req.body)
            if (error) {
                return res.send(error.details[0].message)
            }
            const { fullname, username, password } = req.body

            // check user
            const getUser = await User.findOne( { username: username } )
            if (getUser) {
                return res.status(400).json({
                    status: 400,
                    message: `user already exsist`
                })
            }

            // hash password
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const dataUser = new User({
                fullname, 
                username, 
                password: hashPassword
            })

            const createUser = await dataUser.save()

            res.status(201).json({
                status: 201,
                message: `success`,
                data: createUser
            })
            
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: `failed to register`
            })
        }

    },
    authLogin: async(req, res)=>{
        try {
            const { username, password } = req.body
            const user = await User.findOne( { username: username } )
            if (user) {
                const checkPassowrd = await bcrypt.compare(password, user.password)
                if (!checkPassowrd) {
                    return res.status(400).json({
                        status: 400,
                        message: `wrong password`
                    })
                }

                // Create token JWT
                const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY)

                res.header('auth-token', token).json({
                    status: 200,
                    message: 'login success',
                    token: token
                })

            } else {
                res.status(400).json({
                    status: 400,
                    message: `user not found`
                })
            }
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: `failed to login`
            })
        }
    }
}