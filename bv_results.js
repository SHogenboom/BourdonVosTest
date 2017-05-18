// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Author: Sally A.M. Hogenboom
// Version Control via Git
/**
* @todo include reference group data 
*/

// NOTE: Screen loads upon clicking "I am finished" on "bv_test.html"

// FUNCTION FROM INTERNET - ALLOWS FOR ARRAY CALLING FROM STORAGE
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}

// AVAILABLE DATA FROM BVTest_Duplicate.html
    const STARTTIME = sessionStorage.getObj("start");                                                // startTime BV Test
    const FINISHTIME = sessionStorage.getObj("finish");                                             // finishTime entire page
    const ARRAY_MADE_RESPONSES = sessionStorage.getObj("ARRAY_MADE_RESPONSES");                       // responses made // CODING: HIT (1), Miss (2), False Alarm (3) 
    const ARRAY_MADE_CORRECTIONS = sessionStorage.getObj("ARRAY_MADE_CORRECTIONS");                     // corrections made // CODING: NO (0), YES (1)
    const ARRAY_N_MOUSECLICKS = sessionStorage.getObj("ARRAY_N_MOUSECLICKS");                                      // mouseclicks made
    const ARRAY_CANVAS_RESPONSE_ORDER = sessionStorage.getObj("ARRAY_CANVAS_RESPONSE_ORDER");    // order in which responses were made
    const ARRAY_N_DOTS = sessionStorage.getObj("ARRAY_N_DOTS");                                      // amount of dots in each figure
    const ARRAY_CANVAS_IDs = sessionStorage.getObj("ARRAY_CANVAS_IDs");                        // IDs of all canvasses created (-2)
    // window.alert(Array.isArray(ARRAY_CANVAS_IDs));                                                  // TEST if variables are arrays
// DATA FROM BVFirstScreen.js
    const FIRSTNAME = sessionStorage.getItem("FIRSTNAME"); // participants first name
    const LASTNAME = sessionStorage.getItem("LASTNAME");
     const AGE = sessionStorage.getItem("AGE");
     const RESULT_ACCES_PASSWORD = String(sessionStorage.getItem("RESULT_ACCES_PASSWORD"));
   // window.alert(RESULT_ACCES_PASSWORD);
   // window.alert(typeof(RESULT_ACCES_PASSWORD))
   // window.alert(RESULT_ACCES_PASSWORD.length);
// CREATE VARIABLES
    var cleanedResponseArray = [];      // for storing unique responses & calculating final hit/miss/false alarm numbers

// DISPLAY COMPLETION TEXT
document.getElementById("maintext").innerHTML = (
    "Well done! You have finished the Bourdon Vos Test." + "<br>" +
    "Please call your supervisor and tell him/her that you are finished.");

document.getElementById("button").innerHTML = "Results";
document.getElementById("button").onclick = function () {displayResults() };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/** 
@function displayResults
@description Show the results from the Bourdon Vos Test but only when the password is validated
*/

