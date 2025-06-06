var jwt = require('jsonwebtoken')

module.exports.validate = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')
    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1]
    }   
    if (token) {
        jwt.verify(token, 'EngWeb2025', (err, payload) => {
            if (err) {
                return res.status(401).jsonp(err)
            }
            else {
                console.log(payload)
                next()
            }
        })
    }
    else {
        return res.status(401).jsonp({message: 'Token inexistente'})
    }
}

module.exports.validateDocente = (req, res, next) => {
    var token = req.query.token || req.body.token || req.get('Authorization')
    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1]
    }   
    if (token) {
        jwt.verify(token, 'EngWeb2025', (err, payload) => {
            if (err) {
                return res.status(401).jsonp(err)
            }
            else {
                if (payload.level == 'DOCENTE') {
                    next()
                }
                else {
                    return res.status(401).jsonp({message: 'User sem permissão para aceder ao conteúdo'})
                }
            }
        })
    }
    else {
        return res.status(401).jsonp({message: 'Token inexistente'})
    }
}