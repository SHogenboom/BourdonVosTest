/** Bourdon Vos Test
* @author hogen.boom@hotmail.com (Hogenboom, S. A. M.)
* @fileoverview Flow order: index > bv_pratice > bv_test > bv_results
* @todo 
*/

// SET VARIABLES
/*if (trial == true) {
    var stimuliColumns = 24; // practice
    var stimuliRows = 1; // 33 specified in Bourdon Vos Test
} else {
    var stimuliColumns = 24; // 24 specified in Bourdon Vos Test
    var stimuliRows = 33; // 33 specified in Bourdon Vos Test
} // END trial IF */

stimuliColumns = 24; // 24 specified in Bourdon Vos Test
stimuliRows = 33; // 33 specified in Bourdon Vos Test
totalStimuli = stimuliColumns * stimuliRows;

var dotArray = []; // store which canvas contains which amount of dots
var outerBorder = 15;
var canvasBorder = 1;
var responseTimeArray = []; // store currentTime per canvas
var clickArray = []; // store how many time a canvas was clicked
var responseArray = []; // log hits/misses/false alarms
var correctionArray = []; // log whether response was corrected
var responseOrderArray = []; // log order of canvases responded to

var trial = true;


// INITIALIZE FUNCTIONS
window.onbeforeunload = confirmExit();
// window.onload = stimuliPresentation ();
// window.onload =  sessionStorage.setItem("start", currentTime()); // store start time until tab is closed so can be used on next page
window.onload = trialPresentation ();

function trialPresentation() {
    stimuliColumns = 24; // practice
    stimuliRows = 1; // practice
    totalStimuli = stimuliColumns * stimuliRows;

   // RESET VARIABLES
    var dotArray = []; // store which canvas contains which amount of dots
    var outerBorder = 15;
    var canvasBorder = 1;
    var responseTimeArray = []; // store currentTime per canvas
    var clickArray = []; // store how many time a canvas was clicked
    var responseArray = []; // log hits/misses/false alarms
    var correctionArray = []; // log whether response was corrected
    var responseOrderArray = []; // log order of canvases responded to
    
    stimuliPresentation (); 
    
} // END TRIAL

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// MAIN FUNCTION ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stimuliPresentation () {
    // HIDE EXISTING COMPONENTS
        document.getElementById("maintext").style.visibility = "hidden"
        
    // SET VARIABLES
            var horizontal = 1;
            var vertical = 1; 
            var posLeft = 0;
            var posTop = 0;
    
    // REMOVE ANY EXISTING CANVASES
        for (i = 0; i < totalStimuli; i++ {
             document.getElementById("stimuli").removeChild(child);
        } // END remove canvas LOOP
    
    // DETERMINE MAX. CANVAS SIZE
        // to determine how large the canvasses (i.e. stimuli) can
        // ....  be and while still fitting in the window    
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
    
    // CREATE CANVASES WITH DOT FIGURES
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
            
            // DRAW FIGURES ON CANVAS
                var sizeCirckel = dotCoordinates (canvasID);
                    var dots = dotArray[(t-1)]; // -1 because index starts at 0
                    
                    for (k = 0 ; k < dots; k++) {
                        var index =  indexArray[k];       
                        var posX = arrayXpos[index]; 
                         var posY = arrayYpos[index];
                        blackDot (canvasID, posX, posY, sizeCirckel)
                } // END drawing figures LOOP
                
            // SET CLICKS TO 0 FOR ALL CANVASES
                clickArray.push(0);
        } // END create canvas LOOP  
        
            // console.log(dotArray); // TEST if correct dots are displayed
            // console.log("clickArray length = " + clickArray.length);  // TEST: should be equal to totalStimuli

    // PRESENT FINISH BUTTON
        document.getElementById("button").innerHTML = "I am finished"; // change text
        document.getElementById("button").style.position = "absolute"; // set position
        document.getElementById("button").style.top = ((stimuliRows+0.5) * canvasHeight); // set position below all canvases
        document.getElementById("button").style.left = (outerBorder + canvasBorder); // align left
        document.getElementById("button").onclick = function() { terminationButton() }; // upon clicking store data & go to results

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
       addCanvas.onclick = function () {responseLogging() } ; // call upon responseLogging to track correct crossout and log hits/miss/mistakes
        addCanvas.onmouseover = function () {canvasMouseOver()} ; // 
        addCanvas.onmouseout = function () {canvasMouseOut()} ; 

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

