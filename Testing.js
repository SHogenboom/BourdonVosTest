// TEST randomFigure FUNCTION
       //ccreateCanvas("stimuli", "Canvas1");
        //drawGrid (10,10,5, 3, 3, "Canvas1");

// TEST: INITIALIZE randomFigure FUNCTION
 randomFigure("Canvas1",10,10,5, 3, 3,5);

 
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
    
    // SET POSSIBLE X POSITIONS
        var arrayXPos = [];                                                         // create empty array
            for (q = 1; q < (verticalCirckles + 1); q++) {    
                for (k = 1; k < (horizontalCirckles + 1); k++) {         // positions for the amount of horizontalCirckles specified (+1 because k = 1)
                    var posX = ((3 * sizeCirckel) * k);                       // (should be changed depending on canvas & circkel size)
                    arrayXPos.push(posX);                                      // append new position to array containing all X positions
                } // END horizontal LOOP
            } // END vertical LOOP
       window.alert(arrayXPos);                                               // TEST
     
    // SET  POSSIBLE Y POSITIONS
        var arrayYPos = [];                                                         // create empty array
            for (w = 1; w < (horizontalCirckles + 1); w++) { 
                for (l = 1; l < (verticalCirckles + 1); l++) {                // positions for the amount of verticalCirckles specified (+1 because l = 1)
                    var posY = ((3 * sizeCirckel) * l);                         // change depending on circkelSize
                    arrayYPos.push(posY);                                       // append new position to array containing all Y position
                } // END vertical LOOP
            } // END horizontal LOOP
         arrayYPos.sort();                                                              // sort ascending (to create unique X,Y coordinates)
         window.alert(arrayYPos);                                               // TEST
      
      // SHUFFLE XY POSITIONS
            var arrayIndex = [];
                for (y = 1; y < (horizontalCirckles * verticalCirckles); y++) { // 
                    arrayIndex.push(y);
                }
                shuffleArray(arrayIndex);
        window.alert(arrayIndex);
      
     // DRAW DOTS
      for (t = 0; t < dots; t++) {
      
        var index = arrayIndex[t];
      
        // access randomly selected XY coordinates  
            var X = arrayXPos[index];
            var Y = arrayYPos[index];
  
         blackDot(X,Y, sizeCirckel);
      } // END DRAWING DOTS               
              
   // document.getElementById("testing").innerHTML = arrayXPos + "<br>" + arrayYPos + "<br>" +  arrayXUsed  + "<br>" +arrayYUsed;

} // END  randomFigure FUNCTION 


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
    
 // FUNCTION _ DRAW RANDOM INTEGER
    function getRandomInt(min, max) {
      // GOAL: get a random integer in a range from min to max, in this case 3 - 5 dots.
        return Math.floor(Math.random() * (max - min + 1) + min);
    } // END RandomInt FUNCTION
     
