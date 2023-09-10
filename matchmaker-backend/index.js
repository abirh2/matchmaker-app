/**
 * This module will start the express server
 */

// import the express app
const webapp = require('./model/server');

const port = 3001;
let db;
// start the web server
webapp.listen(port, async () => {
  db = await dbLib.connect();
  console.log('Server running on port', port);
});