function canvasMouseOver () {
    // GOAL: set current time when hovering over canvas
    // ... used in conjunction with canvasMouseOut ()
    
    // SET VARIABLES
        var currentID = event.currentTarget.id; // log id of event that triggered the function
        startHover = currentTime(); 
        // console.log(startHover); // TEST
        
} // END canvasMouseOver FUNCTION


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvasMouseOut () {
    // GOAL: color canvas grey if on mouseout more than 500 miliseconds have passed since mouseover     
        // SET VARIABLES
        var currentID = event.currentTarget.id; // log id of event that triggered the function
        var finishHover = currentTime(); 
        var index = (currentID.replace("Canvas", ""))-1; // replace "Canvas" by nothing so unique number remains, -1 because index starts from 0
        // console.log(finishHover); // TEST
        
        if ((finishHover - startHover) > 200) { // delay response so only activated when "hovered" for 300 miliseconds
            // CHANGE BG COLOR
            document.getElementById(currentID).style.backgroundColor = "#CCCCCC"; 
            
            // STORE RESPONSE TIMES
            responseTimeArray.push(finishHover);
            
            // STORE RESPONSE MADE
                // extract amount of dots presented in figure
                    var amountDots = dotArray[index];
                    // window.alert(amountDots); // TEST whether accurate
    
                // CODE RESPONSES (only cross out (click = 1) figures with 4 dots)
                        // responses: HIT (1), Miss (2), False Alarm (3) 
                        // corrections: NO (0), YES (1)
                    if (amountDots == 3 || amountDots == 5) {
                        // do not click (click == 0) or correct mistake (click == 2) == HIT
                        if (clickArray[index] == 0) {                           // No click = CORRECT  // NOTE: not coded because function only activated upon mouseclick
                            responseArray.push(1);                             // HIT
                            correctionArray.push(0);                            // NO
                            responseOrderArray.push(index); // store number of canvas
                        } else if (clickArray[index] == 1) {                // 1 click == WRONG (only click figures with 4 dots)
                            responseArray.push(3);                              // FALSE ALARM
                            correctionArray.push(0);                               // NO
                            responseOrderArray.push(index);// store number of canvas
                        } else {                                                        // 2 clicks == CORRECTION
                            responseArray.push(1);                          // HIT
                            correctionArray.push(1);                            // YES
                            responseOrderArray.push(index); // store number of canvas
                        } // END  click amount IF
                    } else { // amountDots == 4
                         if (clickArray[index] == 0) {                  // no click == WRONG // NOTE: not coded because function only activated upon mouseclick
                            responseArray.push(2);                          // MISS
                            correctionArray.push(0);                         // NO
                            responseOrderArray.push(index); // store number of canvas
                        } else if (clickArray[index] == 1) {        // 1 click == CORRECT
                            responseArray.push(1);                          // HIT
                            correctionArray.push(0);                        // NO
                            responseOrderArray.push(index); // store number of canvas
                        } else {                                                   // 2 clicks == unjust correction aka WRONG
                            responseArray.push(2);                      // MISS
                            correctionArray.push(1);                     // YES
                            responseOrderArray.push(index); // store number of canvas
                        } // END click amount IF
                    } // END amountDots  IF
                            console.log("responseArray = " + responseArray);
                            console.log("correctionArray = " + correctionArray);
                            
            // STORE RESPONSE TIMES
                    responseTimeArray.push(currentTime()); // store current Time in responseTimeArray
                            
        } // END hover IF   
} // END canvasMouseOut FUNCTION
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function currentTime () {
    // GOAL: retrieve the current time in Javascript since 1st January 1970
    // .... delta time can still be used!
    
    var time = new Date ();
    return time.getTime();
} // END currentTime FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function responseLogging () {
    // SET VARIABLES
        var currentID = event.currentTarget.id; // log id of event that triggered the function
        var canvasWidth = document.getElementById(currentID).width; // determine canvas width
        var canvasHeight = document.getElementById(currentID).height;  // determine canvas height   
        var index = (currentID.replace("Canvas", ""))-1; // replace "Canvas" by nothing so unique number remains, -1 because index starts from 0
              
    // DRAW RESPONSE 
        var clicks = clickArray[index];
        if (clicks == 0) {
            // canvas has not been clicked - draw line
                    var c=document.getElementById(currentID);              // refer to correct canvas
                    var ctx=c.getContext("2d");                                         // unkown but necessary
                    imageData = ctx.getImageData(0,0,canvasWidth, canvasHeight); // store canvas picture as is
                    ctx.beginPath();                                                           // start new drawing
                    ctx.moveTo(0,0);                                                          // determine starting position of line - constant
                    ctx.lineTo(canvasWidth,canvasHeight);                       // finish position of line - changes on canvas size specifiedin drawGrid function
                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                    ctx.strokeStyle = "#ff0000";                                          // color of line; red
                    ctx.stroke();                                                                  // initialize drawing 
                    clickArray[index] = 1;                                                    // increment clicks to 1
        } else if (clicks == 1) {
            // second response, draw correction line
                    var c=document.getElementById(currentID);               // refer to correct canvas
                    var ctx=c.getContext("2d");                                           // unkown but necessary
                    ctx.putImageData(imageData, 0,0);                               // reset previous picture (i.e. remove red line)
                    clickArray[index] = 2;
        } else {
            // do nothing, pictures should not be clicked more than twice
        } // END clicks IF
                
} // END responseLogging FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function terminationButton () {  
    // GOAL: store data for result calculations
 
    if (trial == true) {       
        if ((responseArray.length == stimuliColumns)){
            // all canvases responded to, and no corrections made
            
            // PREPARE PARTICIPANT
            window.alert("Welldone! You are now going to start the Bourdon Vos Test. Rember to only click those figures with 4 dots" +
            ", and to move your mouse over each figure. If you accidently clicked a figure with 3 or 5 dots, click again to correct your mistake. Good Luck!");
        
            // PRESENT BV TASK
                stimuliColumns = 24; // 24 specified in Bourdon Vos Test
                stimuliRows = 33; // 33 specified in Bourdon Vos Test
                totalStimuli = stimuliColumns * stimuliRows;

                trial = false;
                stimuliPresentation ();  // present actual task
        } else {
            // trial not done accordingly
            window.alert("Unfortunately, something went wrong! Rember to only click those figures with 4 dots" +
            ", and to move your mouse over each figure so it turns grey. Try not to make any mistakes");
            
            trialPresentation ();
            
        } // END reponse IF
    } else {
    // no trial so set termination button functionality!
    
        // startTime stored on window load
        sessionStorage.setItem("finish", currentTime()); // store finish Time
        sessionStorage.setItem("stimuliRows", stimuliRows); // store amount of rows containing stimuli
        sessionStorage.setItem("stimuliCols", stimuliColumns); // store amount of columns containing stimuli
        
        sessionStorage.setObj("ARRAY_MADE_RESPONSES", responseArray);                     // responses made
        sessionStorage.setObj("ARRAY_MADE_CORRECTIONS", correctionArray);                    // corrections made
        sessionStorage.setObj("ARRAY_CANVAS_RESPONSE_ORDER", responseOrderArray);   // order in which responses were made
        sessionStorage.setObj("ARRAY_N_DOTS", dotArray);                                     // amount of dots in each figures
        sessionStorage.setObj("ARRAY_RESPONSE_TIMES", responseTimeArray);                       // response times per canvas
        
         // load next page
        window.location.href = "bv_results.html";

    } // END trial IF
           
} // END terminationButton FUNCTION




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INTERNET FUNCTIONS /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE
// Functions that were used to create the task that were not programmed by the author

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
// FROM INTERNET - ALLOWS FOR ARRAY STORAGE IN TEMP MEMORY
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   



















