const user = require("../models/user");
const secret = require("../config_details/sectoken");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
   const token = req.headers["x-access-token"];
  
   if (!token)
     return res.json({
       status: 500,
       auth: false,
       message: "No token provided.",
     });
   jwt.verify(token, secret.sectoken(), function (err, decoded) {
     if (err) {
       return res.json({
         status: 500,
         auth: false,
         message: "Failed to authenticate token.",
       });
     }
   
     req.user = decoded.user;
     next();
   });
 }

 module.exports = verifyToken;

