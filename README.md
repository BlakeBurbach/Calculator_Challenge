# Calculator_Challenge
- [x] Get file structure set up
- [x] Get the server and client sides ready
- [x] On the client side:
    - [x] set up HTML with:
        - [x] 2 input fields that take in numbers: number 1 and number 2
        - [x] 6 buttons: +, -, *, /, calculate, and refresh
        - [x] a table to keep a log of the math operations
    - [x] set up Javascript and jQuery
        - [x] event handlers for each button
            - [x] when you click one of the operator buttons, make a calculation 
                 based on it's operator i.e. the + should add both numbers
            - [x] to begin with, those buttons should create a new class object of 
                 Calculation and send that information to the server
                    - [x] the class should take in arguments of first number, second          number, and operator. It will also hold a property for answer       that will be provided by server side after it performs the          calculation. 
        - [x] set up POST and GET requests in client side to POST the calculation class
             and GET the calculated response
             - [x] the POST will send the newly created Calculation object
             - [x] the GET will send back that same object with the answer provided.
                - [x] Then append to the table on the DOM as a math operation
                    - i.e. 2 + 2 = 4
- [x] on the server side: 
    - [x] set up express, body-parser, port and GET and POST
    - [x] create a global array that each incoming calculation object will be stored in
    - [x] create logic that will perform math operations based on the operator                properties and will create the value for the answer property from the               operation.
    - [x] the POST should recieve the object and push it to the array
    - [x] the GET should return the entire array with all objects
                