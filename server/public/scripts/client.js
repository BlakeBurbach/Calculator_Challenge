$(document).ready(readyNow);

let calculation; // global object of the Calculation class
let displayNumber = ''; // going to be used to create first and second numbers for class object
let firstNumberEntered = false; // tells the displayNum function whether or not to create second number
let newCalculation = true; 

class Calculation {
    constructor(firstNumberIn){
        this.firstNumber = firstNumberIn;
        this.secondNumber = '';
        this.operator = '';
        this.answer = '';
    }
}

function readyNow(){
    console.log('Oh Hey there!');
    $('.numBtn').on('click', displayNum );
    $('.opBtn').on('click', displayOps);
    $('#equals').on('click', makeCalculation);
    $('#refresh').on('click', refreshPage);
    $('#clear').on('click', clearInputs);
    getCalculation();
    clearInputs();
}

function displayNum(){
    if ( newCalculation === false){
    clearInputs();
    newCalculation = true;
    } else {
        if (firstNumberEntered === false ){
            console.log($(this).data('number'));
            let number = $(this).data('number')
            let calcDisplay = $('#display').val();
            $('#display').val(calcDisplay + number);
            displayNumber += number;
            calculation = new Calculation(displayNumber);
        }
        else if (firstNumberEntered === true){
            let number = $(this).data('number');
            let calcDisplay = $('#display').val();
            $('#display').val(calcDisplay + number);
            console.log(number);
            displayNumber += number;
            calculation.secondNumber = displayNumber;
        }
    }
}

function displayOps(){
    if( firstNumberEntered === false){
        console.log($(this).data('operator'));
        calculation.operator = $(this).data('operator');
        console.log(calculation.operator);
        let calcDisplay = $('#display').val();
        $('#display').val(calculation.firstNumber + calculation.operator);
        displayNumber = '';
        return firstNumberEntered = true;
    }
}

function makeCalculation(){
    calculation.secondNumber = displayNumber;
    sendCalculation(calculation);
    clearInputs();
}

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
    $('#display').val('');
    displayNumber = '';
    firstNumberEntered = false;
    calculation = '';
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
        $('#display').val(calculation.answer);
        newCalculation = false;
    }
}


function refreshPage(){
    $.ajax({
        type: "DELETE",
        url: "/calculation"
    }).done(function(response){
        appendToDom(response);
        clearInputs();
    })
}

// end file