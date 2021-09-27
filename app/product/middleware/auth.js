const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {

    try{
        const token = req.headers.authorization.split(' ')[1];

        if(token == undefined || token.length<0){
            return  res.send({ 
                success: false,
                message: 'boss, seems token is not detected' });
        }

        const decoded = jwt.verify(token, 'somesecret');
        req.adminID = decoded.admin;
        next();
    }
    catch(error){
        return res.send({ 
            sucess: false,
            message: 'Invalid token passed' });
    }
}