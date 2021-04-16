const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/watchIt';

// watchIt
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected')
});

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  password: String
});

const roomSchema = new Schema({
  name: String,
  owner_id: Number,
  users: [userSchema]
});

const user = mongoose.model('user', userSchema);
const room = mongoose.model('room', roomSchema);

const createUser = (user, password) => {
  // user.create({user, password})
}