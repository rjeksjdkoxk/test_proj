require('dotenv').config()
const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
    console.log('authorizing')

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res
            .status(401)
            .send('pls provide me token')
    }

    const token = authHeader.split(' ')[1]
    console.log(token)

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        // console.log(decoded)
        req._id = decoded._id
        next()

    } catch (e) {
        console.log(e.message)
        res.send('token is not valid')
    }


}

module.exports = authorize