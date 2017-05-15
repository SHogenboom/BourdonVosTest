// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/BVTest_Duplicate.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

// SET [GLOBAL] VARIABLES
var responseArray = [];
var clickArray = [];
var correctionArray = [];
var responseOrderArray = [];
var canvasIdArray = ["Canvas1"];        

// INITIALIZE FUNCTIONS
window.onload = stimulusPresentation ("stimuli", 5,3,3);
window.onload = startTime();


//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// MAIN FUNCTION /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

function stimulusPresentation (appendObject, sizeCirckel, verticalCirckles, horizontalCirckles) {
    // GOAL: Fill screen with responsive canvasses containing random dot figures.
    // NOTE: incoorporates all supporting functions
            // appendObject: ID of the object to which the canvas should be appended
            // sizeCirckel = enlarge or decrease circkel size (currently only works for value < 6)
            // verticalCirckles = amount of circkles to be drawn vertically (i.e. height of grid)
            // horizontalCirckles = amount of circkles to be drawn horizontally (i.e. width of grid)
       
    // INITIALIZE VARIABLES
    appendObject = appendObject;
    sizeCirckel = sizeCirckel;
    verticalCirckles = verticalCirckles;
    horizontalCirckles = horizontalCirckles;
        
    // window.alert("appendObject = " + appendObject + " sizeCirckel = " + sizeCirckel + " verticalCirckles = " + verticalCirckles + " horizontalCirckles = " + horizontalCirckles);    // TEST
        
    // CALL firstCanvas to create 1st figure >> sets subsequent sizes
        var dots1 = firstCanvas(appendObject, sizeCirckel, verticalCirckles, horizontalCirckles);
     //   window.alert("amount of dots in figure 1 = " + dots1);    // TEST
            
    // CALL maxFigures to determine how many figures to create + present
        var totalFigures = maxFigures();
        // window.alert("amount of figures to present = " + totalFigures);             // TEST
    
    // CREATE clickArray to log mouseclicks
        clickArray = [];
        for (y = 0; y < totalFigures; y++) { clickArray.push(0); }                                           // for each canvas start amount of clicks at 0            
       //  window.alert("ensure click array contains 0: " + clickArray);                                // TEST
      //  window.alert("ensure length of 0's = " + clickArray.length + " = " + totalFigures); // TEST
        
    // CALL dotArray to calculate amount of 3/4/5 dot figures (balanced) and randomize order of presentation
        dotsArray = randomizeDots(totalFigures, dots1, 3, 5);
    
    // LOOP to fill screen with max amount of responsive figures
        for (z = 2; z < (totalFigures +1); z++) {                    // start at 2 because first canvas was already created
            var ID = "Canvas" + z;                                 // Change .id for each newly created canvas
            canvasIdArray.push(ID);                             // store number for later reference to canvasIDs
            createCanvas (appendObject, ID);            // call upon createCanvas (see below) to create responsive canvas
                
            var dots = dotsArray[z-2];                          // -2 because index starts at 0
            randomFigure (ID, 10,10,sizeCirckel, horizontalCirckles, verticalCirckles, dots); // call upon randomFigure (see below) to create random dot figure
          } // END FOR LOOP  
} // END stimulusPresentation FUNCTION        
        
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getRandomInt(min, max) {
      // GOAL: get a random integer in a range from min to max
        return Math.floor(Math.random() * (max - min + 1) + min);
    } // END RandomInt FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NOTE: Function from internet
