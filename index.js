/** Bourdon Vos Test
* @author hogen.boom@hotmail.com (Hogenboom, S. A. M.)
* @fileoverview Flow order: index > bv_pratice > bv_test > bv_results
* @todo 
* - complete JSDOC comment style
* - hide password entry with astrixes
* @description 
*       The first screen that is presented when launching the Bourdon Vos Test.
*       The screen is viewed by the experimenter and allows for 
*       entry of the demographics into memory.
*       Furthermore, it allows to set a personal password so that 
*       the results can be viewed by the experimenter
*       upon completion of the test by the participant.
*/


/** Welcome text */
document.getElementById("maintext").innerHTML = ("Dear Experimenter, " + "<br> <br>" + 
    "You are about to test a participant with the Bourdon Vos Test. " + "<br>" + 
        "Please be aware this test is not suited for children younger than 6" +
            " or older than 17 years." + "<br> <br>" +
                "Please click the 'demographics' button to enter the " +
                    " participant's demogrpahics before calling the participant.");

document.getElementById("button").innerHTML = "Demographics";

/**
*@function demographics
* GOAL: to let the experiment leader enter the participant's demographics 
* & stop the task from exectution if age requirements (6 < age < 17) are not met.
* @summary Enter pp. demographics
* @const {String} FIRSTNAME First name of the participant
* @const {String} LASTNAME Last name of the participant
* @const {String} GENDER Gender of the participant. Advised options: 
*    [Male/Female/Other]
* @const {Number} AGE Current age of the participant 
* @const {String | Number} RESULT_ACCES_PASSWORD Lets the experimenter set 
*    a password that is needed to access the participants results at the end. 
*    Default set at "password"
* @var {Boolean} reEnter Whether the experiment leader chose to re-enter
*    the participants demographics, after the age did not meet requirements.
*/

function demographics () {
    // GOAL: to let the experiment leader enter the participant's demographics 
        // ... & stop the task from exectution if age requirements (6 < age < 17) 
        // ... are not met.
        // no input variables
            
    const FIRSTNAME = 
        window.prompt("First name: "); // ... enter pp. first name
    const LASTNAME = 
        window.prompt("Last name: "); // ... enters pp last name
    const GENDER = 
        window.prompt("The participant is ... [Male/Female/Other]"); 
        // ... enter pp gender [suggestions] 
    const AGE =
        window.prompt("The participant is ... years old: ");
        // ... enter pp age > validated!
    
    /** check if age falls within limits: 6 < age < 17, if not prompt for re-entry of demographics */ 
    if (AGE < 6 || AGE > 17) {
        console.log("The participants age = " + AGE + 
            "The BVTest is only suited for 6-17 years");    
            
       let reEnter =  window.confirm(
           "The Bourdon Vos Test is only suited for children between 6 and 17 years old." + 
               "\n" + "Do you wish to re-enter the participant's demographics?"); 
               // Confirm or cancel pop-up box
               // ... if confirmed reEnter == true, if canceld reEnter == false
       
        if (reEnter == true) {
            demographics(); // re-initialize the function to allow for re-entry
        } else { 
            // the experimenter did not want to re-enter the pp demographics
            console.log("The experiment leader did not wish to re-enter the demographics")
            document.getElementById("maintext").innerHTML = 
                "Thank you for using the online Bourdon Vos Test";
            document.getElementById("button").style.visibility = "hidden"; 
                // no advance possible to task
        } // END reEnter  
    } // END AGE suitability check
    
    const RESULT_ACCES_PASSWORD =
        window.prompt(("Please enter a password that will allow only you" +
        " to access the participant's results after completion"), "password");
        // experimenter enters password that is required to extract results at the end
    
    document.getElementById("maintext").innerHTML = 
        ("Thank you for entering the participant's demographics" +
            "<br>" + "It is now time to call the participant." + "<br>" +
                "Please press 'next' to display the participant instructions");
    document.getElementById("button").innerHTML = "next"; // change button text
    document.getElementById("button").onclick = function(){window.location.href = "bv_practice.html"};
    console.log(document.getElementById("button").onclick);
        // load practice window upon clicking the button
    
    /** store variables in temporary memory for acces later on */
     sessionStorage.setItem("FIRSTNAME", FIRSTNAME);
     sessionStorage.setItem("LASTNAME", LASTNAME);
     sessionStorage.setItem("AGE", AGE);
     sessionStorage.setItem("RESULT_ACCES_PASSWORD", String(RESULT_ACCES_PASSWORD));
} // END demographics FUNCTION

