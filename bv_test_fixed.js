/** Bourdon Vos Test
* @author hogen.boom@hotmail.com (Hogenboom, S. A. M.)
* @fileoverview Flow order: index > bv_pratice > bv_test > bv_results
* @todo 
*/

// SET VARIABLES
var count = 0;

// INITIALIZE FUNCTIONS
window.onload = checkWindowSize();
window.onbeforeunload = confirmExit();



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            // window.onresize =  checkWindowSize(); // relaunch the window check -> creates loop until if condition is satisfied
        } // END IF    
    } // END checkWindowSize FUNCTION