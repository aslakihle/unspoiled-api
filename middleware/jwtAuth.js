const { redirect } = require('express/lib/response');
const jwt = require('jsonwebtoken');

exports.jwtAuth = (req, res, next) => {
    const authHeader = req.headers['authorization']
    try {
        // console.log(token)
        const split = authHeader.split(' ');
        const token = split[1];
        const user = jwt.verify(token, process.env.SECRET_KEY)
        req.user = user
        next();
    } catch (err) {
        // return res.clearcookie('token')
        return res.status(401).send({ 
          success: false, feedback: 'Token '
        });
    }
}