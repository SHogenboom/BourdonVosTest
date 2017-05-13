// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/BVTest.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

// INITIALIZE stimulusPresentation FUNCTION
window.onload = stimulusPresentation ("stimuli", 5,3,3);
var corrected = "No"; // neccesarry for crossingout reponsiveness (needs adjusting so that first cross always has the same direction)

////////////////////////////////////// MAIN FUNCTION /////////////////////////////////////

// FUNCTION: stimulusPresentation
function stimulusPresentation (appendObject, sizeCirckel, verticalCirckles, horizontalCirckles) {
    // GOAL: Fill screen with canvasses containing random dot figures.
    // NOTE: incoorporates all other functions
            // appendObject: ID of the object to which the canvas should be appended
            // sizeCirckel = enlarge or decrease circkel size (currently only works for value < 6)
            // verticalCirckles = amount of circkles to be drawn vertically (i.e. height of grid)
            // horizontalCirckles = amount of circkles to be drawn horizontally (i.e. width of grid)
         
    // DRAW 1st CANVAS + FIGURE (to be able to determine canvas size)
        createCanvas(appendObject, "Canvas1");                                                                      // create new responsive canvas
        randomFigure ("Canvas1", 10,10,sizeCirckel, horizontalCirckles, verticalCirckles, getRandomInt(3, 5));       // draw figure containing 3/4/5 dots
        
    // DETERMINE MAX AMOUNT OF FIGURES TO PRESENT
            // Determine size of window, using || allows for this function to work in Explorer and other browsers (from internet);
                    var winWidth = window.innerWidth												
                         || document.documentElement.clientWidth  || document.body.clientWidth;
                    var winHeight = window.innerHeight 												
                         || document.documentElement.clientHeight || document.body.clientHeight;
                    
            // Determine size of first canvas that was presented
                 var stimWidth = document.getElementById("Canvas1").width;
                 var stimHeight = document.getElementById("Canvas1").height;
          
            // Calculate max number of pictures to fit the window
                 var totalPictures = ((((Math.floor(winWidth / stimWidth)) -1) * ((Math.floor(winHeight / stimHeight))))) +1; //Math.floor rounds the outcome down to an integer. +1 because first img object gets hidden so need to display an extra
            
            // set random order 3/4/5 dots
                var arrayDots = [];
                      var amountFigures = totalPictures / 3;
                   
                    for (e = 3; e < 6; e++) {
                        for (r = 0; r < amountFigures; r++) {           // append 1/3 of totalPictures with 3 dots, 1/3 4 dots, 1/3 5 dots
                            arrayDots.push(e);
                        } // END appending integers 1/3 of totalPictures
                    } // END appending 3/4/5 dots   
                shuffleArray(arrayDots);                                    // shuffle to create random order
            
        // TEST
           // document.getElementById("testing").innerHTML = ((Math.floor(winWidth / stimWidth)) -1);    
            // window.alert(arrayDots);
                    
        // LOOP CREATION OF MAX AMOUNT FIGURES
            for (z = 2; z < totalPictures; z++) {                // start at 2 because first canvas was already created
                var ID = "Canvas" + z;                              // Change .id for each newly created canvas
                createCanvas (appendObject, ID);            // call upon createCanvas  (see below) to create responsive canvas
                
                var dots = arrayDots[z-2];
                randomFigure (ID, 10,10,sizeCirckel, horizontalCirckles, verticalCirckles, dots); // call upon randomFigure (see below) to create random dot figure
            } // END FOR LOOP  
} // END stimulusPresentation FUNCTION

////////////////////////////////////// SUPPORTING FUNCTIONS /////////////////////////////////////

// FUNCTION _ CREATE NEW RESPONSIVE CANVAS
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
        addCanvas.style.border = "1px solid #d3d3d3";                // draw light grey border around canvas
        
    // MAKE RESPONSE ACTIVE
        addCanvas.onmouseover =                                               // add mouseover function to determine which grid the mouse is at (for response actions)
                function getIDs () {                                                     
                        // GOAL: onmouseover canvas register which element it is and log id of element
                                // no input variables, because "stimID" is not defined as var this becomes a GLOBAL variable!
                        stimID = event.currentTarget.id;                                                    // register id of element that triggered the function
                        // document.getElementById("testing").innerHTML = stimID;       // TEST: report id of element that was hovered over
                        } // END onmouseover FUNCTION
                        
        addCanvas.onclick =                                                            // add onclick to cross out figure when clicked
                function correctionCross2 () {
                     // GOAL: draw a single line to cross out and a second line to correct for mistakes
                    // INITIALIZED: upon mouseClick on element as id'ed by "getIDs" function
    
                    // If corrected = "no" then the canvas has not yet been clicked (thus create 1 line to cross out)
                            if (corrected == "No") {
                                    var c=document.getElementById(canvasID);              // refer to correct canvas
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
                    
    // APPEND RESPONSE ACTIVE CANVAS                
    document.getElementById(appendObject).appendChild(addCanvas); // append newly created canvas to exisitng element 
    
} // END createCanvas FUNCTION

// TEST: INTIALIZE createCanvas FUNCTION
    // createCanvas("stimuli", "test");

 // FUNCTION _ DRAW RANDOM INTEGER
    function getRandomInt(min, max) {
      // GOAL: get a random integer in a range from min to max, in this case 3 - 5 dots.
        return Math.floor(Math.random() * (max - min + 1) + min);
    } // END RandomInt FUNCTION
          
 // FUNCTION _  SHUFFLE ARRAY CONTENT (from internet)
    function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
        return array;
        } // END shuffleArray FUNCTION
    
 // TEST randomFigure FUNCTION
      //  createCanvas("stimuli", "Canvas1");
        //drawGrid (10,10,5, 3, 3, "Canvas1");

 
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
    
    // FUNCTION _ DRAW 1 BLACK DOT 
    function blackDot (posX, posY, sizeCirckel) {
        // GOAL: draw a single filled black circkle
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
    
    // FUNCTION _ POSITION GENERATOR
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
            
            // create unique combination of XY coordinates
                 arrayYPos.sort();
        } // END positionGrid FUNCTION
    
      // SET RANDOM XY POSITIONS
            positionGrid (verticalCirckles, horizontalCirckles, sizeCirckel); // call upon positionGrid function
            
            // shuffle XY positions
                var arrayIndex = [];                                                                     // create new Array for random indexing out of XY coordinate arrays
                    for (y = 1; y < (horizontalCirckles * verticalCirckles); y++) {   // create integers for each point in the grid (1 - ...) 
                        arrayIndex.push(y);                                                             // append integer to arrayIndex
                    } // END for LOOP
                shuffleArray(arrayIndex);                                                             // shuffle order of integers to allow for random indexing (i.e. dot placement)
                //  window.alert(arrayIndex);
      
     // DRAW DOTS
      for (t = 0; t < dots; t++) {                                          // draw 3 / 4 / 5 dots
            var index = arrayIndex[t];                                  // random integer used to index from possible X and Y coordinate arrays
            // access randomly selected XY coordinates  
            var X = arrayXPos[index];                                // random - but unique - X coordinate
            var Y = arrayYPos[index];                                 // random - but unique - Y coordinate
  
            blackDot(X,Y, sizeCirckel);                                // draw DOT in random placement
      } // END DRAWING DOTS       
} // END  randomFigure FUNCTION 
      
// TEST: INITIALIZE randomFigure FUNCTION
// randomFigure("Canvas1",10,10,5, 3, 3);
 
   

    

    