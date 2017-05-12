// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Test.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

// INITIALIZE VARIABLES
var corrected = "No"; // To determine wheter a grid has already been responded to (NEEDS WORK)

// INITIALIZE stimulusPresentation FUNCTION
window.onload = stimulusPresentation ("stimuli", 5,3,3);

// FUNCTION: stimulusPresentation
function stimulusPresentation (appendObject, sizeCirckel, verticalCirckles, horizontalCirckles) {
    // GOAL: Fill screen with canvasses containing grids of dots
            // appendObject: ID of the object to which the canvas should be appended
            // sizeCirckel = enlarge or decrease circkel size (currently only works for value 5)
            // verticalCirckles = amount of circkles to be drawn vertically (i.e. height of grid)
            // horizontalCirckles = amount of circkles to be drawn horizontally (i.e. width of grid)
            
    // DRAW 1st CANVAS + GRID
        createCanvas(appendObject, "Canvas1");
        drawGrid (10,10,sizeCirckel, verticalCirckles, horizontalCirckles, "Canvas1");
        
    // DETERMINE MAX AMOUNT OF GRIDS TO PRESENT
            // Determine size of window, using || allows for this function to work in Explorer and other browsers;
                    var winWidth = window.innerWidth												
                         || document.documentElement.clientWidth  || document.body.clientWidth;
                    var winHeight = window.innerHeight 												
                         || document.documentElement.clientHeight || document.body.clientHeight;
                    
            // Determine size of stimulus (i.e. the picture / grid of dots that is to be presented
                 var stimWidth = document.getElementById("Canvas1").width;
                 var stimHeight = document.getElementById("Canvas1").height;
          
            // Calculate  max number of pictures to fit the window
                 var totalPictures = ((Math.floor(winWidth / stimWidth)) * (Math.floor(winHeight / stimHeight))) + 1; //Math.floor rounds the outcome down to an integer. +1 because first img object gets hidden so need to display an extra

            // TEST
                    // document.getElementById("testing").innerHTML = totalPictures;    
                    
        // LOOP CREATION OF MAX AMOUNT GRIDS
            for (z = 2; z < totalPictures; z++) { //start at 2 because first canvas was already created
                var ID = "Canvas" + z;
                createCanvas (appendObject, ID);
               drawGrid (10,10,sizeCirckel, verticalCirckles, horizontalCirckles, ID);
            }
        
} // END stimulusPresentation FUNCTION

// CREATE NEW CANVAS
function createCanvas (appendObject, canvasID) { 
    // GOAL: create a new reponsive EMPTY canvas
        // appendObject: ID of the object to which the canvas should be appended
        // canvasID: passed forward from getID function on mouseover to correctionCross2 function

        var addCanvas = document.createElement('canvas');       // Create new canvas element
        addCanvas.id = canvasID;
        addCanvas.width = 100;                                                     // determine canvas width (should change depending on circkles)
        addCanvas.height = 100;                                                   // determine canvas height (should change depending on circkles)
        addCanvas.onmouseover =        
                function getIDs () {                                                      // add mouseover function to determine which grid the mouse is at
                        // GOAL: onmouseover canvas register which element it is and log id of element
                                // no input variables, because "stimID" is not defined as var this becomes a globally accesible variable!
                        stimID = event.currentTarget.id;                                                    // register id of element that triggered the function
                        // document.getElementById("testing").innerHTML = stimID;       // TEST: report id of element that was hovered over
                        } // END onmouseover FUNCTION
        addCanvas.onclick = 
                function correctionCross2 () {
                     // GOAL: draw a single line to cross out and a second line to correct for mistakes
                    // INITIALIZED: upon mouseClick on element as id'ed by "getIDs" function
    
                    // If corrected = "no" then the canvas has not yet been clicked (thus create 1 line to cross out)
                            if (corrected == "No") {
                                    var c=document.getElementById(canvasID);                  // refer to correct canvas
                                    var ctx=c.getContext("2d");                                         // unkown but necessary
                                    ctx.beginPath();                                                           // start new drawing
                                    ctx.moveTo(0,0);                                                          // determine starting position of line - constant
                                    ctx.lineTo(canvasWidth,canvasHeight);                       // finish position of line - changes on canvas size specifiedin drawGrid function
                                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                                    ctx.strokeStyle = "#ff0000";                                          // color of line; red
                                    ctx.stroke();                                                                  // initialize drawing 
                                    corrected = "Yes";                                                        // change so next click gets recognised as second response = correction
                            } else { // create a correction line so that a cross appears
                                    var c=document.getElementById(canvasID);                     // refer to correct canvas
                                    var ctx=c.getContext("2d");                                            // unkown but necessary
                                    ctx.beginPath();                                                            // start new drawing
                                    ctx.moveTo(canvasWidth,0);                                                        // determine starting position of line (should depend on which canvas it is)
                                    ctx.lineTo(0,canvasHeight);                                                           // finish position of line (should depend on size of canvas)
                                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                                    ctx.strokeStyle = "#ff0000";                                         // color of line; red
                                    ctx.stroke();                                                                 // initialize drawing
                                    corrected ="No";
                            } // END IF
                    } // END correctionCross FUNCTION
    document.getElementById(appendObject).appendChild(addCanvas); //append newly created canvas to exisitng element 
} // END createCanvas FUNCTION

