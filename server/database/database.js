const mongoose = require('mongoose');

const mongoDB = 'mongodb://localhost/watchIt';

// watchIt
const connectDb = async () => {
  const connection = await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  return connection;
}

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

const createUser = async (name, password) => {
  const con = await connectDb();
  let res = await user.create({name, password})
  con.disconnect();
  return res;
}

const findUser = async (name, password) => {
  const con = await connectDb();
  let res = await user.find({name, password});
  con.disconnect();
  return res;
}


module.exports = {
  createUser,
  findUser
}