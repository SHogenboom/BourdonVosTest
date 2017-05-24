
// NORMGROUP DATA

// SPEED
// < [0] = -2 
// -1 // 0 // +1 // +2

var normGroup6 = [31.5	,	24.9	,	18.4	,	16.5];
var normGroup7 = [27.6	,	23.5	,	18.0	,	15.6];
var normGroup8 = [23.2	,	19.6	,	16.4	,	13.7];
var normGroup9 = [20.4	,	18.0	,	14.3	,	12.5];
var normGroup10 = [20.6	,	16.8	,	13.7	,	12.0];
var normGroup11 = [17.2	,	14.9	,	12.4	,	11.1];
var normGroup12 = [17.1	,	14.7	,	11.9	,	10.0];
var normGroup13 = [16.5	,	14.2	,	11.1	,	9.1];
var normGroup14 = [15.3	,	12.8	,	9.9	,	8.4];
var normGroup15 = [14.2	,	11.6	,	9.7	,	9.2];
var normGroup16 = [13.6	,	11.4	,	9.0	,	8.4];
var normGroup17 = [13.0	,	11.1	,	9.1	,	8.2];

// idenfify age group
  const AGE = sessionStorage.getItem("AGE");
  for (i = 6; i < 18; i++) {
        if (i == AGE) { // extract correct normgroup
            var referenceData = "normGroup"+i;
        } // END IF
  } // END FOR ALL AGES


// ACCURACY
// < smaller than = +1 // 0 // -1
var accuracyMiss = [4, 12];
var accuracyCorrection = [0, 3];
var accuracyFalseAlarms = [0] // 0 == 0 // > 0 == -1


