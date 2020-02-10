const express = require("express");
const path = require('path');

const app = express();

//Init Middleware
app.use(express.json({
    extended: false
}))

//Define Routes
app.use('/api/scores', require('./routes/api/score'));

//Serve statis assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`${port}`))