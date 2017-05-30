
// set background color to math the Experiment Leader background
document.body.style.backgroundColor = "LightGoldenRodYellow";

// Display instructions
document.getElementById("maintext").innerHTML = ("Dear Experimenter, " + "<br> <br>" + 
    "You are about to test a participant with the Bourdon Vos Test. " + "<br>" + 
        "Please be aware this test is not suited for children younger than 6" +
            " or older than 17 years." + "<br> <br>" +
                "Please click the 'demographics' button to enter the " +
                    " participant's demogrpahics before calling the participant.");

// Display button
document.getElementById("button").innerHTML = "Demographics";

function demographics () {
    // GOAL: to let the experiment leader enter the participant's demographics 
        // ... & stop the task from exectution if age requirements (6 < age < 17) are not met.
        // no input variables
        
    // SET VARIABLES
     validated = "No";
            
    const FIRSTNAME = window.prompt("First name: "); // ... enter pp. first name
        
    if (FIRSTNAME != null) {
        const LASTNAME = window.prompt("Last name: "); // ... enters pp. last name
            if (LASTNAME != null) {
                const GENDER = window.prompt("The participant is ... [Male/Female/Other]"); // ... enter pp gender [suggestions] 
                    if (GENDER != null) {
                        const AGE = agePrompt();
                        if (AGE != null) {
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
                                    // load practice window upon clicking the button
    
                                // store variables in temporary memory for acces later on 
                                    sessionStorage.setItem("FIRSTNAME", FIRSTNAME);
                                    sessionStorage.setItem("LASTNAME", LASTNAME);
                                    sessionStorage.setItem("AGE", AGE);
                                    sessionStorage.setItem("RESULT_ACCES_PASSWORD", String(RESULT_ACCES_PASSWORD));

                        } else {
                            // finish task
                            document.getElementById("maintext").innerHTML = 
                                "Thank you for viewing the online Bourdon Vos Test. Please contact sally.hogenboom@student.uva.nl for any questions  or comments regarding the test.";
                            document.getElementById("button").style.visibility = "hidden";  // no advance possible to task
                        } // END AGE IF
                    } else {
                            // finish task
                            document.getElementById("maintext").innerHTML = 
                                "Thank you for viewing the online Bourdon Vos Test. Please contact sally.hogenboom@student.uva.nl for any questions  or comments regarding the test.";
                            document.getElementById("button").style.visibility = "hidden";  // no advance possible to task
                    } // END GENDER IF
            } else {
                // finish task
                document.getElementById("maintext").innerHTML = 
                    "Thank you for viewing the online Bourdon Vos Test. Please contact sally.hogenboom@student.uva.nl for any questions  or comments regarding the test.";
                document.getElementById("button").style.visibility = "hidden";  // no advance possible to task
            } // END lastname IF
    } else {
        // finish task
            document.getElementById("maintext").innerHTML = 
                "Thank you for viewing the online Bourdon Vos Test. Please contact sally.hogenboom@student.uva.nl for any questions  or comments regarding the test.";
            document.getElementById("button").style.visibility = "hidden";  // no advance possible to task
    } // END firstname IF

} // END demographics FUNCTION


function agePrompt ()  {
    // GOAL: To determine whether the input for the participant demographics is a number and falls between the appropriate age range for the Bourdon Vos Test (6 - 17)
    
    while (validated == "No") { 
        var AGE = parseFloat(window.prompt("The participant is ... years old: ")); // parseFloat to change numerical input from prompt to number instead of string
         
         if (isNaN(AGE) == false) {
            // number validation passed >> AGE is a number
            
            // check if age falls within limits: 6 < age < 17, if not prompt for re-entry of demographics  
            if (AGE < 6 || AGE > 17) {
                // pp age does not fall within age limit
                window.alert("The participants age = " + AGE + ". The BVTest is only suited for children between 6 and 17 years"); 
                    
                    // Re-enter participant age?
                        var reEnter =  window.confirm(
                             "Do you wish to re-enter the participant's age?"); 
                                // Confirm or cancel pop-up box
                                // ... if confirmed reEnter == true, if canceld reEnter == false
       
                        if (reEnter == true) {
                            validated == "No"; // prompts re-entry and re-validation for age
                        } else { 
                            // the experimenter did not want to re-enter the pp demographics
                            // reEnter == false
                            console.log("The experiment leader did not wish to re-enter the demographics")
                            document.getElementById("maintext").innerHTML = 
                            "Thank you for viewing the online Bourdon Vos Test. Please contact sally.hogenboom@student.uva.nl for any questions  or comments regarding the test.";
                            document.getElementById("button").style.visibility = "hidden";  // no advance possible to task
                        } // END reEnter  
                    
                } else {
                    // participant age lies within age range
                    validated = "Yes"; // will discontinue the while loop
                }   // END age IF
            
            } else {
                // pp age = not a number
                window.alert("The participant age you specified was not a number. Please enter the participant's age in numbers only")

                // Re-enter participant age?
                        var reEnter =  window.confirm(
                             "Do you wish to re-enter the participant's age?"); 
                                // Confirm or cancel pop-up box
                                // ... if confirmed reEnter == true, if canceld reEnter == false
                                console.log(reEnter);
                        if (reEnter == true) {
                            validated == "No"; // prompts re-entry and re-validation for age
                        } else { 
                            // the experimenter did not want to re-enter the pp demographics
                            // reEnter == false
                            console.log("The experiment leader did not wish to re-enter the demographics")
                            document.getElementById("maintext").innerHTML = 
                            "Thank you for viewing the online Bourdon Vos Test. Please contact sally.hogenboom@student.uva.nl for any questions  or comments regarding the test.";
                            document.getElementById("button").style.visibility = "hidden";  // no advance possible to task
                            validated == "Yes";
                            break;
                        } // END reEnter  

                // var AGE = 0;
         } // END number IF         
    } // END WHILE LOOP
    
    return AGE;
} // END agePrompt FUNCTION    

