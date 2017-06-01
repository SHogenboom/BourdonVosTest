///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// PARTICIPANT ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// PRACTICE - STIMULI //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GOAL
// The Participant is provided with instructions on how to preform the Bourdon Vos Test
// First an example of stimuli are provided & possible response actions explained

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// INITIALIZE VARIABLES
// Bourdon Vos Parameters
    stimuliColumns = 24; // 24 specified in Bourdon Vos Test
    stimuliRows = 33; // 33 specified in Bourdon Vos Test
    totalStimuli = stimuliColumns * stimuliRows; // 24*33 = 792

var dotArray = []; // store which canvas contains which amount of dots
var outerBorder = 15; // distance between figure and window border
var canvasBorder = 1; // size of canvas / figure borders
var responseTimeArray = []; // store currentTime() per responded canvas
var clickArray = []; // store how many time a canvas was clicked (for correct response action)
var responseArray = []; // log hits/misses/false alarms
var correctionArray = []; // log whether response was corrected (i.e. clicked twice)
var responseOrderArray = []; // log order of canvases responded to (for cleaning of data)

// CREATE PP ENVIRONMENT
    // style in CSS file [bv_css.css]

// DISPLAY INSTRUCTIONS
const FIRSTNAME = sessionStorage.getItem("FIRSTNAME"); // retrieve pp's firstname
    
document.getElementById("maintext").innerHTML = ("Hello " +  FIRSTNAME + "," + "<br>" +
    "You are about to start the Bourdon Vos Test" + "<br>" +
    "Before you start the test, however, it is time to PRACTICE!" + "<br>" +
    "Please press 'Let's Practice' to get going.");
    
// SET BUTTON
document.getElementById("button").innerHTML = "Let's Practice"; // change button text
document.getElementById("button").style.visibility = "visible";

    if ((sessionStorage.getItem("trialCompleted")) != "true") {
        // pp still to be made familiar with task at hand
        document.getElementById("button").onclick = function() { taskFamiliarization("stimuli") }; // CALL taskFamiliarization function upon button click
    } else {
        document.getElementById("button").onclick = function() { trialPresentation() }; // CALL taskFamiliarization function upon button click
    } // END familiarization IF

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function taskFamiliarization (appendObject) {
    // GOAL: familiarize the pp with the task by displaying the possible stimuli (3/4/5 dots) 
    // ... & guide through the different response options.
    // INPUT VARIABLES
        // appendObject: the <div> object to which the canvasses will be appended
    
// HIDE EXISTING ELEMENTS
document.getElementById("button").style.visibility = "hidden";

// CREATE 3 RESPONSE ACTIVE CANVASSES
  for (i = 3; i < 6; i++) {
        // CREATE EMPTY CANVAS
            var addCanvas = document.createElement('canvas'); // create canvas element
            canvasID = ("Canvas" + i); // change canvas ID with each loop
            addCanvas.id = canvasID; // set name of canvas element
            addCanvas.width = 60; // set width of element                                                   
            addCanvas.height = 60; // set height of element
            addCanvas.className = "practice"; // set css specific style (broder spacing)
            addCanvas.onclick = function () {trialResponses() };   // CALL responseLogging upon mouseclick                                         
           
            clickArray.push(0); // set to 0 mouse clickes for each canvas created    
            document.getElementById(appendObject).appendChild(addCanvas); 
            // append newly created canvas to exisitng element      
        
        // TEST
            // console.log("A canvas was created with the ID:  " + canvasID); // display canvas creations
        
        // DRAW FIGURES
            trialFigures(canvasID); // id of the canvas of which the figures will be drawn
            
    } // END LOOP   
    
//  DISPLAY NEW INSTRUCTIONS
document.getElementById("maintext").innerHTML = (
"These three figures are examples from the Bourdon Vos Test. In the Bourdon Vos Test you will be shown figures (squares) with either 3, 4, or 5 dots. It is your task to click each square/figure with 4 dots. Figures with 3 or 5 dots should not be clicked." + "<br>" +
"Try and click the figure with 4 dots first and see what happens!");
    
// TEST
   // console.log("Click Array  [3 x 0] = " + clickArray); // ensure that a clickArray was created for each canvas
     
} // END taskFamiliarization FUNCTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function trialFigures(canvasID) {
    // GOAL create three practice figures with dots in set places
    // INPUT VARIABLES
        // canvasID: the id of the canvas element on which should be drawn
    
    var dots = (canvasID.replace("Canvas", "")); 
    // Delete "Canvas" from id to identify amount of dots in each practice figure

