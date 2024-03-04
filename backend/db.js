
  const mongoose = require('mongoose');

// MongoDB URI - replace with your actual URI, the one here is just a placeholder.
const dbURI = "mongodb+srv://AdminRohit:JAIshriram11@cluster0.k0nfb3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Additional options for the connection
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false, 
  useCreateIndex: true
};

mongoose.connect(dbURI, options)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.log('MongoDB connection error:', err.message);
    // Implement additional error handling as necessary.
  });

// To handle initial connection errors
mongoose.connection.on('error', err => {
  console.log('MongoDB initial connection error:', err.message);
});
