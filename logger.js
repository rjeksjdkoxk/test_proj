const logger = (req, res, next) => {
    console.log(req.method)
    console.log(req.url)
    console.log(new Date().getDate())
    next()
}

module.exports = logger