// DRAW DOTS
    if (dots == 3) {
        // blackDot(canvasID, posX, posY, sizeCirckel)
        blackDot(canvasID,10,10,5); 
        blackDot(canvasID,40,30,5);
        blackDot(canvasID,10,50,5);
    } else if (dots == 4) {
        blackDot(canvasID,30,10,5);
        blackDot(canvasID,10,50,5);
        blackDot(canvasID,30,30,5);
        blackDot(canvasID,50,50,5);
    } else if (dots == 5) {
        blackDot(canvasID,30,30,5);
        blackDot(canvasID,10,50,5);
        blackDot(canvasID,50,10,5);
        blackDot(canvasID,50,50,5);
        blackDot(canvasID,30,10,5);
    } // END dots IF
} // END trialFigures FUNCTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function blackDot (canvasID, posX, posY, sizeCirckel) {
    // GOAL: draw a single black circkle
    // INPUT VARIABLES
            // canvasID: id of the canvas to be drawn on
            // posX: X position of center of circkel relative to canvas border
            // posY: Y position of center of circkel relative to canvas border
            // sizeCirckel: size of circkel (dependent on canvasSize in BVT task)
        
        // CALL CANVAS
            var c = document.getElementById(canvasID);         // draw on prespecified canvas (see HTML)
            var ctx = c.getContext("2d");                                    // unkown functionality but necessary 
        
        // DRAW CIRCKEL
            ctx.beginPath();                                                        // initialize drawing
            ctx.fillstyle = "black";                                                 // specify fill color = black
            ctx.arc(posX,posY,sizeCirckel,0,2*Math.PI);            // specification of shape to draw (in this case a circkle)
            ctx.lineWidth = 1;                                                          // size of the line to be drawn
            ctx.strokeStyle = "black";                                          // color of line; black
            ctx.stroke();                                                               // draw specified shape
            ctx.closePath();                                                        // to allow for other figures to be drawn
            ctx.fill();                                                                     // execute
} // END blackDot FUNCTION    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SET VARIABLES
warning = true; // make global so accessed on each canvas response

function trialResponses () {
    // GOAL: to ensure that the canvas - upon mouse click - gets 
        // ... crossed out or corrected & new instructions are displayed
    // INPUT VARIABLES: none 
  
// DETERMINE RELEVANT CANVAS
    var currentID = event.currentTarget.id; // log id of current canvas that triggered the function
    var index = (currentID.replace("Canvas", "")-3); // -3 because index starts at 0 and ID starts at 3
    
// DETERMINE REQUIRED RESPONSE 
    var clicks = clickArray[index]; // access clickArray to determine how many times a canvas has already been clicked

if (index == 1) { // Figure with 4 dots clicked
    if (clicks == 0) { // first response 
        // DRAW RESPONSE
            drawResponse (clicks, currentID); // draw correct response
        
        // DISPLAY NEW INSTRUCTIONS
              document.getElementById("maintext").innerHTML = 
                    ("Easy right? But what if you clicked a figure with 3 or 5 dots" +
                        " by accident? Try clicking a figure twice and see what happens");
            warning = false;

    } else { // second > response
        window.alert("You should click a figure with 4 dots only once!");
    } // END click IF
} // END Figure 4 IF

if (index == 0 || index == 2) { // FIgure with 3 or 5 dots clicked
    if (warning == true) { // first click, but Figure with 4 dots not clicked yet
     window.alert("You should click the figure with 4 dots (the middle figure) first.");   
    } else if (clicks == 0 && warning == false) {
        // DRAW RESPONSE
            drawResponse (clicks, currentID); // draw correct response
            
        // DISPLAY NEW INSTRUCTIONS
        document.getElementById("maintext").innerHTML = ("Well done; now click again to correct!");
        
    } else if (clicks == 1 && warning == false) {
        // DRAW RESPONSE
            drawResponse (clicks, currentID); // draw correct response
        
        // DISPLAY NEW INSTRUCTIONS
            document.getElementById("maintext").innerHTML = 
                ("Well done! You are ready to practice for the real Bourdon Vos Test" + "<br>" +
                "You will now see an example of the first row of the test. You have to move the mouse over each square/figure so that it turns grey. If you see a figure with 4 dots, you click it, just like we practiced. If you make a mistake, remember you can click again to remove the red line! Try and complete the row as fast as possible (turning all squares grey) and click 'I'm finished'." + 
                "<br>" + "Now click 'Let's Practice' to get going.");
            
            // SET NEW BUTTON
                document.getElementById("button").innerHTML = "Let's Practice"; // change text
                document.getElementById("button").style.visibility = "visible"; // make visible
                document.getElementById("button").onclick = function() { trialPresentation()  }; // loads 1 row of stimuli to practice the BVT
                
            // STORE DATA
                sessionStorage.setItem("trialCompleted", "true"); // log that familiarization was already completed / task was practiced.

        } // END clicks  IF           
} // END Figure 3/5 IF

// TESTS
    // All tests are done by checking whether the correct mouse response & alert is displayed on screen
    // console.log("Familiarization was completed: [true]" + sessionStorage.getItem("trialCompleted"));
        
} // END responseActive FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawResponse (clicks, canvasID) {
    // GOAL: to draw the appropriate mouse response on canvas
        // i.e. 1 click = draw red line
        // 2nd mouse click = correction = remove red line
    // INPUT VARIABLES
        // clicks: amount of times a canvas has been clicked before
        // canvasID: id of the canvas upon which the response should be drawn
        
