

import jwt from 'jsonwebtoken';



// it works
function verifyToken(req, res, next) {
    try {
        //const token = req.cookies?.token;
        const token = req.cookies?.access_token; 

        console.log("Go To Dasboard button", token)
        console.log("This is the token from the Browser ======> ", token); 
        
         if (!token) {
            console.log(" 111 No token found, user is not authenticated."); // If there is no token (access_token)
            return res.status(401).json({ message: "Please Login...!", error: true, success: false });
        }

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                console.log(" 222 Token verification failed:", err.message); // for Verification errors
                return res.status(403).json({ message: "Token is invalid", error: true, success: false });
            }


            console.log("Token verified successfully. Decoded user ID:", decoded._id); // Decoded user _id

               //ORIGINAL req.userId = decoded._id;

               // Sending the token and userId back as a response
               req.userId = decoded._id; // Storing user _id for future use
               res.locals.token = token; // Storing access_token to send it later if needed

               req.userName = decoded.name; // onlinename

            next();
        });
    } catch (err) {
        console.log(" 333 An error occurred:", err.message); // Unexpected errors
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}
export default verifyToken