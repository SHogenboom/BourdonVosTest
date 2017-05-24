/** Bourdon Vos Test
* @author hogen.boom@hotmail.com (Hogenboom, S. A. M.)
* @fileoverview Flow order: index > bv_pratice > bv_test > bv_results
* @todo 
*/

// SET VARIABLES
var stimuliColumns = 24; // specified in Bourdon Vos Test
var stimuliRows = 33; // specified in Bourdon Vos Test
var totalStimuli = stimuliColumns * stimuliRows;
var dotArray = []; // empty array to store which canvas contains which amount of dots
//var arrayXpos = []; 
//var arrayYpos = [];
var outerBorder = 10;
var canvasBorder = 1;


// INITIALIZE FUNCTIONS
// window.onload = checkWindowSize();
window.onbeforeunload = confirmExit();
window.onload = stimuliPresentation ();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// MAIN FUNCTIONS ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stimuliPresentation () {
    // HIDE EXISTING COMPONENTS
        document.getElementById("maintext").style.visibility = "hidden"
        document.getElementById("button").style.visibility = "hidden"
        
    // SET VARIABLES
            var horizontal = 1;
            var vertical = 1; 
            var posLeft;
            var posTop;
    
    
    
    // DETERMINE MAX. CANVAS SIZE
        // to determine how large the canvasses (i.e. stimuli) can
        // ....  be and still fit in the window    
        var canvasWidth = canvasSize(); // size returned from canvasSize function
        var canvasHeight = canvasWidth; // make square. Computer screens always wider than high.
        
    // CREATE DOT ARRAY
        // Create an array with 1/3 of totalStimuli containing "3", "4", or "5" > will represent amount of dots later on
        for (i = 3; i < 6; i++) {
            for (x = 1; x < ((totalStimuli / 3) + 1); x++) { // +1 because counter starts at 1
                dotArray.push(i)    // add the number (i) to the entire array
            } // END 1/3 of figure LOOP
        } // END create dot array LOOP
        shuffleArray(dotArray); // shuffle content of dotArray to allow for random figures
        // console.log(dotArray);
    
    // CREATE CANVASES
        for (t = 1; t < (totalStimuli +1); t++) { // totalStimuli + 1 because counter starts at 1
            var canvasID = "Canvas" + t;

            // POSITIONING OF CANVASES            
                if (t == 1) { // first canvas
                    posLeft = outerBorder + canvasBorder;
                    posTop = outerBorder + canvasBorder;
                } else { // all other canvases
                    if (horizontal < stimuliColumns) { // Loop over Columns to set X positions
                        posLeft = (((canvasWidth * horizontal) +  canvasBorder) + outerBorder); // +canvasBorder/outerBorder to prevent overlap with window & other canvases
                        horizontal = horizontal + 1; // increment counter
                    } else {  // a row was filled, change Y position  
                        posLeft = outerBorder + canvasBorder;
                        horizontal = 1; // reset counter for next row
                        posTop = (((canvasHeight * vertical) + canvasBorder) + outerBorder);
                        vertical = vertical + 1; // increment counter
                    } // END horizontal/vertical IF
                } // END first canvas IF
      
            createCanvas("stimuli", canvasID, canvasHeight, canvasWidth, posLeft, posTop);   
        } // END create canvas LOOP  

        
   /*     
    // DRAW FIGURES ON CANVAS
        var sizeCirckel = dotCoordinates (canvasID);
            for (k = 0 ; k < (dotArray[k]); k++) {
                var index =  indexArray[k];       
                var posX = arrayXpos[index]; 
                var posY = arrayYpos[index];
                blackDot (canvasID, posX, posY, sizeCirckel)
        } // END drawing figures LOOP
        */
            
               
} // END stimuliPresentation FUNCTION


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function checkWindowSize() {
    // GOAL: Ensure that the participant is using the full screen for the task.
       
        // Determine computer screen size
            var screenHeight = screen.height;
            var screenWidth = screen.width;
        
        // Determine current window size 
            var winWidth = window.outerWidth;
            var winHeight = window.outerHeight;
        
        if ((screenHeight != winHeight) && (screenWidth != winWidth)) {
            console.log("screenHeight = " + screenHeight + "winHeight = " + winHeight + "screenWidth = " + screenWidth + "winWidth" + winWidth);
            alert("Window too small. Please ensure that the screen is in full screen mode");
            window.onresize =  window.location.reload(); // relaunch the window check -> creates loop until if condition is satisfied
        } // END IF   
         window.addEventListener("onbeforeunload", confirmExit);
} // END checkWindowSize FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
function canvasSize() {
    // GOAL: determine size of screen and adjust size of the presented stimuli to be as
    // ... large as possible
    // ASSUMPTION: Computer & Laptop screens are wider than they are high. 
    // ... Thus in order to create maximum sized squares, only the width needs to be taken into account.
    
    // Determine current window size 
           var winWidth = (window.innerWidth - (2* outerBorder)); // available amount of pixels on the inside of the window
           // var divWidth = document.getElementById("stimuli").offsetWidth; 
            
    // Determine max canvas width
        var canvasWidth = (winWidth / (stimuliColumns)); // -4 to allow for room for the borders between canvases & the side of the window
            
        console.log(canvasWidth);
        console.log(winWidth);
        
     return canvasWidth;
}  // END canvasSize FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
function createCanvas (appendObject, canvasID, canvasHeight, canvasWidth, posLeft, posTop) { 
    // GOAL: create a new RESPONSIVE empty canvas
        // appendObject: ID of the object to which the canvas should be appended <div id = "stimuli">
        // canvasID: name you want to give to the created canvas

    // CREATE CANVAS
        var addCanvas = document.createElement('canvas');       // Create new canvas element
    
    // ASSIGN PROPERTIES
        addCanvas.id = canvasID; // .id to change on what is specified (itterates in stimulusPresentation function)
        addCanvas.width = canvasWidth; // set canvasWidth (depending on screen size in canvasSize function)                                              
        addCanvas.height = canvasHeight; //  set canvasHeight (depending on screen size in canvasSize function) 
        addCanvas.style.position = "absolute";
        addCanvas.style.left = posLeft;
        addCanvas.style.top = posTop;
        
        
    // ASSIGN RESPONSE ACTIONS
       // addCanvas.onclick = function () {responseLogging(canvasID, canvasWidth, canvasHeight) } ; // call upon responseLogging to track correct crossout and log hits/miss/mistakes

    // APPEND CANVAS TO EXISTING OBJECT
        document.getElementById(appendObject).appendChild(addCanvas); // append newly created canvas to existing element 
} // END createCanvas FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
function blackDot (canvasID, posX, posY, sizeCirckel) {
    // GOAL: draw a single black circkle
            // canvasID: id of the canvas to be drawn on
            // posX: X position of center circkel relative to canvas
            // posY: Y position of center circkel relative to canvas
            // sizeCirckel: size of circkel dependent on size of canvas
        
        // CALL CANVAS
            var c = document.getElementById(canvasID);         // draw on prespecified canvas (see HTML)
            var ctx = c.getContext("2d");                                    // unkown functionality but necessary 
        
        // DRAW CIRCKEL
            ctx.beginPath();                                                        // initialize drawing
            ctx.fillstyle = "black";                                                 // specify fill color = black
            ctx.arc(posX,posY,sizeCirckel,0,2*Math.PI);            // specification of shape to draw (in this case a circkle)
            ctx.stroke();                                                               // draw specified shape
            ctx.closePath();                                                        // to allow for other figures to be drawn
            ctx.fill();                                                                     // execute
} // END blackDot FUNCTION    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
function dotCoordinates (canvasID) {
    // GOAL: create a combination of X & Y coordinates that match size of the canvas
        // canvasID: id of canvas to be drawn on
        
        // SET VARIABLES
        var canvasWidth = (document.getElementById(canvasID).width - 6); // -6 to allow for 3px blank border where no circkel is drawn
        var canvasHeight = (document.getElementById(canvasID).height - 6); // -6 to allow for 3px blank border where no circkel is drawn
        var sizeCirckel = (canvasWidth / 11); // divide by 11 to allow blank spaces between the dots
        // console.log(sizeCirckel);
        arrayXpos = []; 
        arrayYpos = [];
        
        // possible X positions
             arrayXPos = [];                                                                // create empty array accesible outside function
                for (q = 1; q < (3 + 1); q++) {                 // repeat X coordinates for all coordinates of Y
                    for (k = 1; k < (3 + 1); k++) {         // positions for the amount of horizontalCirckles specified (+1 because k = 1)
                        var posX = ((3 * sizeCirckel) * k);                       // (should be changed depending on canvas & circkel size)
                        arrayXpos.push(posX);                                      // append new position to array containing all X coordinates
                    } // END horizontal LOOP
                } // END vertical LOOP
            // window.alert(arrayXPos);                                               // TEST
     
         // possible Y positions
            arrayYPos = [];                                                                // create empty array accesisble outside function
                for (w = 1; w < (3 + 1); w++) {           // repeat Y coordinates for all coordinates of X
                     for (l = 1; l < (3 + 1); l++) {                // positions for the amount of verticalCirckles specified (+1 because l = 1)
                        var posY = ((3 * sizeCirckel) * l);                         // change depending on circkelSize
                        arrayYpos.push(posY);                                       // append new position to array containing all Y position
                    } // END vertical LOOP
                } // END horizontal LOOP
            //  window.alert(arrayYPos);                                               // TEST
            
            // sort so when paired with X creates unique XY coordinates
                 arrayYpos.sort();
                 
      // shuffle XY positions
            indexArray = [];                                                                     // create new Array for random indexing out of XY coordinate arrays
                for (y = 1; y < 9; y++) {   // create integers for each point in the grid (1 - 9) 
                    indexArray.push(y);                                                             // append integer to indexArray
                } // END for LOOP
            shuffleArray(indexArray);                                                             // shuffle order of integers to allow for random indexing (i.e. dot placement)
    
    return sizeCirckel;
} // END positionGrid FUNCTION



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INTERNET FUNCTIONS /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTE: Functions that were used to create the task that were not programmed by the author

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
// https://stackoverflow.com/questions/17143394/confirmation-before-exit-dialog)

function confirmExit() {
    // GOAL: make sure pp wanted to close the window and didn't do so by accident 
    // ... which would mean loosing all scores.
        return "You have attempted to leave this page. Are you sure?";
} // END confirmExit FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

function getRandomInt(min, max) {
      // GOAL: get a random integer in a range from min to max
        return Math.floor(Math.random() * (max - min + 1) + min);
} // END RandomInt FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffleArray(array) {
    // GOAL: to shuffle the content of an array (e.g., to create random presentation of stimuli)
            for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
        return array;
} // END shuffleArray FUNCTION






















