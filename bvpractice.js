/** Bourdon Vos Test
* @author hogen.boom@hotmail.com (Hogenboom, S. A. M.)
* @fileoverview Flow order: BVFirstScreen > BVPractice > bvtest > bvfinalscreen
* @todo 
* - complete JSDOC comment style
* - allow for random figures
* - loop until correct response made to single line of canvasses
* - add instructions that stimuli should be assessed per row
* @description 
*   This is the first screen to be viewed by the participant.
*   It allows the participant to practice the task. 
*   Task loops until participants is able to correctly respond 
*   to 4 dot stimuli by clicking them.
*/

/** Retrieve stored data */
     const FIRSTNAME = sessionStorage.getItem("FIRSTNAME");
     const LASTNAME = sessionStorage.getItem("LASTNAME");
     const AGE = sessionStorage.getItem("AGE");
     const RESULT_ACCES_PASSWORD = sessionStorage.getItem("RESULT_ACCES_PASSWORD");

     
/** Display welcome text and instructions */
document.getElementById("maintext").innerHTML = 
    ("Hello " +  FIRSTNAME + "," + "<br>" +
    "You are about to start the Bourdon Vos Test" + "<br>" +
    "Before you start the test, however, it is time to PRACTICE!" + "<br>" +
    "Please press 'Let's Practice' to get going.");

document.getElementById("button").innerHTML = 
    "Let's Practice";
document.getElementById("button").onclick = function() { practiceTrials("stimuli") };

/** initialize variables */
    var clickArray = []; // log mouseclicks per canvas

/**
*@function practiceTrials
*/
function practiceTrials (appendObject) {
    // GOAL: to familarize the participant with the task, 
    // ... and continue untill correct responses are made to each type 
    // ... of stimuli (3/4/5 dot figures).
        // appendObject: name of the <div> object to which the created stimuli 
        // ... can be appended
    
    document.getElementById("button").innerHTML = "";
    document.getElementById("button").style.visibility = "hidden";
    
    for (i = 3; i < 6; i++) {
        // CREATE RESPONSE ACTIVE CANVAS
        var addCanvas = document.createElement('canvas');
        console.log("created element");
        
        var canvasID = ("Canvas" + i);
        addCanvas.id = canvasID; // set name of canvas element
        addCanvas.width = 60; // set width of element                                                   
        addCanvas.height = 60; // set height of element
        addCanvas.onclick = function () {responseActive() };                                            

        clickArray.push(0); // set to 0 for each canvas created   
        document.getElementById(appendObject).appendChild(addCanvas); 
        // append newly created canvas to exisitng element      
        console.log("appended child");
        console.log("Canvas ID = " + canvasID);
        
        // DRAW FIGURE
       figureCreation(canvasID); 
    } // END LOOP    
    
    // DISPLAY INSTRUCTIONS
    document.getElementById("maintext").innerHTML = 
    ( "These are examples from the Bourdon Vos Test. " + "<br>" +
    "You will have to determine for every figure on the screen whether" +
    " it should be crossed out or not." + "<br>" + 
    " Cross figures out when they contain 4 dots. " +
    "In this case that is the middle figure." + "<br>" +
    "Try clicking on the middle figure with the mouse to cross the figure out.");
    
    

    
} // END practiceTrials FUNCTION

/** initizalize warnig variable */
  var warning = true;


/**
*@function responseActive
*/
function responseActive() {
    // GOAL: to ensure that the canvas - upon mouse click - gets 
    // ... cross out or corrected.
   
    var ID = event.currentTarget.id; // log id of current canvas
    var index = (ID.replace("Canvas", "")-3); // -3 because index starts at 0 and ID starts at 3
        console.log("Index = " + index);
    
    var clicks = clickArray[index];
        if (clicks == 0) {
            // canvas has not been clicked - draw line
                    var c=document.getElementById(ID);              // refer to correct canvas
                    var ctx=c.getContext("2d");                                         // unkown but necessary
                    ctx.beginPath();                                                           // start new drawing
                    ctx.moveTo(0,0);                                                          // determine starting position of line - constant
                    ctx.lineTo(60,60);                       // finish position of line - changes on canvas size specifiedin drawGrid function
                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                    ctx.strokeStyle = "#ff0000";                                          // color of line; red
                    ctx.stroke();                                                                  // initialize drawing 
                    clickArray[index] = 1; 
        } else if (clicks == 1) {
            // second response, draw correction line
                    var c=document.getElementById(ID);               // refer to correct canvas
                    var ctx=c.getContext("2d");                                           // unkown but necessary
                    ctx.beginPath();                                                            // start new drawing
                    ctx.moveTo(60,0);                                        // determine starting position of line (should depend on which canvas it is)
                    ctx.lineTo(0,60);                                          // finish position of line (should depend on size of canvas)
                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                    ctx.strokeStyle = "#ff0000";                                         // color of line; red
                    ctx.stroke();                                                                 // initialize drawing
                    clickArray[index] = 2;
        } else {
            // do nothing
        } // END clicks IF
        console.log("clicks = " + clicks + " / index = " + index)
                
        if (index == 1 && clicks == 0) {
            document.getElementById("maintext").innerHTML = 
            ("Easy right? But what if you clicked a figure with 3 or 5 dots" +
            " by accident? Try clicking a figure twice and see what happens")
            warning = false;
        } else if ((clicks == 1 && index == 0) || (clicks == 1 && index == 2)){
            document.getElementById("maintext").innerHTML = 
            ("Welldone! You are ready for the Bourdon Vos Test" +
            "<br>" + "Please click 'Start the Test' to get going.")
            document.getElementById("button").innerHTML = "Start the Test";
            document.getElementById("button").style.visibility = "visible";
            document.getElementById("button").onclick = function() {window.location.href = "bvtest.html"};
            warning = false;
        } else if (index != 1 && warning == true) {
            document.getElementById("maintext").innerHTML = 
            ("You should click the figure with 4 dots first!");
        } // END display of new instructions
        
} // END responseActive FUNCTION

function figureCreation(canvasID) {
    var dots = (canvasID.replace("Canvas", "")); 
    // Delete "Canvas" from id to identify amount of dots
    
    if (dots == 3) {
        blackDot(10,10,5,canvasID);
        blackDot(40,30,5,canvasID);
        blackDot(10,50,5,canvasID);
    } else if (dots == 4) {
        blackDot(30,10,5,canvasID);
        blackDot(10,50,5,canvasID);
        blackDot(30,30,5,canvasID);
        blackDot(50,50,5,canvasID);
    } else if (dots == 5) {
        blackDot(30,30,5,canvasID);
        blackDot(10,50,5,canvasID);
        blackDot(50,10,5,canvasID);
        blackDot(50,50,5,canvasID);
        blackDot(30,10,5,canvasID);
    }
    
} // END figureCreation FUNCTION

/**
*@function blackDot
*@description Function to draw a single black dot on a figure
*@todo enable for circkle size larger than 6
*/
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

    
