///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// EXPERIMENT LEADER ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////// DEMOGRAPHICS /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GOAL
// The Experiment Leader (EL) is provided with welcome instructions.
// The EL provides the Participant demographics, which are used to calculate final scores
// The EL specifies a password that is used to access the results at the final stage

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CREATE EL ENVIRONMENT
document.body.style.backgroundColor = "Teal"; // set background color
document.getElementById("button").innerHTML = "Demographics"; // display demographics button
document.getElementById("button").onclick = function () {demographics() }; // call demographics function upon button click

// DISPLAY INSTRUCTIONS
document.getElementById("maintext").innerHTML = (
"Dear Experiment Leader," + "<br>" +
"You are about to administer the Bourdon Vos Test. The Bourdon Vos Test is used to measure continued attention in children aged 6 - 17 years old." + "<br>" +
"Please click the 'demographics' button to enter the participant's demographics. You will also be asked to specify a password that protects the results from being accessed by the participant. Please be aware that if you forget the pre-specified password, you will not be able to access the results!"
);

console.log("Displayed Welcome Instructions.");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function demographics () {
    // GOAL: to let the EL enter the participant's demographics 
        // ... & stop the task from exectution if age requirements (6 < age < 17) are not met.
        // stop task if EL chooses to stop entering demographics
    // INPUT VARIABLES: none
        
    // SET VARIABLES
     validated = "No"; // used to validate age input
     var firstName = "";
     var lastName = "";
     var gender = "";
     var age = 0;
     var resultPassword = "";
            
    var firstName = window.prompt("First name: "); // ... enter pp. first name
        
    if (firstName != null) { // if null then EL did not enter a first name
        var lastName = window.prompt("Last name: "); // ... enters pp. last name
            if (lastName != null) { // if null then EL did not enter a last name
                var gender = window.prompt("The participant is ... [Male/Female/Other]"); // ... enter pp gender [suggestions] 
                    if (gender != null) { // if null then EL did not enter gender
                        var age = agePrompt(); // CALL enter pp age & validate
                        if (age != null) { // if null then EL cancelled age input
                                var resultPassword =
                                    window.prompt(("Please enter a password that will allow only you" +
                                         " to access the participant's results after completion." +
                                         " Please be aware that you will not be able to access the results if you forget this password."), "enter password");
                                    // experimenter enters password that is required to extract results at the end
                                
                        } else {
                            // finish task
                            finishTask();
                        } // END age IF
                    } else {
                        // finish task
                        finishTask();
                    } // END gender IF
            } else {
                // finish task
                finishTask();
            } // END lastname IF
    } else {
        // finish task
        finishTask();
    } // END firstname IF
    
    
// DISPLAY NEW INSTRUCTIONS 
    document.getElementById("maintext").innerHTML = 
    ("Thank you for entering the participant's demographics" +
     "<br>" + "It is now time to call the participant." + "<br>" +
      "Please press 'next' to display the participant instructions");

// SET NEW BUTTON
    document.getElementById("button").innerHTML = "next"; // change button text
    document.getElementById("button").onclick = function(){window.location.href = "bv_practice.html"}; // load practice window upon clicking the button
    
// STORE DATA (temporary local memory)
    sessionStorage.setItem("FIRSTNAME", firstName);
    sessionStorage.setItem("LASTNAME", lastName);
    sessionStorage.setItem("AGE", age);
    sessionStorage.setItem("RESULT_ACCES_PASSWORD", String(resultPassword));

// TEST
    console.log("Firstname = " + firstName); // display input
    console.log("Lastname = " + lastName); // display input
    console.log("Gender = " + gender); // display input
    console.log("Age = " + age); // display input 
    console.log("CONDITION; age between 6 - 17 [true] : " + ((age > 6) && (age < 17))); // condition 
    console.log("CONDITION; age is NOT a number [false] : " + isNaN(age)); // condition
    console.log("CONDITION; a password stored in memory [NOT null / undefined] : " + typeof(sessionStorage.getItem("RESULT_ACCES_PASSWORD")));
    
} // END demographics FUNCTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function agePrompt ()  {
    // GOAL: To determine whether the input for the participant demographics is a number and falls between the appropriate age range for the Bourdon Vos Test (6 - 17)
    // INPUT VARIABLES: none
    
    while (validated == "No") {  // set in demographics ()
        var age = parseFloat(window.prompt("The participant is ... years old: ")); // ... enter pp. age
        // parseFloat to change numerical input from prompt to number instead of string
         
         if (isNaN(age) == false) {
            // number validation passed >> age is a number
            
            // check if age falls within limits: 6 < age < 17, if not prompt for re-entry of demographics  
            if (age < 6 || age > 17) {
                // pp age does not fall within age limit
                window.alert("The participants age = " + age + ". The BVTest is only suited for children between 6 and 17 years."); 
                    
                    // Re-enter participant age?
                        var reEnter =  window.confirm(
                             "Do you wish to re-enter the participant's age?"); 
                                // Confirm or cancel pop-up box
                                // ... if confirmed reEnter == true, if canceld reEnter == false
       
                        if (reEnter == true) {
                            validated == "No"; // prompts re-entry and re-validation for age, continue while loop
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
                    validated = "Yes"; //  discontinue the while loop
                }   // END age IF
            
            } else {
                // pp age = not a number
                window.alert("The participant age you specified was not a number. Please enter the participant's age in numbers only")

                // Re-enter participant age?
                        var reEnter =  window.confirm(
                             "Do you wish to re-enter the participant's age?"); 
                                // Confirm or cancel pop-up box
                                // ... if confirmed reEnter == true, if canceld reEnter == false
                                console.log("Re-enter pp age?: " + reEnter);
                        if (reEnter == true) {
                            validated == "No"; // prompts re-entry and re-validation for age
                        } else { 
                            // the experimenter did not want to re-enter the pp demographics
                            // reEnter == false
                            console.log("The experiment leader did not wish to re-enter the pp age");
                            finishTask();
                            validated = "Yes"; // discontinue while loop
                            break; // terminate loop
                        } // END reEnter  
         } // END number IF         
    } // END WHILE LOOP
    
    // TEST
        // included in the parent function Demographics()
    
    return age; // return age to parent function Demographics()
    
} // END agePrompt FUNCTION  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function finishTask () {
    // GOAL: to prevent continuation through the task because EL indicated that they wished to discontinue
    // INPUT VARIABLES: none
    
    // DISPLAY TEXT
    document.getElementById("maintext").innerHTML = 
                                ("Thank you for viewing the online Bourdon Vos Test. Please contact sally.hogenboom@student.uva.nl for any questions or comments regarding the test." +
                                "<br>" + "If you encountered a bug, please consider reporting this by clicking the 'bug' button.");
    
    // DISCONTINUE ADVANCEMENT
    document.getElementById("button").style.visibility = "hidden";  // hide advance button
    
    // LOG
    console.log("Discontinued Task");
    
} // END finishTask FUNCTION

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



