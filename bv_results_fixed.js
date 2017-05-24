

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
    const ARRAY_CANVAS_RESPONSE_ORDER = sessionStorage.getObj("ARRAY_CANVAS_RESPONSE_ORDER");    // order in which responses were made
    const ARRAY_N_DOTS = sessionStorage.getObj("ARRAY_N_DOTS");                                      // amount of dots in each figure
    const ARRAY_RESPONSE_TIMES = sessionStorage.getObj("ARRAY_RESPONSE_TIMES");                        // response times per canvas
    // window.alert(Array.isArray(ARRAY_CANVAS_IDs));                                                  // TEST if variables are arrays
    const STIMULI_ROWS = sessionStorage.getItem("stimuliRows"); // amount of rows containing stimuli
    const STIMULI_COLS = sessionStorage.getItem("stimuliCols"); // amount of stimuli columns

// DATA FROM BVFirstScreen.js
    const FIRSTNAME = sessionStorage.getItem("FIRSTNAME"); // participants first name
    const LASTNAME = sessionStorage.getItem("LASTNAME");
     const AGE = sessionStorage.getItem("AGE");
     const RESULT_ACCES_PASSWORD = String(sessionStorage.getItem("RESULT_ACCES_PASSWORD"));
 
// SET VARIABLES
var cleanedResponseArray = [];
var cleanedCorrectionArray = [];
var cleanedResponseTimeArray = [];

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
    hits = 0;
    miss = 0;
    falseAlarm = 0;
    noResponse = 0;
    
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
        totalStimuli = (hits + miss + falseAlarm);
        percHits = round(((hits / totalStimuli)*100),2);
        percMiss = round(((miss / totalStimuli)*100),2);
        percFalseAlarms = round(((falseAlarm / totalStimuli)*100),2);
        percNoResponse = round(((noResponse / totalStimuli)*100),2);
    
    // CALCULATE ROW RT's
        calculateResponseTimes();
    
    // PRESENT OUTPUT
        createOutput();
        
        window.alert("STIMULI_ROWS = " + STIMULI_ROWS);
        window.alert("STIMULI_COLS = " + STIMULI_COLS);
        window.alert(deltaResponseTimeArray);
     
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
            cleanedResponseTimeArray.push(999);
        } else { // canvas was responded to
            cleanedResponseArray.push(ARRAY_MADE_RESPONSES[index]);
            cleanedCorrectionArray.push(ARRAY_MADE_CORRECTIONS[index]);
            cleanedResponseTimeArray.push(ARRAY_RESPONSE_TIMES[index]);
        } // END response made IF
    } // END all canvases LOOP
} // END lastResponses FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function identifyNormGroup () {
    // GOAL: select the appropriate normGroup variable for calculation of scores
    for (i = 6; i < 18; i++) {
        if (i == AGE) { // extract correct normgroup
            var referenceData = "normGroup"+ i;
        } // END IF
    } // END FOR ALL AGES
} // END identifyNormGroup FUNCTION

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function calculateResponseTimes () {
    // GOAL: to calculate the response time for each row
    // ... and to calculate the average response time per row
    deltaResponseTimeArray = [];
    var canvasDeltaTime = 0;
    rowRTArray = [];

    // CALCULATE DELTA TIME FOR ALL CANVASSES
    for (i = 0; i < cleanedResponseTimeArray.length; i++) {
        var canvasTime = cleanedResponseTimeArray[i]; // identify reaction time per canvas

        if (canvasTime == 999) {
            // do nothing, no response was made i.e. no reaction time
            canvasDeltaTime = 0;
        } else {
            canvasDeltaTime = ((canvasTime - STARTTIME) / 1000); // calculate delta response time between start and that canvas
        } // END valid time IF
        deltaResponseTimeArray.push(canvasDeltaTime);
    } // END FOR LOOP
    
    var count = 0;
    for (x = 0; x < STIMULI_ROWS; x++) {
     var rowRT = 0;
    // CALCULATE ROW RT
        // loop all stimuli columns
            for (c = 0; c < STIMULI_COLS; c++) {
                // window.alert(deltaResponseTimeArray[count]);
                var rowRT = rowRT + deltaResponseTimeArray[count];
            } // END stimuli col LOOP
            
        // store total rowRT
            rowRTArray.push(rowRT);

            count = count + 1; // increment count
    } // END row LOOP
            
 /*   
    for (i = 0; i < STIMULI_ROWS; i++) {
        var reactionTimeArray = []; // create/reset empty reaction time array
        
        for (x = 0; x < STIMULI_COLS; x++) {
            var canvasTime = cleanedResponseTimeArray[i]; // identify reaction time per canvas
            
            if (canvasTime == 999) {
                // do nothing, no response was made i.e. no reaction time
            } else {
                var canvasDeltaTime = (canvasTime - STARTTIME); // calculate delta response time between start and that canvas
            } // END valid time IF
            
            reactionTimeArray.push(canvasDeltaTime); // store response time
        } // END stimuli cols LOOP
        
        // IF NO RESPONSE NO RT CAN BE CALCULATED
            if (reactionTimeArray.length == 0) {
                rowReactionTimeArray.push(0); 
            } else {
                // CALCULATE TOTAL RT FOR ROW
                    for (t = 0; t < reactionTimeArray.length; t++) {
                        var rowTotalTime = rowTotalTime + reactionTimeArray[t];    
                    } // END reactionTimeArray LOOP
        
                // CALCULATE AVERAGE RT ROW
                    var averageRT = ((rowTotalTime / reactionTimeArray.length) / 1000);
                    rowReactionTimeArray.push(averageRT);
            } // END reactionTimeArray.length IF
        
    // RESET VARIABLES
        var rowTotalTime = 0;
        var averageRT = 0;
      
    } // END stimuli row LOOP
*/    

} // END calculateResponseTimes FUNCTION


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createOutput () {
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
"</table>" + 
"<br>" +
"Delta response times are: " + deltaResponseTimeArray + "<br>" +
"cleaned RT array = " + cleanedResponseTimeArray + "<br>" + 
"rowRTArray = " + rowRTArray
); // END HTML OBJECT

} // END createOutput FUNCTION


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INTERNET FUNCTIONS /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE
// Functions that were used to create the task that were not programmed by the author

// http://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// NORM DATA ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// SPEED NORMS [0] - [3]
    // highter than [0] == -2
    // between [0] & [1] == -1
    // between [1] & [2] == 0
    // between [2] & [3] == +1
    // smaller than [3] == +2
    
const normGroup6 = [31.5	,	24.9	,	18.4	,	16.5];
const normGroup7 = [27.6	,	23.5	,	18.0	,	15.6];
const normGroup8 = [23.2	,	19.6	,	16.4	,	13.7];
const normGroup9 = [20.4	,	18.0	,	14.3	,	12.5];
const normGroup10 = [20.6	,	16.8	,	13.7	,	12.0];
const normGroup11 = [17.2	,	14.9	,	12.4	,	11.1];
const normGroup12 = [17.1	,	14.7	,	11.9	,	10.0];
const normGroup13 = [16.5	,	14.2	,	11.1	,	9.1];
const normGroup14 = [15.3	,	12.8	,	9.9	,	8.4];
const normGroup15 = [14.2	,	11.6	,	9.7	,	9.2];
const normGroup16 = [13.6	,	11.4	,	9.0	,	8.4];
const normGroup17 = [13.0	,	11.1	,	9.1	,	8.2];





