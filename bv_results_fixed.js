

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage

// FUNCTION FROM INTERNET - ALLOWS FOR ARRAY CALLING FROM STORAGE
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}


//  DATA FROM bv_test_fixed.html
    const STARTTIME = sessionStorage.getItem("start");                                                // startTime BV Test
    const FINISHTIME = sessionStorage.getItem("finish");                                             // finishTime entire page
    const ARRAY_MADE_RESPONSES = sessionStorage.getObj("ARRAY_MADE_RESPONSES");                       // responses made // CODING: HIT (1), Miss (2), False Alarm (3) 
    const ARRAY_MADE_CORRECTIONS = sessionStorage.getObj("ARRAY_MADE_CORRECTIONS");                     // corrections made // CODING: NO (0), YES (1)
    // const ARRAY_N_MOUSECLICKS = sessionStorage.getObj("ARRAY_N_MOUSECLICKS");                                      // mouseclicks made
    const ARRAY_CANVAS_RESPONSE_ORDER = sessionStorage.getObj("ARRAY_CANVAS_RESPONSE_ORDER");    // order in which responses were made
    const ARRAY_N_DOTS = sessionStorage.getObj("ARRAY_N_DOTS");                                      // amount of dots in each figure
    // const ARRAY_CANVAS_IDs = sessionStorage.getObj("ARRAY_CANVAS_IDs");                        // IDs of all canvasses created (-2)
    // window.alert(Array.isArray(ARRAY_CANVAS_IDs));                                                  // TEST if variables are arrays

// DATA FROM BVFirstScreen.js
    const FIRSTNAME = sessionStorage.getItem("FIRSTNAME"); // participants first name
    const LASTNAME = sessionStorage.getItem("LASTNAME");
     const AGE = sessionStorage.getItem("AGE");
     const RESULT_ACCES_PASSWORD = String(sessionStorage.getItem("RESULT_ACCES_PASSWORD"));
 
// SET VARIABLES
var cleanedResponseArray = [];
var cleanedCorrectionArray = [];

// DISPLAY COMPLETION TEXT
document.getElementById("maintext").innerHTML = (
    "Well done! You have finished the Bourdon Vos Test." + "<br>" +
    "Please call your supervisor and tell him/her that you are finished.");

document.getElementById("button").innerHTML = "Results";
document.getElementById("button").onclick = function () {displayResults() };


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// MAIN FUNCTIONS ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



window.onload = presentScores();

function presentScores () {
    // SET VARIABLES
    var hits = 0;
    var miss = 0;
    var falseAlarm = 0;
    var noResponse = 0;
    
    // CLEAN RESPONSES
    lastResponses();
    
    // CALCULATE  SCORES _ ABSOLUTE
    for (i = 0; i < cleanedResponseArray.length; i++){
        if (cleanedResponseArray[i] == 1) { // HIT
            hits = hits + 1;
        } else if (cleanedResponseArray[i] == 2) { // MISS
            miss = miss + 1;
        } else if (cleanedResponseArray[i] == 3) {  // FALSE ALARM
            falseAlarm = falseAlarm + 1;
        } else { // 999 = No response
            noResponse = noResponse + 1;
            if (ARRAY_N_DOTS[i] == 3 || ARRAY_N_DOTS[i] == 5) { // no click = correct
                hits = hits + 1;
            } else { // 4 dots > should be clicked
                miss = miss + 1;
            } // END what score should be IF
        } // END hit/miss/falsealarm/noresponse IF
    } // END LOOP
    
    // CALCULATE SCORES _ PERCENTAGE
    var totalStimuli = (hits + miss + falseAlarm);
    var percHits = round(((hits / totalStimuli)*100),2);
    var percMiss = round(((miss / totalStimuli)*100),2);
    var percFalseAlarms = round(((falseAlarm / totalStimuli)*100),2);
    var percNoResponse = round(((noResponse / totalStimuli)*100),2);

// CREATE OUTPUT TABLE
document.getElementById("maintext").innerHTML = (
"<table>" +
    "<tr>" +
        "<th>" + "" +
        "<th>" + "Absolute Amounts" +
        "<th>" + "Percentages" +
    "</tr>" +
    "<tr>" +
        "<td>" + "Hits" +
        "<td>" + hits +
        "<td>" + percHits + " %" +
    "</tr>" +
    "<tr>" +
        "<td>" + "Misses" +
        "<td>" + miss +
        "<td>" + percMiss + " %" +
    "</tr>" +
    "<tr>" +
        "<td>" + "False Alarms" +
        "<td>" + falseAlarm +
        "<td>" + percFalseAlarms + " %" +
    "</tr>" +
    "<tr>" +
        "<td>" + "No Responses" +
        "<td>" + noResponse + 
        "<td>" + percNoResponse + " %" +
    "</tr>" +
"</table>" +
"<br>" +

"<table>" +
    "<tr>" +
        "<th>" + "" +
        "<th>" + "Absolute Amounts" +
        "<th>" + "Percentages" +
    "</tr>" +
    "<tr>" +
        "<td>" + "Hits" +
        "<td>" + hits +
        "<td>" + percHits + " %" +
    "</tr>" +
    "<tr>" +
        "<td>" + "Misses" +
        "<td>" + miss +
        "<td>" + percMiss + " %" +
    "</tr>" +
    "<tr>" +
        "<td>" + "False Alarms" +
        "<td>" + falseAlarm +
        "<td>" + percFalseAlarms + " %" +
    "</tr>" +
    "<tr>" +
        "<td>" + "No Responses" +
        "<td>" + noResponse + 
        "<td>" + percNoResponse + " %" +
    "</tr>" +
"</table>"

);
 
 
} // END FUNCTION
 

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function lastResponses () {
    // GOAL: determine which response was made to which canvas
    // ... and log if canvas was not responded to (i.e. not hovered over)
    for (i = 0; i < ARRAY_N_DOTS.length; i++) { // loop for all canvases
        var index = ARRAY_CANVAS_RESPONSE_ORDER.lastIndexOf(i);
        
        if (index == -1) { // canvas was not responsed to
            // var noResponse = noResponse + 1;
            cleanedResponseArray.push(999);
            cleanedCorrectionArray.push(999);
        } else { // canvas was responded to
            cleanedResponseArray.push(ARRAY_MADE_RESPONSES[index]);
            cleanedCorrectionArray.push(ARRAY_MADE_CORRECTIONS[index]);
        } // END response made IF
    } // END all canvases LOOP
} // END lastResponses FUNCTION

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
      
      return [Hits, Miss, FalseAlarms];
    }   // END possible responses LOOP
} // END finalScore FUNCTION


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INTERNET FUNCTIONS /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE
// Functions that were used to create the task that were not programmed by the author

// http://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

