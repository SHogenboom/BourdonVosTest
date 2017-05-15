// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/BVFinalScreen.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

// NOTE: Screen loads upon clicking "I am finished" on "BVTest_Duplicate.html"

// FUNCTION FROM INTERNET - ALLOWS FOR ARRAY CALLING FROM STORAGE
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}

// AVAILABLE DATA FROM BVTest_Duplicate.html
    var startTime = sessionStorage.getObj("start");                                                // startTime BV Test
    var finishTime = sessionStorage.getObj("finish");                                             // finishTime entire page
    var responseArray = sessionStorage.getObj("responseArray");                       // responses made // CODING: HIT (1), Miss (2), False Alarm (3) 
    var correctionArray = sessionStorage.getObj("correctionArray");                     // corrections made // CODING: NO (0), YES (1)
    var clickArray = sessionStorage.getObj("clickArray");                                      // mouseclicks made
    var responseOrderArray = sessionStorage.getObj("responseOrderArray");    // order in which responses were made
    var dotsArray = sessionStorage.getObj("dotsArray");                                      // amount of dots in each figure
    var canvasIdArray = sessionStorage.getObj("canvasIdArray");                        // IDs of all canvasses created (-2)
    // window.alert(Array.isArray(canvasIdArray));                                                  // TEST if variables are arrays
    
// CREATE VARIABLES
    var cleanedResponseArray = [];      // for storing unique responses & calculating final hit/miss/false alarm numbers

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CALL cleanResponses 
    var cleanedResponseArray = cleanResponses(responseOrderArray, responseArray, canvasIdArray);

// CALL finalScore to present scores on screen
    finalScore(cleanedResponseArray);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TESTING
/*window.onload = document.getElementById("output_header").innerHTML = ("dotsArray = " + "<br>" +  dotsArray + "<br> <br>" + 
                                                                                "clickArray = " + "<br>" +  clickArray + "<br> <br>" + 
                                                                                "responseArray = " + "<br>" +  responseArray + "<br> <br>" + 
                                                                                "responseOrderArray = " + "<br>" +  responseOrderArray + "<br> <br>" + 
                                                                                "canvasIdArray = " + "<br>" +  canvasIdArray + "<br> <br>" + 
                                                                                "cleanedResponseArray = " + "<br>" + cleanedResponseArray); */


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cleanResponses (responseOrderArray, responseArray, canvasIdArray) {
    // GOAL: clean up the total array of responses so that corrections (i.e. double clicks) are eliminated & no clicks are also coded
    
    for (i = 0; i < canvasIdArray.length; i++) {        // repeat for each possible canvas 
        var canvasID = canvasIdArray[i];                // extract canvasID
        var response = lastResponse(responseOrderArray, responseArray, canvasID, dotsArray); // determine response
        // window.alert(response);
        
        cleanedResponseArray.push(response);    // append response to new array
    } // END for LOOP
    return cleanedResponseArray;
    // window.alert(cleanedResponseArray);
} // END clearResponses FUNCTION
 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
                                                                              
function lastResponse (responseOrderArray, responseArray, canvasID, dotsArray) {
    // GOAL: determine when the last response for each canvas was made
        // responseOrderArray: order in which the canvasses were clicked. 
        // responseArray: array containing all response (i.e. mousecliks) that were made ("Hit" / "Miss" / "False Alarm")
        
        var dotIndex = (canvasID.replace("Canvas", ""))-1;                      // replace "Canvas" by nothing so unique number remains, -1 because index starts from 0
        var dots =  dotsArray[dotIndex];                                                    // amount of dots that were in the figure   
        var lastIndex = responseOrderArray.lastIndexOf(canvasID);        // find when canvas was last responded to
        var lastResponse = 0;
        /*
        window.alert("canvas ID = " + canvasID);
        window.alert("Last index = " + lastIndex);
        // window.alert(" Length of response Array = "+ responseArray.length);
        // window.alert(" response array = " + responseArray);
        window.alert("amount of dots = " + dots);
        window.alert(typeof (dots));
        // window.alert("last response = " + responseArray[lastIndex]);
        */
        
        if (lastIndex != -1) {                                                                        // a response was made to the canvas 
            lastResponse = responseArray[lastIndex];                         // couple last response to coded value (hit/miss/false alarm) 
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
    
    document.getElementById("output_header").innerHTML = "Pietje's final score is: "
    document.getElementById("output").innerHTML = ("Time spent on task: " + ((finishTime - startTime)/1000) + " seconds" + "<br> <br>" +
                                                                                    "Amount of Hits: " + Hits + "<br>" +
                                                                                    "Amount of Misses: " + Miss + "<br>" +
                                                                                    "Amount of False Alarms: " + FalseAlarms);
    
 } // END finalScore FUNCTION