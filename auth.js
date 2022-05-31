const jwt = require('jsonwebtoken');
const User = require('./models/users')

module.exports = async(request, response,next) => {
    const bearerHeader = request.headers['authorization'];

    if(bearerHeader)
    {
        const token = bearerHeader.split(' ')[1];
        await jwt.verify(token, 'EyAlon#1701', (error,goodtoken) =>{
            if(error)
            {
                console.log("error: " + error)
                return response.sendStatus(403);
            }
            User.findAll({where: {email: goodtoken}})
            .then(users => {
                if(users[0])
                {
                    request.user = users[0];
                    next();
                }
                else{
                    return response.sendStatus(403);
                }
            })
            .catch(err => {
                return response.status(403).json({
                    message: err
                })
            })
        })
    }
    else
    {
        return response.sendStatus(403);
    }
}