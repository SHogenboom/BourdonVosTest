/** Bourdon Vos Test
* @author hogen.boom@hotmail.com (Hogenboom, S. A. M.)
* @fileoverview Flow order: index > bv_pratice > bv_test > bv_results
* @todo 
*/

// SET VARIABLES
var stimuliColumns = 24; // specified in Bourdon Vos Test
var stimuliRows = 33; // specified in Bourdon Vos Test
var totalStimuli = stimuliColumns * stimuliRows;

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
    
    // CALL canvasSize 
        // to determine how large the canvasses (i.e. stimuli) can
        // .... maximum be and still fit in the window    
        var canvasWidth = canvasSize(); // size returned from canvasSize function
        var canvasHeight = canvasWidth; // make square. Computer screens always wider than high.
        
    // CALL createCanvas
        // create empty responsive active canvas 
   for (i = 1; i < (totalStimuli +1); i++) { // totalStimuli + 1 because counter starts at 1
        var canvasID = "Canvas" + i        
        createCanvas("stimuli", canvasID, canvasHeight, canvasWidth);   
    } // END FOR LOOP     
} // END stimuliPresentation FUNCTION




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE: from internet (https://stackoverflow.com/questions/17143394/confirmation-before-exit-dialog)
function confirmExit() {
    // GOAL: make sure pp wanted to close the window and didn't do so by accident 
    // ... which would mean loosing all scores.
        return "You have attempted to leave this page. Are you sure?";
} // END confirmExit FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
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
           var winWidth = window.innerWidth; // available amount of pixels on the inside of the window
            
    // Determine max canvas width
        var canvasWidth = (winWidth / (stimuliColumns + 1)); // +1 to allow for room for the borders between canvases & the side of the window

     return canvasWidth;
}  // END canvasSize FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
function createCanvas (appendObject, canvasID, canvasHeight, canvasWidth) { 
    // GOAL: create a new RESPONSIVE empty canvas
        // appendObject: ID of the object to which the canvas should be appended <div id = "stimuli">
        // canvasID: name you want to give to the created canvas

    // CREATE CANVAS
        var addCanvas = document.createElement('canvas');       // Create new canvas element
    
    // ASSIGN PROPERTIES
        addCanvas.id = canvasID; // .id to change on what is specified (itterates in stimulusPresentation function)
        addCanvas.width = canvasWidth; // set canvasWidth (depending on screen size in canvasSize function)                                              
        addCanvas.height = canvasHeight; //  set canvasHeight (depending on screen size in canvasSize function) 
        
    // ASSIGN RESPONSE ACTIONS
        addCanvas.onclick = function () {responseLogging(canvasID, canvasWidth, canvasHeight) } ; // call upon responseLogging to track correct crossout and log hits/miss/mistakes

    // APPEND CANVAS TO EXISTING OBJECT
        document.getElementById(appendObject).appendChild(addCanvas); // append newly created canvas to existing element 
} // END createCanvas FUNCTION






















