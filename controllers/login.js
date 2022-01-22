require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const {username, password} = req.body

    if (!username) {
        return res.send('pls provide username')
    }

    const user = await User.findOne(
        {username}
    )

    if (!user) {
        return res.send('user does not exist')
    }

    if (!password) {
        return res.send('pls provide password')
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        return res.send('password is not correct')
    }

    const token = jwt.sign({
            _id: user._id
        },
        process.env.JWT_SECRET
    )

    res.send(
        {
            token,
            msg: 'login success'
        }
    )
}

const register = async (req, res) => {
    const {username, password} = req.body;
    console.log(process.env.BCRYPT_SALT)
    const user = await User.create(
        {
            username,
            password: await bcrypt.hash(password, +process.env.BCRYPT_SALT)
        }
    ).catch(reason => {
        res.send(reason.message)
    })

    res.send('user registered success')

}

const secret = async (req, res) => {
    const user = await User.findById(req._id)
        .catch(
            reason => {
                res.send(reason.message)
            }
        )

    if (!user) {
        return res.send('user expired')
    }

    res.send('welcome to secret page')

}

module.exports = {
    login,
    secret,
    register
}