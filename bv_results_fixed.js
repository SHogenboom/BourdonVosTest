///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////// EXPERIMENT LEADER ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// RESULTS ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GOAL
// The Participant is finished with the Bourdon Vos Test
// The Experiment Leader is able to access the results once the correct password is entered


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
// NOTE: function not written by author. 
// SOURCE: https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
// GOAL: to allow for array extraction from sessionStorage

Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////   

//  DATA FROM bv_combined.js
    const STARTTIME = sessionStorage.getItem("start"); // startTime BV Test
    const FINISHTIME = sessionStorage.getItem("finish"); // finishTime entire page
    const ARRAY_MADE_RESPONSES = sessionStorage.getObj("ARRAY_MADE_RESPONSES");  // responses made // CODING: HIT (1), Miss (2), False Alarm (3) 
    const ARRAY_MADE_CORRECTIONS = sessionStorage.getObj("ARRAY_MADE_CORRECTIONS");  // corrections made // CODING: NO (0), YES (1)
    const ARRAY_CANVAS_RESPONSE_ORDER = sessionStorage.getObj("ARRAY_CANVAS_RESPONSE_ORDER");  // order in which responses were made
    const ARRAY_N_DOTS = sessionStorage.getObj("ARRAY_N_DOTS");    // amount of dots in each figure
    const ARRAY_RESPONSE_TIMES = sessionStorage.getObj("ARRAY_RESPONSE_TIMES");  // response times per canvas
    const STIMULI_ROWS = sessionStorage.getItem("stimuliRows"); // amount of rows containing stimuli
    const STIMULI_COLS = sessionStorage.getItem("stimuliCols"); // amount of stimuli columns

// DATA FROM bv_index.js
    const FIRSTNAME = sessionStorage.getItem("FIRSTNAME"); // participants first name
    const LASTNAME = sessionStorage.getItem("LASTNAME");
    const AGE = Number(sessionStorage.getItem("AGE"));
    const RESULT_ACCES_PASSWORD = String(sessionStorage.getItem("RESULT_ACCES_PASSWORD"));
 
 // TEST
     // console.log("ARRAY_RESPONSE_TIMES = " + ARRAY_RESPONSE_TIMES);
     // console.log("ARRAY_CANVAS_RESPONSE_ORDER = " + ARRAY_CANVAS_RESPONSE_ORDER);

// CREATE EMPTY VARIABLES
    var cleanedResponseArray = []; // array of response associated with each canvas
    var cleanedCorrectionArray = []; // array of amount of corrections made for each canvas
    var cleanedResponseTimeArray = []; // array of delta RT for each canvas
    var attentionAgeArray = []; // array for attentionAge for each stimuli row
    var accuracyAgeArray = []; // array for accuracy miss/false alarms/ corrections

    var hits = 0; 
    var miss = 0;
    var falseAlarm = 0;
    var corrections = 0;
    var noResponse = 0;
    var responses = 0;
    
    var attentionAge = Number(AGE); // code as number instead of prompt box string


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// MAIN FUNCTIONS ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// DISPLAY COMPLETION TEXT
    document.getElementById("maintext").innerHTML = (
    "Well done! You have finished the Bourdon Vos Test." + "<br>" +
    "Please call your supervisor and tell him/her that you are finished.");

