$(document).ready(readyNow);

let calculation; // global object of the Calculation class that will be sent to server
let displayNumber = ''; // going to be used to create first and second numbers for class object
let firstNumberEntered = false; // tells the displayNum function whether or not to create second number
let newCalculation = true; // decides whether or not to clear calculator display
                            // if false, clear display

// will be used to create an object for every calculation to be sent to server                           
class Calculation {
    constructor(firstNumberIn){
        this.firstNumber = firstNumberIn;
        this.secondNumber = '';
        this.operator = '';
        this.answer = '';
    }
}

// when page is loaded
function readyNow(){
    console.log('Oh Hey there!');
    $('.numBtn').on('click', displayNum ); // for all number buttons
    $('.opBtn').on('click', displayOps); // for all operator buttons
    $('#equals').on('click', makeCalculation); // equal button to send to server
    $('#refresh').on('click', refreshPage); // C button that refreshes page
    $('#clear').on('click', clearInputs); // D button to clear display
    getCalculation(); // sets up the GET from server
    clearInputs(); // clears inputs on page load
} // end readyNow

// number buttons will create numbers on calculator display
function displayNum(){
    if ( newCalculation === false){ // once a user starts a new calculation, clear display
        clearInputs();
        newCalculation = true;
    } // end if
    if (firstNumberEntered === false ){ // create first number
        console.log($(this).data('number'));
        let number = $(this).data('number')
        let calcDisplay = $('#display').val();
        $('#display').val(calcDisplay + number);
        displayNumber += number; // use global variable to create calculation object with this first number
        calculation = new Calculation(displayNumber); // creates new object with first number
    }
    else if (firstNumberEntered === true){ // if first number has been created, create second number
        let number = $(this).data('number');
        let calcDisplay = $('#display').val();
        $('#display').val(calcDisplay + number);
        console.log(number);
        displayNumber += number; // now that it's cleared, use global to set calculation object's second number
        calculation.secondNumber = displayNumber; // sets calculation object's second number
    } // end else if
} // end displayNums

// on click operator sets the operator for calculation
function displayOps(){
    if( firstNumberEntered === false) { // select an operator
        console.log($(this).data('operator'));
        calculation.operator = $(this).data('operator'); // sets calculation's operator property to selected operator
        console.log(calculation.operator);
        let calcDisplay = $('#display').val();
        $('#display').val(calculation.firstNumber + calculation.operator);
        displayNumber = ''; // clear global var so second number can use it
        return firstNumberEntered = true; // return to create second number
    } // end if 
} // end displayOps

// this will be the equals function that sends the calculation object to server
function makeCalculation(){
    sendCalculation(calculation); // send object in POST to server
    newCalculation = false; // set to false to clear inputs when new calculation starts
} // end 

// send our calculation over to server
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


// receive calculated response inside of calcutionsArray
function getCalculation(){
    $.ajax({
        type: "GET",
        url: "/calculation"
    }).done(function(response){
        // the response is the array
        console.log(response);
        appendToDom(response);
    }); // end GET
} // end getCalculation

// gets the array information from server to append calculations to DOM
function appendToDom(calculationArray){
    $('#tableBody').empty(); // empty so we only see the updated calculationsArray from server
    for (let calculation of calculationArray){
        console.log(calculation);
        let tr = $('<tr></tr>');
        tr.append('<td>' + calculation.firstNumber + '</td>' );
        tr.append('<td>' + calculation.operator + '</td>' );
        tr.append('<td>' + calculation.secondNumber + ' = </td>' );
        tr.append('<td>' + calculation.answer + '</td>' );
        $('#tableBody').append(tr);
        $('#display').val(calculation.answer);
        // newCalculation = false;
    } // end for of
} // end appendToDom

// clear all inputs
function clearInputs(){
    $('#display').val(''); // reset calculator display
    displayNumber = ''; // reset global variable to be used again
    firstNumberEntered = false; // reset to create first number of next calculation object
    calculation = ''; // reset global calculation object
} // end clearInputs

// DELETE request from server to delete our calculations array
function refreshPage(){
    $.ajax({
        type: "DELETE",
        url: "/calculation"
    }).done(function(response){
        // will append an empty array from server to refresh experience
        appendToDom(response);
        clearInputs(); 
    }) // end DONE
} // end refreshPage

// end file