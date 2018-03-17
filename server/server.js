let express = require('express');
let app = express();
const PORT = process.env.PORT || 5000;
let bodyParse = require('body-parser');

let calculationArray = [];

//bring in body-parser
app.use(bodyParse.urlencoded({extended: true}));

//Serve up the static files
app.use(express.static('server/public'));

// receive client POST
app.post('/calculation', (req, res) => {
    let calculation = req.body;
    if ( calculation.operator === '+' ){
       calculation.answer = parseInt(calculation.firstNumber) + parseInt(calculation.secondNumber);
       console.log(calculation);
    } 
    if ( calculation.operator === '-' ){
       calculation.answer = parseInt(calculation.firstNumber) - parseInt(calculation.secondNumber);
       console.log(calculation);
    } 
    if ( calculation.operator === '*' ){
       calculation.answer = parseInt(calculation.firstNumber) * calculation.secondNumber;
       console.log(calculation);
    }
    if ( calculation.operator === '/' ){
       calculation.answer = calculation.firstNumber / calculation.secondNumber;
       console.log(calculation);
    }
    calculationArray.push(calculation);
    console.log(calculationArray);
    res.sendStatus(200);
});

// respond to client POST with a GET
app.get('/calculation', (req, res) => {
    res.send(calculationArray);
});

app.delete('/calculation', (req, res) => {
    calculationArray = [];
    res.send(calculationArray);
})

//Spinning up the server
app.listen(PORT, (req, res) => {
    console.log('Server is running on port', PORT)
});