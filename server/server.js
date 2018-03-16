let express = require('express');
let app = express();
const PORT = process.env.PORT || 5000;
let bodyParse = require('body-parser');

//bring in body-parser
app.use(bodyParse.urlencoded({extended: true}));

//Serve up the static files
app.use(express.static('server/public'));

//Spinning up the server
app.listen(PORT, (req, res) => {
    console.log('Server is running on port', PORT)
});