// SET VARIABLES
    var canvasWidth = document.getElementById(canvasID).width; // determine canvas width
    var canvasHeight = document.getElementById(canvasID).height;  // determine canvas height   
    var index = (canvasID.replace("Canvas", "")-3); // -3 because index starts at 0 and ID starts at 3
  
        if (clicks == 0) {
            // canvas has not been clicked - draw red line
                    var c=document.getElementById(canvasID);              // refer to correct canvas
                    var ctx=c.getContext("2d");                                         // unkown but necessary
                    imageData = ctx.getImageData(0,0,canvasWidth, canvasHeight); // store canvas picture global as is (to allow corrections)
                    ctx.beginPath();                                                           // start new drawing
                    ctx.moveTo(0,0);                                                          // determine starting position of line - constant
                    ctx.lineTo(canvasWidth,canvasHeight);                       // finish position of line - changes on canvas size specified in taskFamiliarization function.
                    ctx.lineWidth = 4;                                                          // size of the line to be drawn
                    ctx.strokeStyle = "#ff0000";                                          // color of line; red
                    ctx.stroke();                                                                  // initialize drawing 
                    clickArray[index] = 1;                                                    // increment clicks to 1
        } else if (clicks == 1) {
            // second response, draw correction line
                    var c=document.getElementById(canvasID);               // refer to correct canvas
                    var ctx=c.getContext("2d");                                           // unkown but necessary
                    ctx.putImageData(imageData, 0,0);                               // reset previous picture (i.e. remove red line)
                    clickArray[index] = 2;
        } else {
            // do nothing, pictures should not be clicked more than twice
        } // END clicks IF

