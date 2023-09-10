/**
 * This module contains authentication and session functions
 */

// import JWT
const jwt = require('jsonwebtoken');

// import the env variables
require('dotenv').config();

// import DB function
const { getUserByUsernameAndPwd } = require('../DbOperations');

/**
 * Create a JWT containing the username
 * @param {*} userid 
 * @returns the token
 */
const authenticateUser = (username, password) => {

    try{
        console.log("in authenticate user");
        const token = jwt.sign({username: username, password: password}, "WeRecycleIt123", {expiresIn: '120s'});
        console.log('token', token);
        return token;
    }catch(err){
        console.log('error', err.message);

    }
}

/**
 * Verify a token. Check if the user is valid
 * @param {*} token 
 * @returns true if the user is valid
 */
const verifyUser = async (token) =>{
    try{
        // decoded contains the paylod of the token
        const decoded = jwt.verify(token, process.env.KEY);
        console.log('payload', decoded);
        // check that the payload contains a valid user
        const user = await getUserByUsernameAndPwd(decoded.username, decoded.password);
        console.log("verified user", user);
        if(user === null){
            // user is undefined
            return false;
        }
        return true;
    }catch(err){
        // invalid token
        console.log('error', err.message);
        return false;
        
    }
}
module.exports = { authenticateUser, verifyUser }