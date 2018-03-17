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
    $('#calculatorBody').on('click', '.numBtn', displayNums );
    $('#additionBtn').on('click', setAddition );
    $('#subtractionBtn').on('click', setSubtraction );
    $('#multiplyBtn').on('click', setMultiply );
    $('#divideBtn').on('click', setDivision );
    getCalculation();
    $('#refresh').on('click', refreshPage);
}

function displayNums(number){
    let display = $('#textview').val();
    display = $(this).val();
}

// create calculation with addition
function setAddition(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = '+';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    console.log(calculation);
    sendCalculation(calculation);
    clearInputs();
} // end setAddition

// create calculation with subtraction
function setSubtraction(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = '-';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    console.log(calculation);
    sendCalculation(calculation);
    clearInputs();
} // end setSubtraction

// create calculation with multiplication
function setMultiply(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = '*';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    console.log(calculation);
    sendCalculation(calculation);
    clearInputs();
} // end setMultiply

// create calculation with division
function setDivision(){
    //set the values for the calculation object being sent over
    firstNumber = parseInt($('#firstInput').val()); 
    secondNumber = parseInt($('#secondInput').val()); 
    operator = '/';
    let calculation = new Calculation(firstNumber, secondNumber, operator);
    console.log(calculation);
    sendCalculation(calculation);
    clearInputs();
} // end setDivision

// send our data over to server
function sendCalculation(calculation){
    $.ajax({
        type: "POST",
        data: calculation,
        url: '/calculation'
    }).done(function(response){
        getCalculation();
        // response from server will be '200' success
        console.log('Success');
    }).fail(function(response){
        console.log('Uh-oh! Something went wrong...');
    }) // end POST
} // end calculate

function clearInputs(){
    $('#firstInput').val('');
    $('#secondInput').val('');
}

// receive calculated response
function getCalculation(){
    $.ajax({
        type: "GET",
        url: "/calculation"
    }).done(function(response){
        console.log(response);
        appendToDom(response);
    }); // end GET
} // end getCalculation

function appendToDom(calculationArray){
    $('#tableBody').empty();
    for (let calculation of calculationArray){
        console.log(calculation);
        let tr = $('<tr></tr>');
        tr.append('<td>' + calculation.firstNumber + '</td>' );
        tr.append('<td>' + calculation.operator + '</td>' );
        tr.append('<td>' + calculation.secondNumber + ' = </td>' );
        tr.append('<td>' + calculation.answer + '</td>' );
        $('#tableBody').append(tr);
    }
}


function refreshPage(){
    $.ajax({
        type: "DELETE",
        url: "/calculation"
    }).done(function(response){
        appendToDom(response);
    })
}

// end file