const { connect, connection } = require('mongoose');


const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost/smn';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = connection;
