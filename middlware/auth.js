var jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        var token = req.cookies.user
            // console.log(token)

        var decode = jwt.verify(token, 'sangeetapaswan')
        req.userData = decode
            // console.log(decode)

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            message: 'You are not logged '
        })
    }

}