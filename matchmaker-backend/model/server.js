/**
 * Express webserver / controller
 */

// Import Express
const express = require('express');

// Import the cors -cross origin resource sharing- module
const cors = require('cors');

// Create a new express app
const webapp = express();

// Enable cors
webapp.use(cors());

// Configure express to parse request bodies
webapp.use(express.urlencoded({extended: true}));

// Import the db function
const dbLib = require('./DbOperations');
const { authenticateUser, verifyUser } = require('./utils/auth');

// Import the favorites functions
// const favoriteAPI = require('./FavoritesDb')

// Root endpoint route
webapp.get('/', (req, resp) =>{
    resp.status(201).json({message: 'Root endpoint route for Matchmaker'})
});

/**
 * Login endpoint
 * The name is used to log in
 */
webapp.post('/login', async (req, resp)=>{
  // check that the name was sent in the body
  if(!req.body.username || req.body.username==='' || !req.body.password || req.body.password===''){
    console.log("checking valid username");
    resp.status(401).json({error: 'Missing username and or password'});
    return;
  }
  
  // authenticate the user
  try{
    // console.log("above token");
    // console.log("req.body", req.body);
    const user = await dbLib.getUserByUsernameAndPwd(req.body.username, req.body.password);
    console.log("user",user);
    if (user === null) {
      resp.status(401).json({error: 'You are not registered'});
      return;
    }
    // const token = authenticateUser(req.body.username, req.body.password);
    // console.log("token", token);
    // if (!verifyUser(token)) {
    //   console.log("i do not have a token with valid credentials");
    //   resp.status(401).json({error: 'Incorrect username and or password'});
    // } 
    resp.status(201).json({data: user});
  } catch(err){
    resp.status(401).json({error: 'Incorrect username and or password'});

  }
});

/**
 * Route implementation GET /users
 */
webapp.get('/users', async (req, resp)=>{
    try{
        // get the data from the DB
        const users = await dbLib.getUsers();
        // send response
        resp.status(200).json({data: users});
    } catch(err){
        // send the error code
        resp.status(400).json({message: 'There was an error.'});
    }
});

webapp.get('/users/profiles/:username', async (req, resp)=>{
    console.log('READ a user by username');
    try{
        // get the data from the DB
        const results = await dbLib.getUserByUsername(req.params.username);
        if (results === undefined) {
            resp.status(404).json({ error: 'Unknown student' });
            return;
          }
          // send the response with the appropriate status code
          resp.status(200).json({ data: results });
    } catch(err){
        // send the error code
        resp.status(400).json({message: 'There was an error.'});

    }
});

/**
 * Route implementation GET /users/${email}
 */
webapp.get('/userEmails/:email', async (req, resp)=>{
    console.log('READ a user by email');
    try{
        // get the data from the DB
        const results = await dbLib.getUserByEmail(req.params.email);
        if (results === undefined) {
            resp.status(404).json({ error: 'Unknown student' });
            return;
          }
          // send the response with the appropriate status code
          resp.status(200).json({ data: results });
    } catch(err){
        // send the error code
        resp.status(400).json({message: 'There was an error.'});

    }
});

/**
 * Route implementation GET /users/:id
 */
webapp.get('/users/:id', async (req, res) => {
    try {
      // get the data from the db
      const results = await dbLib.getUserById(req.params.id);
      if (results === undefined) {
        res.status(404).json({ error: 'Unknown user' });
        return;
      }
      // send the response with the appropriate status code
      res.status(200).json({ data: results });
    } catch (err) {
      res.status(404).json({ message: 'There was an error.' });
    }
  });


/**
 * route implementation POST /users
 */
webapp.post('/users', async (req, resp) =>{
    // parse the body
    console.log(req.body);
    if(!req.body.name || !req.body.email || !req.body.username || !req.body.password){
        resp.status(404).json({message: 'Missing name, email, username or password in the body'});
        return;
    }
    try{
        // create the new user object
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }
        console.log(newUser.name);
        const result = await dbLib.addUser(newUser);
        resp.status(201).json({data: {id: result}});

    }catch(err){
        resp.status(400).json({message: 'There was an error'});
    }

});

/**
 * Route implementation DELETE /users/:id
 */
webapp.delete('/users/:id', async (req, res) => {
    try {
      const result = await dbLib.deleteUser(req.params.id);
      if (result.deletedCount === 0) {
        res.status(404).json({ error: 'User not in the system' });
        return;
      }
      // send the response with the appropriate status code
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(400).json({ message: 'There was an error.' });
    }
  });

  
/**
 * Route implementation PUT /users/:id
 */
  webapp.put('/users/:id/:newUsername', async (req, res) => {
    try {
      const oldUsername = decodeURIComponent(req.params.id)
      const newUsername = decodeURIComponent(req.params.newUsername)
      console.log(`New username: ${newUsername}`);
      const result = await dbLib.updateUsername(oldUsername, newUsername);
      // send the response with the appropriate status code
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(404).json({ message: 'There was an error.' });
    }
  });

  webapp.put('/users/:id/password/:newPassword', async (req, res) => {
    try {
      const username = decodeURIComponent(req.params.id)
      const newPassword = decodeURIComponent(req.params.newPassword)
      const result = await dbLib.updatePassword(username, newPassword);
      // send the response with the appropriate status code
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(404).json({ message: 'There was an error.' });
    }
  });

  webapp.put('/users/:id/picture/:newProfilePicture', async (req, res) => {
    try {
      const username = decodeURIComponent(req.params.id)
      const decodedPicture = decodeURIComponent(req.params.newProfilePicture)
      const result = await dbLib.updateProfilePicture(username, decodedPicture);
      // send the response with the appropriate status code
      res.status(200).json({ message: result });
    } catch (err) {
      res.status(404).json({ message: 'There was an error.' });
    }
  });

const port = 3001
let db

// start the app and connect to the DB
webapp.listen(port, async () => {
  db = await dbLib.connect()
  console.log(`Express server running on port: ${port}`);
})

module.exports = webapp;