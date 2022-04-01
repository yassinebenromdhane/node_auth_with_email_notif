const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization").split(' ')[1]
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
            console.log('token',token);
            console.log('user',user);
            console.log('pros',process.env.ACCESS_TOKEN_SECRET);
            if(err) return res.status(400).json({msg: "Invalid Authentication1"})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const auth1 = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log('pros',process.env.ACCESS_TOKEN_SECRET);
      const userId = decodedToken._id;
      if (req.body.userId && req.body.userId !== userId) {
        throw 'Invalid user ID';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };

module.exports = {auth , auth1}