function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
        return array;
        } // END shuffleArray FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function firstCanvas (appendObject, sizeCirckel, horizontalCirckles, verticalCirckles) {
    // GOAL: create first canvas with random dots to allow for calculations of how many figures to present (based on stimulus size)
            // appendObject: object to which the created canvas should be appended (div "stimuli")
            // sizeCirckel: how large the dots should be (< 6)
            // horizontalCirckles: width of the grid of dots
            // verticalCirckles: height of the grid of dots
            
    createCanvas(appendObject, "Canvas1");                                                                              // create new responsive canvas
    var dots1 = getRandomInt(3, 5);                                                                                              // randomly select to present 3 / 4 / 5 dots
    randomFigure ("Canvas1", 10,10,sizeCirckel, horizontalCirckles, verticalCirckles, dots1);    // draw figure with dots1 amount of dots 
    
    return dots1;
} // END firstCanvas FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function maxFigures () {
    // GOAL: determine how many whole figures will fit the current window
        // no input variables required, variables calculated within function
    
    // Determine size of window, using || allows for this function to work in Explorer and other browsers (from internet);
         var winWidth = window.innerWidth												
                || document.documentElement.clientWidth  || document.body.clientWidth;
         var winHeight = window.innerHeight 												
               || document.documentElement.clientHeight || document.body.clientHeight;
                    
    // Determine size of first canvas that was presented
        var stimWidth = document.getElementById("Canvas1").width;
        var stimHeight = document.getElementById("Canvas1").height;
          
    // Calculate max number of pictures to fit the window
        var winHeight = winHeight - stimHeight;  // to allow room for "finish" button
        var totalFigures = (((Math.floor(winWidth / stimWidth))-1)  * ((Math.floor(winHeight / stimHeight)))); //Math.floor rounds the outcome down to an integer. -1 to allow room for the button
        return totalFigures;
} // END maxFigures FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function randomizeDots (totalFigures, dots1, minDot, maxDot) {
    // GOAL: determine how many 3/4/5 dot figures should be presented. Randomize order of presentation
        // totalFigures: amount of figures that will be presented on screen (return from maxFigures function)
        // dots1: whether figure 1 contains 3, 4, or 5 dots (var created in stimulusPresentatoin function)
        // minDot: minimum amount of dots in each figure (BVTest set at 3)
        // maxDot: maximum amount of dots in each figure (BVTest set at 5)
     
    // INITIALIZE variables   
    var dotsArray = [];                            // is used in randomFigure function to specify the amount of dots that should be drawn
    if (minDot != 3 || maxDot != 5) {       // restore values to 3 & 5 if other values were specified, not yet supported
        window.alert("Currently unable to support figures other than 3-4-5 dots." + "<br>" + "minDot = 3 && maxDot = 5"); // NOTIFICATION
        var minDot = 3;
        var maxDot = 5;
    } // END IF
    
    // LOOP for each amount of dots between minDot and maxDot
    for (e = minDot; e < (maxDot + 1); e++) {                                           // + 1 because < than is used
        var amountFigures = totalFigures / ((maxDot - minDot) );             // divide by 3
        
        // BALANCE 
            // Decrease amountFigures by 1 if first Figure (dots1) contains that amount of dots
            if (dots1 === 3 && e === 3) {                               // change amount of figures to create with one less depending on the amount of dots the first figure contains
                // window.alert((dots1 === 3 && e === 3));
                var amountFigures = (amountFigures - 1);
            } else if (dots1 === 4 && e === 4) {
                // window.alert((dots1 === 4 && e === 4));
                var amountFigures = (amountFigures - 1);
            } else if (dots1 === 5 && e === 5) {
                //  window.alert((dots1 === 5 && e === 5));
                var amountFigures = (amountFigures - 1);
            } else {
                // do nothing
            } // END IF
                // window.alert(amountFigures);
            
        // FILL dotsArray with 1/3 of totalFigures 3, 1/3 4, 1/3 5
            for (r = 0; r < amountFigures; r++) {           // append 1/3 of totalFigures with 3 dots, 1/3 4 dots, 1/3 5 dots
                dotsArray.push(e);
            } // END dotsArray FILL 
     } // END dot LOOP   
    
    // RANDOMIZE dots order
        shuffleArray(dotsArray);                            // shuffle to create random order of figures
        dotsArray.unshift(dots1);                   // append firstly created canvas to the total array of Dots (for response tracking)
        // window.alert(dotsArray);
        
    return dotsArray;
} // END randomizeDots FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createCanvas (appendObject, canvasID) { 
    // GOAL: create a new reponsive EMPTY canvas
        // appendObject: ID of the object to which the canvas should be appended <div id = "stimuli">
        // canvasID: name you want to give to the created canvas

    // CREATE CANVAS
        var addCanvas = document.createElement('canvas');       // Create new canvas element
    
    // ASSIGN PROPERTIES
        addCanvas.id = canvasID;                                                  // .id to change on what is specified (itterates in stimulusPresentation function)
        addCanvas.width = 100;                                                     // determine canvas width (manipulated in randomFigure function)
        addCanvas.height = 100;                                                   // determine canvas height (manipulated in randomFigure function)
        // addCanvas.style.border = "1px solid";                //  #d3d3d3" draw light grey border around canvas

    // ASSIGN RESPONSE ACTIONS
        addCanvas.onmouseover = function () { getID () } ;          // call upon getID function to register ID element that triggered function
        addCanvas.onclick = function () {responseLogging (canvasID, canvasWidth, canvasHeight) } ; // call upon responseLogging to track correct crossout and log hits/miss/mistakes

    // APPEND RESPONSE ACTIVE CANVAS
        document.getElementById(appendObject).appendChild(addCanvas); // append newly created canvas to exisitng element 
    
} // END createCanvas FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getID () {
    // GOAL: return ID of the canvas on which the mouse is hovering
        // no input variables
        // no var to make globally accesible
        currentID = event.currentTarget.id;                                 // register id of element that triggered the function
        return currentID;
        // window.alert(currentID);                                               // TEST
} // END getID FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function responseLogging (canvasID, canvasWidth, canvasHeight) {
    // DETERMINE CURRENT CANVAS
        var ID = canvasID;
        var index = (ID.replace("Canvas", ""))-1; // replace "Canvas" by nothing so unique number remains, -1 because index starts from 0
              
    // LOG MOUSECLICKS
        var clicks = clickArray[index];
        if (clicks == 0) {
            // canvas has not been clicked - draw line
                    var c=document.getElementById(canvasID);              // refer to correct canvas
                    var ctx=c.getContext("2d");                                         // unkown but necessary
                    ctx.beginPath();                                                           // start new drawing
                    ctx.moveTo(0,0);                                                          // determine starting position of line - constant
                    ctx.lineTo(canvasWidth,canvasHeight);                       // finish position of line - changes on canvas size specifiedin drawGrid function
                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                    ctx.strokeStyle = "#ff0000";                                          // color of line; red
                    ctx.stroke();                                                                  // initialize drawing 
                    clickArray[index] = 1; 
        } else if (clicks == 1) {
            // second response, draw correction line
                    var c=document.getElementById(canvasID);               // refer to correct canvas
                    var ctx=c.getContext("2d");                                           // unkown but necessary
                    ctx.beginPath();                                                            // start new drawing
                    ctx.moveTo(canvasWidth,0);                                        // determine starting position of line (should depend on which canvas it is)
                    ctx.lineTo(0,canvasHeight);                                          // finish position of line (should depend on size of canvas)
                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                    ctx.strokeStyle = "#ff0000";                                         // color of line; red
                    ctx.stroke();                                                                 // initialize drawing
                    clickArray[index] = 2;
        } else {
            // do nothing
        } // END clicks IF
        
    // extract amount of dots presented in figure
          var amountDots = dotsArray[index];
           // window.alert(amountDots);
    
    // CODE RESPONSES (only cross out (click = 1) figures with 4 dots)
        // CODING: HIT (1), Miss (2), False Alarm (3) // NO (0), YES (1)
        if (amountDots == 3 || amountDots == 5) {
            // do not click (click == 0) or correct mistake (click == 2) == HIT
            if (clickArray[index] == 0) {                           // No click = CORRECT  // NOTE: not coded because function only activated upon mouseclick
                responseArray.push(1);                             // HIT
                correctionArray.push(0);                            // NO
                responseOrderArray.push(canvasID);
            } else if (clickArray[index] == 1) {                // 1 click == WRONG (only click figures with 4 dots)
                responseArray.push(3);                              // FALSE ALARM
                correctionArray.push(0);                               // NO
                responseOrderArray.push(canvasID);
            } else {                                                        // 2 clicks == CORRECTION
                // clickArray[index] == 2 
                responseArray.push(1);                          // HIT
                correctionArray.push(1);                            // YES
                responseOrderArray.push(canvasID);
            } // END if click
        } else {
            // amountDots == 4
             if (clickArray[index] == 0) {                  // no click == WRONG // NOTE: not coded because function only activated upon mouseclick
                responseArray.push(2);                          // MISS
                correctionArray.push(0);                         // NO
                responseOrderArray.push(canvasID);
            } else if (clickArray[index] == 1) {        // 1 click == CORRECT
                responseArray.push(1);                          // HIT
                correctionArray.push(0);                        // NO
                responseOrderArray.push(canvasID);
            } else {                                                   // 2 clicks == unjust correction aka WRONG
                // clickArray[index] == 2 
                responseArray.push(2);                      // MISS
                correctionArray.push(1);                     // YES
                responseOrderArray.push(canvasID);
            } // END if click
        } // END IF amountDots     
} // END correctResponse FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function randomFigure (canvasID, posX,posY,sizeCirckel, horizontalCirckles, verticalCirckles, dots) {
    // GOAL: to create a random figure containing 3 - 4 - 5 black dots 
            // canvasID: name of canvas on which to draw (itterated in stimulusPresentation)
            // posX: set at 10 (needs to be deleted)
            // posY: set at 10 (needs to be deleted)
            // sizeCirckel: change size of dots (currently only works for values < 6)
            // horizontalCirckles: width of imaginary grid of dots (i.e. possible X positions)
            // verticalCirckles: height of imaganinary grid of dots (i.e. possible Y positions)
            // dots: amount of dots to be drawn (randomized in stimulusPresentation)
     
    // SET VARIABLES
        var distance = posX + sizeCirckel;                                                              // distance between dots, currently not included in position calculations
         canvasWidth = ((distance * horizontalCirckles) + sizeCirckel) + posX;      // size of canvas bigger than range for drawing dots (recalculate)
         canvasHeight = ((distance * verticalCirckles) + sizeCirckel) + posY;          // size of canvas bigger than range for drawing dots (recalculate)
         
    // CREATE CANVAS OF CORRECT SIZE
       document.getElementById(canvasID).width = canvasWidth;       // change size of canvas (see HTML)
       document.getElementById(canvasID).height = canvasHeight;     // change size of canvas (see HTML)
    
    // DRAW 1 BLACK DOT 
        // blackDot (posX, posY, sizeCirckel, canvasID);                            
    
    // GENERATE RANDOM XY POSITIONS
      positionGrid (verticalCirckles, horizontalCirckles, sizeCirckel);         // call upon positionGrid function
            
      // shuffle XY positions
            var indexArray = [];                                                                     // create new Array for random indexing out of XY coordinate arrays
                for (y = 1; y < (horizontalCirckles * verticalCirckles); y++) {   // create integers for each point in the grid (1 - ...) 
                    indexArray.push(y);                                                             // append integer to indexArray
                } // END for LOOP
            shuffleArray(indexArray);                                                             // shuffle order of integers to allow for random indexing (i.e. dot placement)
            //  window.alert(indexArray);
      
     // DRAW ALL DOTS
      for (t = 0; t < dots; t++) {                                          // draw 3 / 4 / 5 dots
            var index = indexArray[t];                                  // random integer used to index from possible X and Y coordinate arrays
            // access randomly selected XY coordinates  
            var X = arrayXPos[index];                                // random - but unique - X coordinate
            var Y = arrayYPos[index];                                 // random - but unique - Y coordinate
  
            blackDot(X,Y, sizeCirckel, canvasID);                                // draw DOT in random placement
      } // END DRAWING DOTS       
} // END  randomFigure FUNCTION 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function blackDot (posX, posY, sizeCirckel, canvasID) {
        // GOAL: draw a single  black circkle
            // posX: X position of center circkel relative to canvas
            // posY: Y position of center circkel relative to canvas
            // sizeCirckel: increase size of circkel (currently only works for values < 6 )
        
        // call canvas  
            var c = document.getElementById(canvasID);         // draw on prespecified canvas (see HTML)
            var ctx = c.getContext("2d");                                    // unkown functionality but necessary 
        
        // draw circkel 
            ctx.beginPath();                                                        // initialize drawing
            ctx.fillstyle = "black";                                                 // specify fill color = black
            ctx.arc(posX,posY,sizeCirckel,0,2*Math.PI);            // specification of shape to draw (in this case a circkle)
            ctx.stroke();                                                               // draw specified shape
            ctx.closePath();                                                        // to allow for other figures to be drawn
            ctx.fill();                                                                         // execute
} // END blackDot FUNCTION    

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function positionGrid (verticalCirckles, horizontalCirckles, sizeCirckel) { 
        // GOAL: create an X and Y coordinate array depending on the amount of circkles that was specified 
                // verticalCirckles: height of grid
                // horizontalCirckles: width of grid
                // sizeCirckel: size of the circkles for between circkel distance
                
        // possible X positions
             arrayXPos = [];                                                                // create empty array accesible outside function
                for (q = 1; q < (verticalCirckles + 1); q++) {                 // repeat X coordinates for all coordinates of Y
                    for (k = 1; k < (horizontalCirckles + 1); k++) {         // positions for the amount of horizontalCirckles specified (+1 because k = 1)
                        var posX = ((3 * sizeCirckel) * k);                       // (should be changed depending on canvas & circkel size)
                        arrayXPos.push(posX);                                      // append new position to array containing all X coordinates
                    } // END horizontal LOOP
                } // END vertical LOOP
            // window.alert(arrayXPos);                                               // TEST
     
         // possible Y positions
            arrayYPos = [];                                                                // create empty array accesisble outside function
                for (w = 1; w < (horizontalCirckles + 1); w++) {           // repeat Y coordinates for all coordinates of X
                     for (l = 1; l < (verticalCirckles + 1); l++) {                // positions for the amount of verticalCirckles specified (+1 because l = 1)
                        var posY = ((3 * sizeCirckel) * l);                         // change depending on circkelSize
                        arrayYPos.push(posY);                                       // append new position to array containing all Y position
                    } // END vertical LOOP
                } // END horizontal LOOP
            //  window.alert(arrayYPos);                                               // TEST
            
            // sort so when paired with X creates unique XY coordinates
                 arrayYPos.sort();
} // END positionGrid FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function startTime () {
        // GOAL: log current Time
                // no input variables
        var sTime = new Date();
        var startTime = sTime.getTime();           
        // window.alert(startTime);       // TEST
        sessionStorage.setItem("start", startTime); // store until tab is closed so can be used on next page
} // END startTime FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function finishTime () {
        // GOAL: log current Time
          // no input variables
        var fTime = new Date ();
        finishTime = fTime.getTime();
        // document.getElementById("testing").innerHTML = (startTime - finishTime);  // TEST
        sessionStorage.setItem("finish", finishTime);
        // window.location.href = "/Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/BVFinalScreen.html";
} // END startTime FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FROM INTERNET - ALLOWS FOR ARRAY STORAGE
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function terminationButton () {  
    // STORE VARIABLES FOR CALCULATIONS
        // startTime saved in Function
        finishTime();  // finishTime saved in Function
        window.alert(responseArray);
        sessionStorage.setObj("responseArray", responseArray);                     // responses made
        sessionStorage.setObj("correctionArray", correctionArray);                    // corrections made
        sessionStorage.setObj("clickArray", clickArray);                                     // mouseclicks made
        sessionStorage.setObj("responseOrderArray", responseOrderArray);   // order in which responses were made
        sessionStorage.setObj("dotsArray", dotsArray);                                     // amount of dots in each figures
        sessionStorage.setObj("canvasIdArray", canvasIdArray);                       // IDs of canvasses that were created
        
         // load next page
        window.location.href = "/Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/BVFinalScreen.html";
} // END terminationButton FUNCTION

    