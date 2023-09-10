/**
 * This file contains all of the CRUD operations described in the
 * API documentation. 
 * 
 * We will be using MongoDB.
 */

// Import dotenv to access environment variable
const dotenv = require('dotenv')

// Import the Mongodb driver
const { MongoClient } = require('mongodb');

// Import ObjectID
const { ObjectId } = require('mongodb');

// initiate dotenv and make environment variables available
dotenv.config()

// URL of remote DB
const dbURL = `mongodb+srv://jdonnini:5JaXPZXhnePJFcSn@matchmaker.oeffjhl.mongodb.net/matchmaker?retryWrites=true&w=majority`

// MongoDB connection variable
let MongoConnection;

/**
 * This function connects to the DB
 * It will be exported and used in our tests
 */
 const connect = async () =>{
  try {
      MongoConnection = (await MongoClient.connect(
        dbURL,
        { useNewUrlParser: true, useUnifiedTopology: true },
      )); // we return the entire connection, not just the DB
      // check that we are connected to the db
      console.log(`Connected to database: ${MongoConnection.db().databaseName}`);
      return MongoConnection;
  } catch (err) {
      console.log('Error:', err.message);
  }
}

/**
* Close the MongoDB connection
*/
const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

/**
* Connects to the Db and returns the DB
*/
const getDB = async () => {
  // Test if we are already connected 
  if (!MongoConnection) {
      await connect();
  }
  return MongoConnection.db();
}

/**
* Retrieves all the users in the DB.
*/
const getUsers = async () => {
  try {
      // get the db
      const db = await getDB();
      const result = await db.collection('users').find({}).toArray();
      // print the results
      console.log(`Users: Found on MongoDB`);
      return result;
  } catch (err) {
      console.log(`Error: ${err.message}`);
  }
}


/**
* CREATE a new user (HTTP POST /users)
* 
* @param {newUser} the new user object
* @returns the id of the new user
*/
const addUser = async (newUser) => {
  // get the db
  const db = await getDB();
  const result = await db.collection('users').insertOne(newUser);
  return result.insertedId;
};


/**
* READ a user (HTTP GET /users/:id)
* 
* @param {userId}  the id of the user 
* @returns the user data
*/
const getUserById = async (userId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const getUserByUsernameAndPwd = async (username, password) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({ username: username, password: password });
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};  


/**
* READ a user (HTTP GET /users/:id)
* 
* @param {userId}  the id of the user 
* @returns the user data
*/
const getUserByUsername = async (user) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({username: user});;
    // print the result
    console.log(`User: ${JSON.stringify(result.username)}`);
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

/**
* READ a student (HTTP GET /users/username)
* 
* @param {username}  the username of the student 
* @returns the student data
*/
const getUserByEmail = async (userEmail) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').findOne({email: userEmail});;
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
  };

/**
* UPDATE a user's username (PUT /users/:id)
* 
* @param {userId}  the id of the user
* @param {newUsername} the new major of the user 
* @returns 
*/
const updateUsername = async (oldUsername, newUsername) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { username: oldUsername },
      { $set: { username: newUsername } },
    );
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

const updatePassword = async (username, newPassword) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { username: username },
      { $set: { password: newPassword } },
    );
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};


/**
* Add (PUT) comment to bin
*/
const addComment = async (binId, comment) => {
  try {
    const db = await getDB();
    let result = await db.collection('bins').updateOne(
      {_id: new ObjectId(binId)},
      {$push: {comments: JSON.parse(comment)}}
    );
    console.log("Result:", result);
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}


/**
* DELETE a user (DELETE /users/:id)
* 
* @param {userId} the id of the user 
* @returns the result/status of the delete operation
*/

const deleteUser = async (userId) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').deleteOne(
      { _id: new ObjectId(userId) },
    );
    // print the result
    console.log(`User: ${JSON.stringify(result)}`);
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};


const updateProfilePicture = async (username, newProfilePicture) => {
  try {
    // get the db
    const db = await getDB();
    const result = await db.collection('users').updateOne(
      { username: username },
      { $set: { picture: newProfilePicture } },
    );
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};


module.exports = {
  connect,
  closeMongoDBConnection,
  getDB,
  getUsers,
  addUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  updateUsername,
  updatePassword,
  addComment,
  deleteUser,
  getUserByUsernameAndPwd,
  updateProfilePicture,
}