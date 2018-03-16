$(document).ready(readyNow);

class Calculation {
    constructor(firstNumberIn, secondNumberIn, operatorIn){
        this.firstNumber = firstNumberIn;
        this.secondNumber = secondNumberIn;
        this.operator = operatorIn;
        this.answer = '';
    }
}

function readyNow(){
    console.log('Oh Hey there!');
    $('#additionBtn').on('click', setAddition );
    $('#subtractionBtn').on('click', setSubtraction );
    $('#multiplyBtn').on('click', setMultiply );
    $('#divideBtn').on('click', setDivision );
    // $('#calculateButton').on('click', sendCalculation );
}

// create calculation with addition
function setAddition(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = 'add';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    sendCalculation(calculation);
} // end setAddition

// create calculation with subtraction
function setSubtraction(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = 'subtract';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    sendCalculation(calculation);
} // end setSubtraction

// create calculation with multiplication
function setMultiply(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = 'multiply';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    sendCalculation(calculation);
} // end setMultiply

// create calculation with division
function setDivision(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = 'divide';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    sendCalculation(calculation);
} // end setDivision

// send our data over to server
function sendCalculation(calculation){
    $.ajax({
        type: "POST",
        data: calculation,
        url: '/calculation'
    }).done(function(response){
        // response from server will be '200' success
        console.log('Success');
    }).fail(function(response){
        console.log('Uh-oh! Something went wrong...');
    }) // end POST
} // end calculate

// receive calculated response
function getCalculation(){
    $.ajax({
        type: "GET",
        url: "/calculation"
    }).done(function(response){
        appendToDom(response);
    }); // end GET
} // end getCalculation


function appendToDom(response){
    console.log(response);
}


// end file