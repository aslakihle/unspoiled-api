const { redirect } = require('express/lib/response');
const jwt = require('jsonwebtoken');

exports.jwtAuth = (req, res, next) => {
    const token = req.body.token
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY)
        req.user = user
        next();
    } catch (err) {
        // return res.clearcookie('token')
        return res.status(401).send({ 
          success: false, feedback: 'auth response from jwtAuth'
        });
    }
}