// TESTS
    // No tests possible other than visual confirmation of the mouse response on screen        

} // END drawResponse FUNCTION


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// PARTICIPANT ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// PRACTICE - 1 ROW //////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GOAL
// The participant is provided with a first row of the Bourdon Vos Test
// The responses are not validated in accordance to Bourdon Vos Test norms

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATE PP ENVIRONMENT
    // style in CSS file [bv_css.css]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function trialPresentation() {
    
    stimuliColumns = 24; // practice specified in Bourdon Vos Test
    stimuliRows = 1; // practice specified in Bourdon Vos Test
    totalStimuli = stimuliColumns * stimuliRows; // (24*1) = 24 stimuli
  
    // CALL 
    stimuliPresentation ("trial"); // create response active stimuli // condition == "trial"
        
} // END TRIAL

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// stimuliPresentation function written below

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// PARTICIPANT ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// BOURDON VOS TEST ////////////////////////////////////// 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 // GOAL
 // The participant preforms the actual Bourdon Vos Test
 // All responses are logged and stored in temporary memory for score calculation in the results section

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function stimuliPresentation (condition) {
    // GOAL: to present stimuli on screen which pp can respond to,
        // ... and which tracks responses
    // INPUT VARIABLES: 
        // condition: "trial" / "bvt" > determines terminationButton functionality
    
    // HIDE NON-RELEVANT COMPONENTS
        document.getElementById("maintext").style.visibility = "hidden"
        
    // INITIALIZE VARIABLES
        var horizontal = 1; // horizontal canvas counter
        var vertical = 1; // vertical canvas counter
        var posLeft = 0; // where canvas is placed, adjusted in loop
        var posTop = 0; // where canvas is placed, adjusted in loop
        sessionStorage.setItem("start", currentTime()); // store start time until tab is closed, used for result calculations.
    
    // CREATE EMPTY RESPONSE ARRAYS
        dotArray = []; // store which canvas contains which amount of dots
        outerBorder = 15; // distances between canvas and window border
        canvasBorder = 1; // distance between canvasses
        responseTimeArray = []; // store currentTime per canvas
        clickArray = []; // store how many time a canvas was clicked
        responseArray = []; // log hits/misses/false alarms
        correctionArray = []; // log whether response was corrected
        responseOrderArray = []; // log order of canvases responded to
  
    // REMOVE ANY EXISTING CANVASES
        // (e.g., after practice trials were presented)
        var element = document.getElementById("stimuli");
            while (element.firstChild){
                // loop while there is a child to the <div> element "stimuli";
                element.removeChild(element.firstChild); // remove canvasElement
            } // END while LOOP
    
    // DETERMINE MAX. CANVAS SIZE
        // limited to be between 50 (smaller = warning message) 
        // ... & 80 (larger are condensed to 80)
        var canvasWidth = canvasSize(); // size returned from canvasSize function
        var canvasHeight = canvasWidth; // make square. Computer screens wider than high.
        
    // DETERMINE STIMULI TO CREATE
        // Create an array with 1/3 of totalStimuli containing "3", "4", or "5" > will represent amount of dots later on
        for (i = 3; i < 6; i++) {
            for (x = 1; x < ((totalStimuli / 3) + 1); x++) { // +1 because counter starts at 1 (cannot divide by 0)
                dotArray.push(i)    // add the number (i) to the entire array
            } // END 1/3 of figure LOOP
            
            // TEST
               // console.log("Length of dot Array after " + (i-2) + " loop(s) = " + dotArray.length); //i-2 because i starts at 3
               // console.log("CONDITION: This is " + (i-2) + "/3 of the totalStimuli (" + totalStimuli + ") [true]: " + (((totalStimuli / 3) * (i-2)) == dotArray.length)); // 1/3 of stimuli to be created consists of 3/4/5 dot figures
            
        } // END create dot array LOOP
    
    // RANDOMIZE PRESENTATION ORDER
        shuffleArray(dotArray); // shuffle content of dotArray to allow for random figures on screen
        // TEST
            // console.log("The shuffled dot Array looks like this: " + dotArray); // determine if content shuffled
    
    // CREATE CANVASES WITH DRAWN DOT FIGURES
        for (t = 1; t < (totalStimuli +1); t++) { // totalStimuli + 1 because counter starts at 1
            var canvasID = "Canvas" + t; // change canvas id name for each created canvas

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
      
            // CREATE EMPTY CANVAS
            createCanvas("stimuli", canvasID, canvasHeight, canvasWidth, posLeft, posTop);   
            
            // DRAW FIGURES ON CANVAS
                var sizeCirckel = dotCoordinates (canvasID); // circkel size dependent on canvas size
                    var dots = dotArray[(t-1)]; // -1 because index starts at 0
                    
                    for (k = 0 ; k < dots; k++) { // loop for amount of dots to be drawn
                        var index =  indexArray[k]; // array containing the possible index of each X&Y coordinate (prevents overlap)      
                        var posX = arrayXpos[index]; // index unique X coordinate for dot
                         var posY = arrayYpos[index]; // index unique Y coordinate for dot
                        blackDot (canvasID, posX, posY, sizeCirckel) // draw black dot
                } // END drawing figures LOOP
                
            // SET CLICKS TO 0 FOR ALL CANVASES
                clickArray.push(0); // allows for accurate response logging
        } // END create canvas LOOP  
        
    // TEST
        // console.log("VISUAL CHECK [dotArray order matches figures on screen?]: dotArray = " + dotArray); // TEST if correct dots are displayed on screen (no overlap between circkles)
        // console.log("clickArray length == totalStimuli? [true] " + (clickArray.length == totalStimuli));  // TEST: should be equal to totalStimuli, to allow for accurate response logging.
        // console.log("CONFIRM: Check correct amount fo stimuli created in Elements > body > <div id = 'stimuli' > amount of canvases!");

    // PRESENT FINISH BUTTON
        document.getElementById("button").innerHTML = "I am finished"; // change text
        document.getElementById("button").style.position = "absolute"; // set position
        document.getElementById("button").style.top = ((stimuliRows+0.5) * canvasHeight); // set position below all canvases
        document.getElementById("button").style.left = (outerBorder + canvasBorder); // align left
        document.getElementById("button").onclick = function() { terminationButton(condition) }; // upon clicking store data & go to results

} // END stimuliPresentation FUNCTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function canvasSize() {
    // GOAL: determine size of screen and adjust size of the presented stimuli to be as
        // ... large as possible
    // ASSUMPTION: Computer & Laptop screens are wider than they are high. 
        // ... Thus in order to create maximum sized squares, only the width needs to be taken into account.
    
    // DETERMINE WINDOW SIZE
           var winWidth = (window.innerWidth - (2* outerBorder)); // available amount of pixels on the inside of the window
            
    // CALCULATE MAX CANVAS WIDTH
        var canvasWidth = (winWidth / (stimuliColumns)); // -4 to allow for room for the borders between canvases & the side of the window
        
    // SET MAX/MIN DIMENSIONS:
        if (canvasWidth > 80) {
            canvasWidth = 80;
        } else if (canvasWidth < 50) {
          window.alert("Screen too small to display Bourdon Vos Test. Please  call your Experiment Leader to adjust the window size (i.e. make fullscreen) & reload.");
            // pp will reload until window is large enough to display 24 figures in the width of the screen  
            // NOTE: this should have already been done by Experiment Leader upon O-BVT start
            
        } // END IF