// ENABLE PASSWORD VALIDATION
document.getElementById("button").innerHTML = "Results";
document.getElementById("button").onclick = function () {passwordValidation() };


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// SUPPORTING FUNCTIONS ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function passwordValidation () {
    // GOAL: prevent participant from accessing the results.
        // ... i.e. validate the password that is provided against the earlier specified password
    // INPUT VARIABLES: none
    
    // ASK PASSWORD    
    var passWord = String(window.prompt("Please enter the pre-specified password to access the results"));
    
    // VALIDATE INPUT
    if (passWord == RESULT_ACCES_PASSWORD) {
        window.alert("Correct password. These are the results: ");
        validated = "Yes"; // 
        
        // SET EL ENVIRONMENT
            document.body.style.backgroundColor = "Teal";

        // CALL
        presentScores (); // calculate and present results
    
        // SET BUTTON
            document.getElementById("button").innerHTML="print results"; // change text
            document.getElementById("button").onclick = function () {print()}; // allow for printing
        
    } else {
            var passwordReentry = window.confirm("This is not the correct password. Do you wish to try again?");
            // returns true if "confirm" is pressed
            
             if (passwordReentry == true) { 
                passwordValidation(); // launch password validation again
             } else {
                document.getElementById("maintext").innerHTML = (
                    "Thank you for using the online Bourdon Vos Test" + "<br>" +
                        "For questions and comments, please contact: sally.hogenboom@student.uva.nl")
                document.getElementById("button").style.visibility = "hidden";
            } // END re-entry of password IF
            
   } // END password VALIDATION   
} // END passwordValidation FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function presentScores () {
    // GOAL: display all relevant scores to the Experiment Leader
    // INPUT VARIABLES: none
        
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

    totalStimuli = (hits + miss + falseAlarm);
    responses = (totalStimuli - noResponse);
    
    for (i = 0; i < ARRAY_MADE_CORRECTIONS; i++) {
        // correction was coded as 1, no correction coded as 0
        // therefore sum of array = amount of corrections made
        corrections = corrections + ARRAY_MADE_CORRECTIONS[i];
    } // END correction count LOOP

    
    // CALCULATE SCORES _ PERCENTAGE
        percHits = round(((hits / totalStimuli)*100),2);
        percMiss = round(((miss / totalStimuli)*100),2);
        percFalseAlarms = round(((falseAlarm / totalStimuli)*100),2);
        percNoResponse = round(((noResponse / totalStimuli)*100),2);
        percResponses = round(((responses / totalStimuli)*100),2);
        percCorrections = round(((corrections / totalStimuli)*100),2)
    
    // CALCULATE ROW RT's
        calculateResponseTimes();
        
    // COMAPARE WITH NORM DATA
        normScores();
    
    // PRESENT OUTPUT
        createOutput();
        
        // window.alert("STIMULI_ROWS = " + STIMULI_ROWS);
        // window.alert("STIMULI_COLS = " + STIMULI_COLS);
        // window.alert(deltaResponseTimeArray);
     
} // END FUNCTION
 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function lastResponses () {
    // GOAL: determine which response was made to which canvas
        // ... and log if canvas was not responded to (i.e. not hovered over)
    // INPUT VARIABLES: none
    
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

function finalScore (cleanedResponseArray) {
    // GOAL: calculate amount of hits, misses, and false alarms
        // cleanedResponseArray: array with a response per canvas 
    // INPUT VARIABLES:
       // cleanedResponseArray: array containing final response for each canvas
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
    // INPUT VARIABLES: none
    
    deltaResponseTimeArray = [];
    var canvasDeltaTime = 0;
    rowRTArray = [];

    // CALCULATE DELTA TIME FOR ALL CANVASSES
    for (i = 0; i < cleanedResponseTimeArray.length; i++) {
        var canvasTime = cleanedResponseTimeArray[i]; // identify reaction time per canvas

        if (canvasTime == 999) {
            // no response was made i.e. no reaction time
            canvasDeltaTime = 0;
        } else {
            canvasDeltaTime = ((canvasTime - STARTTIME) / 10000); // calculate delta response time between start and that canvas
        } // END valid time IF
        deltaResponseTimeArray.push(canvasDeltaTime);
    } // END FOR LOOP
    
    var count = 0;
    var previousRT = 0;
    
    for (x = 0; x < STIMULI_ROWS; x++) {
     // reset rowReactionTime
        var rowRTTotal = 0;
                
    if (x == 0) {
        // first row reaction time
        // totalRT = rowTotal
        previousRT = 0;
        // console.log("previousRT =" + previousRT);
    } else {
        previousRT = rowRTArray[(x-1)];
        // console.log("previousRT =" + previousRT);
    }
        
    // CALCULATE ROW RT
        // loop all stimuli columns
            for (c = 0; c < STIMULI_COLS; c++) {
                // window.alert(deltaResponseTimeArray[count]);
                // console.log(deltaResponseTimeArray[count]);
                var rowRTTotal = round((rowRTTotal + deltaResponseTimeArray[count]),2);
                count = count + 1;
            } // END stimuli col LOOP
            
            // console.log("rowTTtotal =  " + rowRTTotal);
        // store total rowRT
        if ((rowRTTotal == 0) || (isNaN(rowRTTotal) == true)) {
             rowRT = ("-");
        } else {
             rowRT = round((rowRTTotal - previousRT),2); // extract previous row time because all times are delta with STARTTIME
        } // END rowRTTotal IF
        
            rowRTArray.push(rowRT);
    } // END row LOOP
            
} // END calculateResponseTimes FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function identifyNormGroup () {
    // GOAL: select the appropriate normGroup variable for calculation of scores
    // INPUT VARIABLES: none

    
    for (i = 6; i < 18; i++) {
        if (i == AGE) { // extract correct normgroup
            var referenceData = "normGroup"+ i;
        } // END IF
    } // END FOR ALL AGES
    
    return referenceData;
} // END identifyNormGroup FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function normScores () {
    // GOAL: determine how the participant did in comparison to the relevant norm group (age)
    // INPUT VARIABLES: none
    
   //  console.log("rowRTArray = " + rowRTArray);

    // SET VARIABLES
        var normGroup = "";
        // attentionAge: is defined as calander age at the beginning of the script
        // AGE: defined from sessionStorage

    // DETERMINE NORM GROUP (i.e. referenceData)
         for (i = 6; i < 18; i++) {
                if (i == AGE) { // extract correct normgroup
                  normGroup = "normGroup"+ i;
                } // END IF
        } // END FOR ALL AGES
        var referenceData = NORM_GROUP_DATA[normGroup]; // access relevant normgroup data (all data stored below)
         // console.log(referenceData);
 
    // SPEED (per row)
        for (x = 0; x < STIMULI_ROWS ; x++) {
            // GOAL: compare row rt with norm group data
            
            // extract row rt
                var rowRT = rowRTArray[x];
               //  console.log(rowRT);
           
           if ((isNaN(rowRT) == true) || (rowRT == 0)) {
            // do nothing to attentionAge
            attentionAge = "-";
            // console.log("rowRT =  NaN");
            // console.log("attentionAgeArray = " + attentionAgeArray);
           } else {
            // console.log("rowRT = " + rowRT);
                // comapre with norm group data
                if (rowRT > referenceData[3]) { // referenceData[3] = lowest RT boundary
                    if (rowRT > referenceData[2]) {
                        if (rowRT > referenceData[1]) {
                            if (rowRT > referenceData[0]) {
                                // reaction time larger than upper RT boundary
                                attentionAge = (attentionAge - 2);
                            } else {
                                // reaction time between [1] & [0]
                                // attentionAge = calender age - 1
                                attentionAge = (attentionAge - 1);
                            }    // END IF [1]
                        } else {
                           // reaction time between [2] & [1]
                            // attentionAge = calender age
                            attentionAge = attentionAge;
                        } // END IF [1]
                    } else {
                        // reaction time between [3] & [2]
                        // attentionAge = +1 calender age
                        attentionAge = (attentionAge + 1);
                    } // END IF [2]
                } else {
                    // if reaction time lower than lowest RT boundary than no if's were met
                    // attentionAge = -2 calander age
                    attentionAge = (attentionAge + 2); 
                } // END IF [3]
            } // END  rowRT == 0 IF
            
           attentionAgeArray.push(attentionAge);
        } // END rt rows LOOP 
    
    // ACCURACY
            
            // FALSE ALARMS 
                if (falseAlarm > 4 ) {
                    if (falseAlarm > 12) {
                        // false alarms > 12 == -1
                        var faAge =  Number(-1);
                    } else {
                     // false alarms between 4 & 12
                        var faAge = 0;
                    } // END IF [1]
                } else {
                    // falseAlarms < 4 == accuracyAge + 1
                    var faAge = 1;
                } // END falseAlarm IF [0]
        
                accuracyAgeArray.push((AGE + faAge));
                
            // CORRECTIONS
                if (corrections == 0) {
                    var cAge = 1;
                } else if (corrections < 3) {
                    var cAge = 0;
                } else {
                    // corrections > 3
                    var cAge = (cAge-1);
                } // END corrections IF
                
                accuracyAgeArray.push((AGE + cAge));
                
            // MISSES
                if (miss > 0) {
                    var mAge = Number(-1);
                } else {
                    // miss == 0
                    var mAge = 0;
                } // END miss IF
                
                accuracyAgeArray.push((AGE + mAge));
                
            // TOTAL
                accuracyAgeTotal = (AGE + (faAge + cAge + mAge));
                accuracyAgeArray.push(accuracyAgeTotal);
    
} // END normScores FUNCTION

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function createOutput () {
    // GOAL: create an output table for accuracy
     // INPUT VARIABLES: none
   
var outputTableRowData = outputTableRows();
    
document.getElementById("maintext").innerHTML = (
"<br>" + 
(FIRSTNAME.toUpperCase()) + " " + (LASTNAME.toUpperCase()) + "'s continued attention age is " + (((accuracyAgeArray[3]) + finalAttentionAge) - AGE) +
" years old." + "<br>" + "<br>" +

"<table>" +
    "<tr>" +
        "<th>" + "" +
        "<th>" + "Absolute Amounts" +
        "<th>" + "Percentages" +
        "<th>" + "Calender Age" +
        "<th>" + "Accuracy Age" +
    "</tr>" +
    "<tr>" +
        "<td>" + "Hits" +
        "<td>" + hits +
        "<td>" + percHits + " %" +
        "<td>" + AGE +
        "<td>" + "-" +
    "</tr>" +
    "<tr>" +
        "<td>" + "Misses" +
        "<td>" + miss +
        "<td>" + percMiss + " %" +
        "<td>" + AGE + 
        "<td>" + accuracyAgeArray[2] + 
    "</tr>" +
    "<tr>" +
        "<td>" + "False Alarms" +
        "<td>" + falseAlarm +
        "<td>" + percFalseAlarms + " %" +
        "<td>" + AGE + 
        "<td>" + accuracyAgeArray[0] + 
    "</tr>" +
    "<tr>" +
        "<td>" + "Corrections" +
        "<td>" + corrections +
        "<td>" + percCorrections + " %" +
        "<td>" + AGE + 
        "<td>" + accuracyAgeArray[1] + 
    "</tr>" +
     "<tr>" +
        "<td>" + "" +
        "<td>" + "" + 
        "<td>" + "" + 
        "<td>" + "" +
        "<td>" + "" +
    "</tr>" +
    "<tr>" +
        "<td>" + "<b>" + "Missed Responses" + 
        "<td>" + "<b>"+ noResponse + 
        "<td>" + "<b>"+ percNoResponse + " %" +
        "<td>" + "<b>"+ "-" +
        "<td>" + "<b>"+ "-" +
    "</tr>" +
       "<tr>" +
        "<td>" + "Responses" +
        "<td>" + responses + 
        "<td>" + percResponses + " %" +
        "<td>" + "-" +
        "<td>" + "-" +
    "</tr>" +
    "<tr>" +
        "<th>" + "TOTAL" +
        "<th>" + totalStimuli +
        "<th>" + "100 %" +
        "<th>" + AGE + " years" + 
        "<th>" + accuracyAgeArray[3] + " years" + 
    "</tr>" +
"</table>" +
"<br>" +
outputTableRowData +
"<br>"
); // END HTML OBJECT

} // END createOutput FUNCTION


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function outputTableRows () {
    // GOAL: to create an output table per stimuli row
    // INPUT VARIABLES: none
    
     finalAttentionAge = AGE;
    
    var headers =  String("<table>" +
    "<tr>" +
        "<th>" + "Row Number" +
        "<th>" + "Reaction Time" +
        "<th>" + "Calender Age" +
        "<th>" + "Attention Age" +
    "</tr>");
    
    var middleSection  = "";
    
    for (i = 0; i < STIMULI_ROWS; i++) {
        middleSection = (String(middleSection) + (
       "<tr>" + 
        "<td>" + (i+1) +
        "<td>" + rowRTArray[i] +
        "<td>" + AGE + 
        "<td>" +  attentionAgeArray[i] +
    "</tr>"));
    // console.log(middleSection);    
    
        if (attentionAgeArray[i] == "-") {
            // do nothing to final attention age
        } else {
            finalAttentionAge = attentionAgeArray[i];
        } // END finalAttentionAge IF
     
    } // END LOOP
    
    var endTable = ("<tr>" +
        "<th>" + "TOTAL" +
        "<th>" + ((FINISHTIME - STARTTIME)/1000) +
        "<th>" + AGE + " years" +
        "<th>" + finalAttentionAge + " years" +
    "</tr>" +
    "</table>");
    
    return (headers + middleSection + endTable);
} // END outputTableRows FUNCTION


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INTERNET FUNCTIONS /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// NOTE
// Functions that were used to create the task that were not programmed by the author

// SOURCE: http://www.jacklmoore.com/notes/rounding-in-javascript/
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
 
 const NORM_GROUP_DATA = {
    normGroup6: [31.5	,	24.9	,	18.4	,	16.5],
    normGroup7: [27.6	,	23.5	,	18.0	,	15.6],
    normGroup8: [23.2	,	19.6	,	16.4	,	13.7],
    normGroup9: [20.4	,	18.0	,	14.3	,	12.5],
    normGroup10: [20.6	,	16.8	,	13.7	,	12.0],
    normGroup11: [17.2	,	14.9	,	12.4	,	11.1],
    normGroup12: [17.1	,	14.7	,	11.9	,	10.0],
    normGroup13: [16.5	,	14.2	,	11.1	,	9.1],
    normGroup14: [15.3	,	12.8	,	9.9	,	8.4],
    normGroup15: [14.2	,	11.6	,	9.7	,	9.2],
    normGroup16: [13.6	,	11.4	,	9.0	,	8.4],
    normGroup17: [13.0	,	11.1	,	9.1	,	8.2],
 }   // END OBJECT
 
 