// TEST: INTIALIZE createCanvas FUNCTION
    // createCanvas("stimuli", "test");

// DRAW CIRCKLES / GRID
function drawGrid (posX, posY, sizeCirckel, verticalCirckles, horizontalCirckles, canvasID) {
    // GOAL: Draw a canvas with a grid of 9 black dots
        // posX = place in the grid where the first circkel should be drawn
        // posY = place in the grid where the first circkel should be drawn
        // sizeCirckel = enlarge or decrease circkel size (currently only works for value 5)
        // verticalCirckles = amount of circkles to be drawn vertically (i.e. height of grid)
        // horizontalCirckles = amount of circkles to be drawn horizontally (i.e. width of grid)

    // SET VARIABLES
        var distance = posX + sizeCirckel;
        canvasWidth = (distance * horizontalCirckles) + sizeCirckel;
        canvasHeight = (distance * verticalCirckles) + sizeCirckel;
    
    // CREATE CANVAS OF CORRECT SIZE
       document.getElementById(canvasID).width = canvasWidth; // change size of canvas (see HTML)
       document.getElementById(canvasID).height = canvasHeight; // change size of canvas (see HTML)

    // INITIALIZE DRAWING OF CIRCKLES        
        for (i = 0; i < verticalCirckles; i++) {
            // GOAL: itterate vertical drawing of circkles for a specified amount of times (i.e. verticalCirckles)
        
                for (x = 0; x < horizontalCirckles; x++) {
                    // GOAL: itterate horizontal drawing of circkles for horizontalCirckles amount of times
        
                        if (x == 0) { // if on first itteration set beginposition so in next vertical loop, the horizontal drawing start at the same position
                            posXstart = posX;
                         } 
       
                        var c = document.getElementById(canvasID);       // draw on prespecified canvas (see HTML)
                        var ctx = c.getContext("2d");                                    // unkown functionality but necessary 
                        ctx.beginPath();                                                        // initialize drawing
                        ctx.arc(posX,posY,sizeCirckel,0,2*Math.PI);            // specification of shape to draw (in this case a circkle)
                        ctx.stroke();                                                               // draw specified shape
                        ctx.fillstyle = "black";                                                  // specify fill color
                        ctx.fill();                                                                      // execute filling of shape
                                                                                    
              
                        posX = posX + distance;     // increase position of X to place new circkles next to the other
                } // END HORIZONTAL LOOP
    
        posX = posXstart;   // reset posX for next horizontal line
        posY = posY + distance; // increase posY so next cirkles are drawn below the other one
    } // END VERTICAL LOOP    
} // END drawGrid FUNCTION

// TEST: INITIALIZE FUNCTION
//drawGrid(10,10,5,3,3, "myCanvas"); //posX, posY, sizeCirckle, verticalCirckles, horizontalCirckles, canvasID 
//drawGrid(10,10,5,3,3, "Canvas2");

// FUNCTIONS INCLUDED IN NEW CANVASSES - FOR TESTING
/*
// RESPOND TO MOUSECLICK WITH CROSS OUT & CORRECTION
function correctionCross () {
    // GOAL: draw a single line to cross out and a second line to correct for mistakes
    // INITIALIZED: upon mouseClick
    
    // If corrected = "no" then the canvas has not yet been clicked (thus create 1 line to cross out)
    if (corrected == "No") {
        var c=document.getElementById(stimID);         // refer to correct canvas
        var ctx=c.getContext("2d");                                         // unkown but necessary
        ctx.beginPath();                                                           // start new drawing
        ctx.moveTo(0,0);                                                          // determine starting position of line (should depend on which canvas it is)
        ctx.lineTo(50,50);                                                         // finish position of line (should depend on size of canvas)
        ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
*//*        ctx.strokeStyle = "#ff0000";                                          // color of line; red
        ctx.stroke();    
        corrected = "Yes"; 
    } else { // create a correction line so that a cross appears
        var c=document.getElementById(stimID);          // refer to correct canvas
        var ctx=c.getContext("2d");                                          // unkown but necessary
        ctx.beginPath();                                                            // start new drawing
        ctx.moveTo(50,0);                                                        // determine starting position of line (should depend on which canvas it is)
        ctx.lineTo(0,50);                                                           // finish position of line (should depend on size of canvas)
        ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
        ctx.strokeStyle = "#ff0000";                                         // color of line; red
        ctx.stroke();                                                                 // initialize drawing                                                         
    } // END IF
} // END correctionCross FUNCTION

// LOCATE WHICH GRID WAS ASSESSED & RETURN ID
function getID () {
    stimID = event.currentTarget.id;
    document.getElementById("testing").innerHTML = stimID; //TEST
} // END getID FUNCTION
*/
    
    
    
    

    