// TEST
    // console.log("CanvasWidth = " + canvasWidth);
    // console.log("CONDITION: canvasWidth falls between 50 & 80 [true]: " + (canvasWidth > 50 && canvasWidth < 80));

     return canvasWidth;
}  // END canvasSize FUNCTION


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE: function not written by author. 
// SOURCE: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffleArray(array) {
    // GOAL: to shuffle the content of an array (e.g., to create random presentation of stimuli)
            for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
    
    // TEST
        // test done when shuffle function is used 
    
        return array;
} // END shuffleArray FUNCTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createCanvas (appendObject, canvasID, canvasHeight, canvasWidth, posLeft, posTop) { 
    // GOAL: create a new RESPONSIVE empty canvas
    // INPUT VARIABLES:
        // appendObject: ID of the object to which the canvas should be appended <div id = "stimuli">
        // canvasID: name you want to give to the created canvas
        // canvasHeight:  height of the canvas
        // canvasWidth: width of the canvas
        // posLeft: left side of the canvas should be placed on which X-coordinate (in pixels)
        // posTop: top side of the canvas should be placed on which Y-coordinate (in pixels)

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
        addCanvas.onmouseover = function () {canvasMouseOver()} ; // when mouse enters the canvas
        addCanvas.onmouseout = function () {canvasMouseOut()} ; // when mouse leaves the canvas (delayed by 200 ms)

    // APPEND CANVAS TO EXISTING OBJECT
        document.getElementById(appendObject).appendChild(addCanvas); // append newly created canvas to existing element 
        
    // TEST
        // response actions tested within functions
        // proporties confirmed through visual confirmation
        
} // END createCanvas FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

function responseLogging () {
    // GOAL: Cross out a figure when clicked once (draw single red line)
    // ... & correct the figure when clicked twice (remove red line/ restore previous picture)
    // INPUT VARIABLES: none
    
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
                    ctx.putImageData(imageData, 0,0);                              // reset previous picture (i.e. remove red line)
                    clickArray[index] = 2;
        } else {
            // do nothing, pictures should not be clicked more than twice
        } // END clicks IF

// TEST
    // visual confirmation
          
} // END responseLogging FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

function canvasMouseOver () {
    // GOAL: set current time when hovering over canvas
    // ... used in conjunction with canvasMouseOut ()
    
    // SET VARIABLES
        var currentID = event.currentTarget.id; // log id of event that triggered the function
        startHover = currentTime(); 
               
} // END canvasMouseOver FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

