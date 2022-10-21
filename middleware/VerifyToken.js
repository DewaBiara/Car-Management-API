import jwt from "jsonwebtoken";
 
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.user = { 
                userId : decoded.userId,
                name   : decoded.name,
                email  : decoded.email,
                role  : decoded.role
        }
        req.email = decoded.email;
        req.roles = decoded.roles;
        req.name = decoded.name;
        next();
    })
}