function displayResults() {
    // RESULT_ACCES_PASSWORD = String(RESULT_ACCES_PASSWORD);
    var passWord = String(window.prompt("Please enter the specified password to acces the results"));
    // window.alert(passWord);
    // window.alert(typeof(passWord));
    // window.alert(passWord.length);
    if (passWord == RESULT_ACCES_PASSWORD) {
        window.alert("Correct password. These are the results: ")
        // CALL cleanResponses 
        var cleanedResponseArray = cleanResponses(ARRAY_CANVAS_RESPONSE_ORDER, ARRAY_MADE_RESPONSES, ARRAY_CANVAS_IDs);

        // CALL finalScore to present scores on screen
        finalScore(cleanedResponseArray);
         document.getElementById("button").style.visibility = "hidden";

    } else {
            var passwordReentry = window.confirm("This is not the correct password. Do you wish to try again?");
            
             if (passwordReentry == true) {
                displayResults(); // launch again
             } else {
                document.getElementById("maintext").innerHTML = (
                    "Thank you for using the online Bourdon Vos Test" + "<br>" +
                        "For questions and comments, please contact: hogen.boom@hotmail.com")
                document.getElementById("button").style.visibility = "hidden";
        } // END re-entry of password IF
   } // END password Comparison
     
    
} // END displayResults FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TESTING
/*window.onload = document.getElementById("output_header").innerHTML = ("ARRAY_N_DOTS = " + "<br>" +  ARRAY_N_DOTS + "<br> <br>" + 
                                                                                "ARRAY_N_MOUSECLICKS = " + "<br>" +  ARRAY_N_MOUSECLICKS + "<br> <br>" + 
                                                                                "ARRAY_MADE_RESPONSES = " + "<br>" +  ARRAY_MADE_RESPONSES + "<br> <br>" + 
                                                                                "ARRAY_CANVAS_RESPONSE_ORDER = " + "<br>" +  ARRAY_CANVAS_RESPONSE_ORDER + "<br> <br>" + 
                                                                                "ARRAY_CANVAS_IDs = " + "<br>" +  ARRAY_CANVAS_IDs + "<br> <br>" + 
                                                                                "cleanedResponseArray = " + "<br>" + cleanedResponseArray); */


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cleanResponses (ARRAY_CANVAS_RESPONSE_ORDER, ARRAY_MADE_RESPONSES, ARRAY_CANVAS_IDs) {
    // GOAL: clean up the total array of responses so that corrections (i.e. double clicks) are eliminated & no clicks are also coded
    
    for (i = 0; i < ARRAY_CANVAS_IDs.length; i++) {        // repeat for each possible canvas 
        var canvasID = ARRAY_CANVAS_IDs[i];                // extract canvasID
        var response = lastResponse(ARRAY_CANVAS_RESPONSE_ORDER, ARRAY_MADE_RESPONSES, canvasID, ARRAY_N_DOTS); // determine response
        // window.alert(response);
        
        cleanedResponseArray.push(response);    // append response to new array
    } // END for LOOP
    return cleanedResponseArray;
    // window.alert(cleanedResponseArray);
} // END clearResponses FUNCTION
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                                                                              
function lastResponse (ARRAY_CANVAS_RESPONSE_ORDER, ARRAY_MADE_RESPONSES, canvasID, ARRAY_N_DOTS) {
    // GOAL: determine when the last response for each canvas was made
        // ARRAY_CANVAS_RESPONSE_ORDER: order in which the canvasses were clicked. 
        // ARRAY_MADE_RESPONSES: array containing all response (i.e. mousecliks) that were made ("Hit" / "Miss" / "False Alarm")
        // canvasID: name of figure/canvas that was responded to
        // ARRAY_N_DOTS: array containing the amount of dots in each figure/canvas
        
        var dotIndex = (canvasID.replace("Canvas", ""))-1;                      // replace "Canvas" by nothing so unique number remains, -1 because index starts from 0
        var dots =  ARRAY_N_DOTS[dotIndex];                                                    // amount of dots that were in the figure   
        var lastIndex = ARRAY_CANVAS_RESPONSE_ORDER.lastIndexOf(canvasID);        // find when canvas was last responded to
        var lastResponse = 0;
        /*
        window.alert("canvas ID = " + canvasID);
        window.alert("Last index = " + lastIndex);
        // window.alert(" Length of response Array = "+ ARRAY_MADE_RESPONSES.length);
        // window.alert(" response array = " + ARRAY_MADE_RESPONSES);
        window.alert("amount of dots = " + dots);
        window.alert(typeof (dots));
        // window.alert("last response = " + ARRAY_MADE_RESPONSES[lastIndex]);
        */
        
        if (lastIndex != -1) {                                                                        // a response was made to the canvas 
            lastResponse = ARRAY_MADE_RESPONSES[lastIndex];                         // couple last response to coded value (hit/miss/false alarm) 
        } else {                                                                
            // no response was made for that canvas, determine if this is correct
            // window.alert("no response made");
            if (dots == 3 || dots == 5) {
                lastResponse = 1;    
            } else { // 4 dots in figure, should have been responded to
                lastResponse = 2;
            } // END dots IF    
        } // END lastIndex IF
        
        // window.alert(lastResponse);
        
        return lastResponse;
} // END lastResponse FUNCTION

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 function finalScore (cleanedResponseArray) {
    // GOAL: calculate amount of hits, misses, and false alarms
        // cleanedResponseArray: array with a response per canvas 
            // CODING: HIT (1), Miss (2), False Alarm (3) 
    
    // SET VARIABLES
        var count = 0;
        
    // LOOP RESPONSE OPTIONS       
    for (x = 1; x < 4;  x++) {             // only 3 possible response options
        // LOOP ALL RESPONSES MADE
        for (y = 0; y < (cleanedResponseArray.length + 1); y++) {
            if (cleanedResponseArray[y] == x) {         // if value is response option to be evaluated, increase count
                count = count + 1;
            } // END IF
        } // END array LOOP
      // window.alert(count);  
      
      if (x == 1) {
        var Hits = count;
      }  else if (x == 2) {
        var Miss = count;
      } else {
        var FalseAlarms = count;
      } // END IF  
      
      count = 0;
    } // END possible responses LOOP
    
    document.getElementById("maintext").innerHTML = (FIRSTNAME + " " + LASTNAME +"'s results: " +
    "<br><br>" + 
    "Time spent on task: " + ((FINISHTIME - STARTTIME)/1000) + " seconds" + "<br> <br>" +
        "Amount of Hits: " + Hits + "<br>" +
        "Amount of Misses: " + Miss + "<br>" +
        "Amount of False Alarms: " + FalseAlarms);
    
 } // END finalScore FUNCTION