function currentTime () {
    // GOAL: retrieve the current time in Javascript since 1st January 1970
    // .... time in seconds!
    
    var time = new Date ();
    return time.getTime();

    // TEST
       // console.log("time = " + time);

} // END currentTime FUNCTION


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvasMouseOut () {
    // GOAL: color canvas grey if on mouseout more than 500 miliseconds have passed since mouseover     
        // SET VARIABLES
        var currentID = event.currentTarget.id; // log id of event that triggered the function
        var finishHover = currentTime(); 
        var index = (currentID.replace("Canvas", ""))-1; // replace "Canvas" by nothing so unique number remains, -1 because index starts from 0
        
        if ((finishHover - startHover) > 200) { // delay response so only activated when "hovered" for 300 miliseconds
            // CHANGE BG COLOR
            document.getElementById(currentID).style.backgroundColor = "#CCCCCC"; // change bg color to grey
            
            // STORE RESPONSE TIMES
            responseTimeArray.push(finishHover);
            
            // STORE RESPONSE MADE
                // extract amount of dots presented in figure
                    var amountDots = dotArray[index];
                    responseOrderArray.push(index); // store number of canvas
                
                // TEST
                    // console.log("CONFIRMATION: amountDots clicked canvas = " + amountDots);
                
                // CODE RESPONSES (only cross out (click = 1) figures with 4 dots)
                        // responses: HIT (1), Miss (2), False Alarm (3) 
                        // corrections: NO (0), YES (1)
                    if (amountDots == 3 || amountDots == 5) {
                        // do not click (click == 0) or correct mistake (click == 2) == HIT
                        if (clickArray[index] == 0) {                           // No click = CORRECT  // NOTE: not coded because function only activated upon mouseclick
                            responseArray.push(1);                             // HIT
                            correctionArray.push(0);                            // NO
                        } else if (clickArray[index] == 1) {                // 1 click == WRONG (only click figures with 4 dots)
                            responseArray.push(3);                              // FALSE ALARM
                            correctionArray.push(0);                               // NO
                        } else {                                                        // 2 clicks == CORRECTION
                            responseArray.push(1);                          // HIT
                            correctionArray.push(1);                            // YES
                        } // END  click amount IF
                    } else { // amountDots == 4
                         if (clickArray[index] == 0) {                  // no click == WRONG // NOTE: not coded because function only activated upon mouseclick
                            responseArray.push(2);                          // MISS
                            correctionArray.push(0);                         // NO
                        } else if (clickArray[index] == 1) {        // 1 click == CORRECT
                            responseArray.push(1);                          // HIT
                            correctionArray.push(0);                        // NO
                        } else {                                                   // 2 clicks == unjust correction aka WRONG
                            responseArray.push(2);                      // MISS
                            correctionArray.push(1);                     // YES
                        } // END click amount IF
                    } // END amountDots  IF
                            
                    // TEST
                            // console.log("responseArray = " + responseArray);
                            // console.log("correctionArray = " + correctionArray);
                            // console.log("response order Array = "+ responseOrderArray);
                            
            // STORE RESPONSE TIMES
                    responseTimeArray.push(currentTime()); // store current Time in responseTimeArray
                            
        } // END hover IF   
} // END canvasMouseOut FUNCTION
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function dotCoordinates (canvasID) {
    // GOAL: create a combination of X & Y coordinates that match size of the canvas
        // ... to allow for unique dot placement on canvas
    // INPUT VARIABLES
        // canvasID: id of canvas to be drawn on
    // NOTE: currently creates a 3 x 3 grid, could be extended to make more complicated figures (if more dots in each figure)
        
        // SET VARIABLES
            var canvasWidth = (document.getElementById(canvasID).width - 6); // -6 to allow for 3px blank border where no circkel is drawn
            var canvasHeight = (document.getElementById(canvasID).height - 6); // -6 to allow for 3px blank border where no circkel is drawn
            var sizeCirckel = (canvasWidth / 11); // divide by 11 to allow blank spaces between the dots

            arrayXpos = []; // create empty X-coordinate array
            arrayYpos = []; // create empty Y-coordinate array
        
        // CALCULATE POSSIBLE X COORDINATES
                for (q = 1; q < (3 + 1); q++) { // repeat X coordinates for all coordinates of Y
                    for (k = 1; k < (3 + 1); k++) {  // positions for the amount of horizontalCirckles specified (+1 because k = 1, for caluclations)
                        var posX = ((3 * sizeCirckel) * k); // (should be changed depending on canvas & circkel size)
                        arrayXpos.push(posX); // append new position to array containing all X coordinates
                    } // END horizontal LOOP
                } // END vertical LOOP
     
        // CALCULATE POSSIBLE Y COORDINATES
                for (w = 1; w < (3 + 1); w++) {  // repeat Y coordinates for all coordinates of X
                     for (l = 1; l < (3 + 1); l++) { // positions for the amount of verticalCirckles specified (+1 because l = 1)
                        var posY = ((3 * sizeCirckel) * l);  // change depending on circkelSize
                        arrayYpos.push(posY); // append new position to array containing all Y position
                    } // END vertical LOOP
                } // END horizontal LOOP

        // SORT Y ARRAY TO CREATE UNIQUE COMBINATION OF X & Y COORDINATES            
              arrayYpos.sort(); // ascending order
                 
      // ALLOW RANDOM XY POSITIONS
        indexArray = [];  // create new Array for random indexing out of XY coordinate arrays
            for (y = 1; y < 9; y++) {   // create integers for each point in the grid (1 - 9) (3x3)
                    indexArray.push(y); // append integer to indexArray
                } // END for LOOP
        shuffleArray(indexArray); // shuffle order of integers to allow for random indexing (i.e. dot placement)
    
    
// TEST
   // console.log("Dot X coordinates are: " + arrayXpos);
   //  console.log("Dot Y coordinates are: " + arrayYpos);
   //  console.log("CONFIRMATION: arrayXpos and arrayYpos create unique combinations of positions in 3 x 3 grid.")
    
    return sizeCirckel; // for drawing figures
} // END positionGrid FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // blackDot function written above (PARTICIPANT - PRACTICE - STIMULI)

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function terminationButton (condition) {  
    // GOAL:
        // condition == "trial": load BVT
        // condition == "bvt" / else: store data & continue to results page
    // INPUT VARIABLES
        // condition: whether the practice trial is completed or the task is completed
 
    if (condition == "trial") {             
        // PREPARE PARTICIPANT
           window.alert("Well done! You are now going to start the real Bourdon Vos Test. Rember to only click those figures with 4 dots, and to move your mouse over each figure so it turns grey. If you accidently clicked a figure with 3 or 5 dots, click again to correct your mistake. Try and complete the task as fast as possible. Good Luck!");
        
        // PRESENT BV TASK
                stimuliColumns = 24; // 24 specified in Bourdon Vos Test
                stimuliRows = 33; // 33 specified in Bourdon Vos Test
                totalStimuli = stimuliColumns * stimuliRows;

                stimuliPresentation ("bvt");  // present actual task

    } else {
    // BVT completed so save all data!
    
    // STORE DATA
        // startTime stored on window load
        sessionStorage.setItem("finish", currentTime()); // store finish Time
        sessionStorage.setItem("stimuliRows", stimuliRows); // store amount of rows containing stimuli
        sessionStorage.setItem("stimuliCols", stimuliColumns); // store amount of columns containing stimuli
        
        sessionStorage.setObj("ARRAY_MADE_RESPONSES", responseArray); // responses made
        sessionStorage.setObj("ARRAY_MADE_CORRECTIONS", correctionArray); // corrections made
        sessionStorage.setObj("ARRAY_CANVAS_RESPONSE_ORDER", responseOrderArray);  // order in which responses were made
        sessionStorage.setObj("ARRAY_N_DOTS", dotArray);  // amount of dots in each figures
        sessionStorage.setObj("ARRAY_RESPONSE_TIMES", responseTimeArray); // response times per canvas
        
     
     // LOAD RESULTS PAGE
        window.location.href = "bv_results.html";

    } // END trial IF    
    
    // TEST
        console.log("I have stored the data in array format (e.g., responseOrderArray): " + responseOrderArray);
          
} // END terminationButton FUNCTION


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

// SOURCE: https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
// FROM INTERNET - ALLOWS FOR ARRAY STORAGE IN TEMP MEMORY
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   























