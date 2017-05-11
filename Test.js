// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Test.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

function drawGrid (posX, posY, sizeCirckel, verticalCirckles, horizontalCirckles) {
    // GOAL: Draw a canvas with a grid of 9 black dots
        // posX = place in the grid where the first circkel should be drawn
        // posY = place in the grid where the first circkel should be drawn
        // sizeCirckel = enlarge or decrease circkel size (currently only works for value 5)
        // verticalCirckles = amount of circkles to be drawn vertically (i.e. height of grid)
        // horizontalCirckles = amount of circkles to be drawn horizontally (i.e. width of grid)

    // SET VARIABLES
        var distance = posX + sizeCirckel;
        var canvasWidth = (distance * horizontalCirckles) + sizeCirckel;
        var canvasHeight = (distance * verticalCirckles) + sizeCirckel;
    
    // CREATE CANVAS OF CORRECT SIZE
        document.getElementById("myCanvas").width = canvasWidth; // change size of canvas (see HTML)
        document.getElementById("myCanvas").height = canvasHeight; // change size of canvas (see HTML)

    // INITIALIZE DRAWING OF CIRCKLES        
        for (i = 0; i < verticalCirckles; i++) {
            // GOAL: itterate vertical drawing of circkles for a specified amount of times (i.e. verticalCirckles)
        
                for (x = 0; x < horizontalCirckles; x++) {
                    // GOAL: itterate horizontal drawing of circkles for horizontalCirckles amount of times
        
                        if (x == 0) { // if on first itteration set beginposition so in next vertical loop, the horizontal drawing start at the same position
                            posXstart = posX;
                         } 
        
                        var c = document.getElementById("myCanvas");    // draw on prespecified canvas (see HTML)
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

// INITIALIZE FUNCTION
drawGrid(10,10,5,3,3); //posX, posY, sizeCirckle, verticalCirckles, horizontalCirckles 


    
   /* var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(25,25,5,0,2*Math.PI);
    ctx.stroke();
    */
    
    /*
    var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    var img = document.getElementById("testImage");
    ctx.drawImage(img,1,1,50,50);
    */
    
  /*  function stimuliChange() {
        var c=document.getElementById("myCanvas");
        var ctx=c.getContext("2d");
        ctx.moveTo(0,0);
        ctx.lineTo(50,50);
        ctx.stroke();
    }
*/



    
    
    
    

    