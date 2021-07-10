const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

module.exports = ConnectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log('DataBase Connected');
  } catch (error) {
    console.log(error.message);

    // Exit Process with Failure
    process.exit(1);
  }
};
