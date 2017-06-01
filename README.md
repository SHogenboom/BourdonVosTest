<H1 id="top"> Online Bourdon Vos Test </H1>

The Online Bourdon Vos Test (O-BVT) has transformed the Bourdon Vos Test (BVT; 1998) from a paper-and-pencil version to a web based test. The O-BVT & BVT measure continued attention in children aged 6 - 17. This is done by providing the participants with a sheet (BVT) or screen (O-BVT) containing 33 rows with 24 figures each (i.e. 792 figures). Each figure contains of either 3, 4, or 5 black dots. This is why the adult version (the Bourdon Wiersma Test) is also called the "Dot Cancellation Test".  The aim for participants is to cross out the figures with 4 dots (and only those!) as fast as possible. The participant's accuray and speed are compared to norm group data (e.g., age group) and provide an indication as to whether the participant suffers from attention deficits (a lower attention age) or scores above average (a higher attention age). The O-BVT benefits the Experiment Leaders greatly because they do not need to be present to administer the test, nor do they need to spent time on calculating the scores; this is all done for them.  

**IF YOU WISH TO USE THE ONLINE BOURDON VOS TEST - PLEASE SEE THE [USER MANUAL](#usermanual) FOR INSTRUCTIONS !**

This document contains information on the process behind creating the O-BVT in line with the requirements for the course "Programming The Next Step", which was given at the University of Amsterdam, the Netherlands, in 2017. For other software developers I recommend looking at the [Design](#design) section as it contains examples of the code. Of course, all source files are accessible on GitHub: [Bourdon Vos Test](https://github.com/SHogenboom/BourdonVosTest). All files contain in-line comments.

<H2> Content </H2>

* [Requirements](#requirements)
	+ [Scenario](#scenario)
    + [Screenshots](#screenshots)
    + [Task Flow](#taskflow)
        + [User](#taskflowuser)
    	+ [Software](#taskflowsoftware)
* [Design](#design)
	+ [Content](#content)
* [Implementation](#implementation)
	+ [Version Control](#versioncontrol)
    + [Coding Style](#codingstyle)
    + [Testing](#testing)
    + [Documentation](#documentation)
    + [Error Provision](#errorprovision)
* [Verification](#verification)
	+ [Alpha Testing](#alphatester)
    + [Bug Reporting](#bugs)
* [Planned Developments](#development)
* [User Manual](#usermanual)
* [References](#references)
	+ [Bourdon Vos Test](#bourdonvostest)
    + [Norm Groups](#normgroup)
    

[*top*](#top)


<H2 id="requirements"> Requirements </H2>

<H3 id="scenario"> Scenario </H3>

The BVT is administered by an `Experiment Leader` to a child aged 6 - 17 with (un)diagnosed attention deficits. Therefore, the O-BVT serves two audiences: the `Experiment Leader` and the `Participant`. The `Participant` is merely pre-occupied with crossing out any figure that contains 4 dots (leaving 3 and 5 dot figures untouched). To do so, the `Participant` needs to comprehend how to perform the task while on the computer. The `Experiment Leader` aims to determine if the `Participant`'s continued attention levels matches that of his/her peers. Therefore, the `Experiment Leader` normally (in the BVT) has to instruct the `Participant`, record reaction times, and compute total scores. In the O-BVT, this will all be done by the software, thereby significantly decreasing the time and effort it costs an `Experiment Leader` to administer the Bourdon Vos paradigm. The `Experiment Leader` is only tasked with entering the `Participant`'s demographics. 

[*top*](#top)

<H3 id="screenshots"> Screenshots </H3>

![Screenshot Bourdon Vos Test](https://github.com/SHogenboom/BourdonVosTest/blob/master/BourdonWiersma.png)   

*Screenshot of Bourdon Vos Test*      


![Screenshot Online Bourdon Vos Test](https://github.com/SHogenboom/BourdonVosTest/blob/master/O-BVT.png)  

*Screenshot of Online Bourdon Vos Test*    
All figures with 4 dots are to be clicked (i.e. crossed out). When the participant has moved the mouse over a figure, this figure will turn grey. 

[*top*](#top)

<H3 id="taskflow"> Task Flow </H3>

![Task Flow](https://github.com/SHogenboom/BourdonVosTest/blob/master/BVT%20Flowchart.png)

*Task flow of the O-BVT. On the far left the source files are listed for each part of the task. These are also included in the table below. The middle section indicates the phases which the Experiment Leaders [blue] and Participants [green] experience.  The far right indicates all phases of the software.*



| Page |`HTML` | `JavaScript` | `CSS` | Function|
|:----:|:-----:|:------------:|:-----:|:-------:|
|1|[index.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.html)|[index.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Demograhpics|
|2|[bv_test_fixed.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_test_fixed.html)|[bv_combined.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_combined.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)| Practice Stimuli + Practice Line + Bourdon Vos Test|
|3|[bv\_results.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results.html)|[bv\_results\_fixed.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results_fixed.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Results|  

*Table of HTML pages presented in the O-BVT in the order they are displayed to the user. Supporting Javascript & CSS files per page. All links refer to the source file location on gitHub.*  


<H4 id="taskflowuser"> Task Flow User </H4>

*NOTE: all links refer to the JavaScript code documented in the [O-BVT Design](#design) section.*

**Experiment Leader** follows instructions from the [User Manual](https://github.com/SHogenboom/BourdonVosTest/blob/master/README_USERS.pdf) to start the O-BVT. The O-BVT starts with the index page to display **Experiment Leader** instructions & allows the **Experiment Leader** to enter the Participant's [*demographics*](#demographics). The **Experiment Leader** then calls the **Participant** to the computer who will start the [*practice*](#practice) phase. Here, the **Participant** will be instructed on the possible stimuli and the mouse actions, then -similar to the BVT - the **Participant** completes a first row of the Bourdon Vos Test. After completing the practice phase, indicating that the **Participant** understands how to operate the computer and what is expected in the task, the **Participant** will continue on to the main phase: the [*Bourdon Vos Test*](#bvt). When the **Participant** has finished the task, he/she will call the **Experiment Leader** again. The **Experiment Leader** then has to enter the pre-specified [password](#password) in order to access the participant's [*results*](#results).

<H4 id="taskflowsoftware"> Task Flow Software </H4>

*NOTE: all links refer to the JavaScript code documented in the [O-BVT Design](#design) section.*

1. **Display** instructions to Experiment Leader
2. **Ask for  & store** Participant's [Demographics](#demographics)
	+ First Name
    + Last Name
    + Age
    + Gender
3. **Store** specified [Password](#password) to prevent the results from being accessed by the Participants in the [Results](#results) phase.
4. **Change interface** from Experiment Leader interface to Participant interface
5. **Display** Participant with instructions about the task
6. **Present** [Practice Trial](#practice) to Participant to familiarize with interface & operation
	+ **Store** responses
    + **Loop until** pp. crosses out all 4 dotted figures in 1 row of random figures
    + **Store** amount of practice trials
7. **Present** [Bourdon Vos Test](#bvt) to Participant
	+ **Create** [Stimuli](#stimuli)
	+ **Track** [responses](#response)
    + Enable **response visualizations** to each figure (i.e. crossing out)
    + **Store** reaction times per row & for total Bourdon Vos test
8. **Change interface** from Participant interface to Experiment Leader interface
9. **Validate** pre-specified [Password](#password) input
	+ if valid return results
    + if invalid retry or exit the O-BVT
10. **Display** [Results](#results)
	+ **Calculate** absolute hits/misses/false alarms
    + **Calculate** amount of figures not reviewed
    + **Display** percentage of hits/misses/false alarms/not reviewed
    + **Calculate** row reaction time
    + **Compare** participant data to norm group data (based on age)

[*top*](#top)

<H2 id="design"> Design </H2>

This section provides context on the code that was used to create the Bourdon Vos Test from a more global perspective. Necessary elements of the code are discussed, however, changes in button text etc are not discussed. All code files are accessible  on [GitHub](https://github.com/SHogenboom/BourdonVosTest) and contain in-code comments for specifics. Relevant code snippets can be viewed by clicking the "> Code: ... " buttons. 

[*Skip to 'Implementation'*](#implementation)

[*top*](#top)

<H3 id="content"> Content </H3>  

* [Demographics](#demographics)
* [Password Protect Results](#password)
* [Practice Trial](#practice)
* [Bourdon Vos Test](#bvt)
	+ [Stimuli](#stimuli)
    + [Response Actions](#response)
* [Results](#results)  
* [Function From Internet Sources](#internet)

[*top*](#top)

<H3 id="demographics"> Demographics </H3>

The experiment leader is asked to provide the participant's `FIRSTNAME`, `LASTNAME`, `GENDER`, and `AGE`. `FIRSTNAME`, `LASTNAME`, `GENDER` input is **not validated** because these are not used for any other reason than to address the participant at a later phase. `AGE` is **validated** against two criteria: 1) The input is a number, and 2) the participant is between 6 and 17 years old. This validation is important because norm group data is not available for other age groups. 

The experiment leader is provided with a way out by clicking "cancel" in the prompt boxes. In doing so the experiment leader does not continue with the rest of the O-BVT. 

<details>
	<summary> Code: Prompt Demographic Input </summary> 
    <p>  


```javascript
    const FIRSTNAME = window.prompt("First name: "); // ... enter pp. first name
        
    if (FIRSTNAME != null) {
        const LASTNAME = window.prompt("Last name: "); // ... enters pp. last name
            if (LASTNAME != null) {
                const GENDER = window.prompt("The participant is ... [Male/Female/Other]"); // ... enter pp gender [suggestions] 
                    if (GENDER != null) {
                        const AGE = agePrompt();
                        if (AGE != null) {
                                // ENTER PASSWORD
                                
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
```  
</p>
</details>

***

<details> <summary> Code: Age Validation </summary> <p>

``` javascript
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


```
</p> </details>

***

[*top*](#top)

<H3 id="password"> Password Protect Results </H3>

Both the Experiment Leader and the Participant use the same computer, therefore, the *results* are protected from being viewed by the participant through a password. When the Experiment Leader sets up the experiment by entering the participant demographics, he/she is also asked to specify a password. The default value is set to "password".  

**WARNING** 
If the Experiment Leader forgets the password they previously specified, he/she will not be able to view the participant's results.

<details><summary> Code: Prompt Password </summary><p>

``` javascript
	const RESULT_ACCES_PASSWORD =
        window.prompt(("Please enter a password that will allow only you" +
        " to access the participant's results after completion"), "password");

```
</p></details>

***

The password that is entered by the Experiment Leader is stored in `sessionStorage` until it is recalled in the results section of the O-BVT. When the participant has completed the Bourdon Vos Test, the Experiment Leader is prompted to enter their personal password. The entered password is **validated** against the earlier given password. 


<details><summary> Code: Validate Password </summary><p>

``` javascript
	var passWord = String(window.prompt("Please enter the specified password to access the results"));
 
    if (passWord == RESULT_ACCES_PASSWORD) {
        window.alert("Correct password. These are the results: ")
        
        // CALL FUNCTIONS TO DISPLAY RESULTS
        
    } else {
            var passwordReentry = window.confirm("This is not the correct password. Do you wish to try again?");
            
             if (passwordReentry == true) {
                displayResults(); // launch validation again
             } else {
                document.getElementById("maintext").innerHTML = (
                    "Thank you for using the online Bourdon Vos Test" + "<br>" +
                        "For questions and comments, please contact: sally.hogenboom@student.uva.nl")
               
        } // END re-entry of password IF
   	} // END password Comparison

```
</p></details>

***

[*top*](#top)

<H3 id="practice"> Practice Trials </H3>

The participants is provided with two opportunities to become familiar with the upcoming task. Firstly, he/she is provided with the `practice.html` screen which shows 3 figures. The first figure contains 3 dots, the second 4 dots, and the third 5 dots. 

<details><summary> Code: Create Practice Figures </summary><p>

``` javascript

	function figureCreation(canvasID) {
    	// GOAL create three practice figures
    
    	var dots = (canvasID.replace("Canvas", "")); 
    	// Delete "Canvas" from id to identify amount of dots
    
    	if (dots == 3) {
        	blackDot(10,10,5,canvasID);
        	blackDot(40,30,5,canvasID);
        	blackDot(10,50,5,canvasID);
    	} else if (dots == 4) {
        	blackDot(30,10,5,canvasID);
        	blackDot(10,50,5,canvasID);
        	blackDot(30,30,5,canvasID);
        	blackDot(50,50,5,canvasID);
    	} else if (dots == 5) {
        	blackDot(30,30,5,canvasID);
        	blackDot(10,50,5,canvasID);
        	blackDot(50,10,5,canvasID);
        	blackDot(50,50,5,canvasID);
        	blackDot(30,10,5,canvasID);
    	}
    
	} // END figureCreation FUNCTION

```

*NOTE* the blackDot function is explained in the [stimuli](#stimuli) section
</p></details>

***

The participant is guided through the process of which figures to click (only those with 4 dots) and what to do if they made a mistake (i.e. how to make a correction). How the figures are made response active is discussed in [here](#stimuli).

<details><summary> Code: Response Instructions </summary><p>

``` javascript

        if (index == 1 && clicks == 0) {
            document.getElementById("maintext").innerHTML = 
            ("Easy right? But what if you clicked a figure with 3 or 5 dots" +
            " by accident? Try clicking a figure twice and see what happens")
            warning = false;
        } else if ((clicks == 1 && index == 0) || (clicks == 1 && index == 2)){
            document.getElementById("maintext").innerHTML = 
            ("Welldone! You are ready for the Bourdon Vos Test" +
            "<br>" + "Please click 'Start the Test' to get going.")
            document.getElementById("button").innerHTML = "Start the Test";
            document.getElementById("button").style.visibility = "visible";
            document.getElementById("button").onclick = function() {window.location.href = "bv_test_fixed.html"};
            warning = false;
        } else if (index != 1 && warning == true) {
            document.getElementById("maintext").innerHTML = 
            ("You should click the figure with 4 dots first!");
        } // END display of new instructions


```

</p></details>

***

Upon familiarization with all possible responses (i.e. 1 click = cross out, 2 clicks = correction) the participant is redirected to the actual practice phase of the BVT: a single line with random figures. Presentation of this practice line was programmed in the `bv_test_fixed.html` file as all necessary functions were already present there. 

[*top*](#top)

<H3 id="bvt"> Bourdon Vos Test </H3>

In order to provide the participant with a functioning Bourdon Vos Test I had to create the [stimuli](#stimuli) and allow for mouse actions (i.e. [response action](#response).

[*top*](#top)

<H4 id="stimuli"> Stimulus Creation </H4>

In order to create anything graphical on a webpage that is not an image, one has to create a `canvas` element. In the Bourdon Vos Test it is specified that there are 24 figures per row, and 33 rows. Therefore, depending on the window size, the canvasses are smaller or larger. It is assumed that computer screens are wider than they are high, thus only the maximum width has to be determined in order to create square canvasses

<details><summary> Code: Determine Canvas Size </summary><p>

``` javascript

	function canvasSize() {
    // GOAL: determine size of screen and adjust size of the presented stimuli to be as
    // ... large as possible
    // ASSUMPTION: Computer & Laptop screens are wider than they are high. 
    // ... Thus in order to create maximum sized squares, only the width needs to be taken into account.
    
    // Determine current window size 
           var winWidth = (window.innerWidth - (2* outerBorder)); // available amount of pixels on the inside of the window
            
    // Determine max canvas width
        var canvasWidth = (winWidth / (stimuliColumns)); // -4 to allow for room for the borders between canvases & the side of the window
                    
     return canvasWidth;
	}  // END canvasSize FUNCTION


```

</p></details>

***

After the maximum height and width of the canvasses are determined, an empty canvas is created and attached to an existing `<div>` HTML element. This function is repeated in the `stimuliPresentation` function to create the appropriate amount of canvasses as specified by the Bourdon Vos Test (24 figures x 33 rows = 792).

<details><summary> Code: Create Empty Canvas </summary><p>

``` javascript
	
    function createCanvas (appendObject, canvasID, canvasHeight, canvasWidth, posLeft, posTop) { 
    // GOAL: create a new RESPONSIVE empty canvas
        // appendObject: ID of the object to which the canvas should be appended <div id = "stimuli">
        // canvasID: name you want to give to the created canvas
        // canvasHeight:  height of the canvas
        // canvasWidth: width of the canvas
        // posLeft: left side of the canvas should be placed on which X-coordinate (in pixels)
        // posTop: top side of the canvas should be placed on which Y-coordinate (in pixels)

    // CREATE CANVAS
        var addCanvas = document.createElement('canvas');       // Create new canvas element
    
    // ASSIGN PROPERTIES
        addCanvas.id = canvasID; // .id to change on what is specified (itterates in stimulusPresentation function)
        addCanvas.width = canvasWidth; // set canvasWidth (depending on screen size in canvasSize function)                                              
        addCanvas.height = canvasHeight; //  set canvasHeight (depending on screen size in canvasSize function) 
        addCanvas.style.position = "absolute";
        addCanvas.style.left = posLeft;
        addCanvas.style.top = posTop;
        
    // ASSIGN RESPONSE ACTIONS
       addCanvas.onclick = function () {responseLogging() } ; // call upon responseLogging to track correct crossout and log hits/miss/mistakes
        addCanvas.onmouseover = function () {canvasMouseOver()} ; // 
        addCanvas.onmouseout = function () {canvasMouseOut()} ; 

    // APPEND CANVAS TO EXISTING OBJECT
        document.getElementById(appendObject).appendChild(addCanvas); // append newly created canvas to existing element 
	} // END createCanvas FUNCTION

```
*NOTE* the variables are passed forward to this function in the main function `stimuliPresentation();`. Secondly, all response actions are stored in separate functions.

</p></details>

***

Once an empty canvas is created (or a screen full of empty canvasses) it is time to draw a dot figure on that canvas. To do so, first we have to determine how many 3, 4, and 5 dots figures there are, and randomize presentation order

<details><summary> Code: Randomize 3/4/5 Dot Figures </summary><p>

``` javascript

 	totalStimuli = stimuliColumns * stimuliRows;

    
    // CREATE DOT ARRAY
        // Create an array with 1/3 of totalStimuli containing "3", "4", or "5" > will represent amount of dots later on
        for (i = 3; i < 6; i++) {
            for (x = 1; x < ((totalStimuli / 3) + 1); x++) { // +1 because counter starts at 1
                dotArray.push(i)    // add the number (i) to the entire array
            } // END 1/3 of figure LOOP
        } // END create dot array LOOP
        shuffleArray(dotArray); // shuffle content of dotArray to allow for random presentation order
    
```

</p></details>

***

After knowing how many dots will be presented in each figure, it is key to determine where these dots can be drawn on the canvas. This is dependent on the canvas size. For this version of the O-BVT a 3x3 grid of dot placements was created. Future versions could increase this grid size to allow for more varied figures, similar to the figures in the BVT. 

<details><summary> Code: Create Position Grid </summary><p>

``` javascript

	function dotCoordinates (canvasID) {
    // GOAL: create a combination of X & Y coordinates that match size of the canvas
        // canvasID: id of canvas to be drawn on
        
        // SET VARIABLES
        var canvasWidth = (document.getElementById(canvasID).width - 6); // -6 to allow for 3px blank border where no circkel is drawn
        var canvasHeight = (document.getElementById(canvasID).height - 6); // -6 to allow for 3px blank border where no circkel is drawn
        var sizeCirckel = (canvasWidth / 11); // divide by 11 to allow blank spaces between the dots
        // console.log(sizeCirckel);
        arrayXpos = []; 
        arrayYpos = [];
        
        // possible X positions
             arrayXPos = [];                                                                // create empty array accesible outside function
                for (q = 1; q < (3 + 1); q++) {                 // repeat X coordinates for all coordinates of Y
                    for (k = 1; k < (3 + 1); k++) {         // positions for the amount of horizontalCirckles specified (+1 because k = 1)
                        var posX = ((3 * sizeCirckel) * k);                       // (should be changed depending on canvas & circkel size)
                        arrayXpos.push(posX);                                      // append new position to array containing all X coordinates
                    } // END horizontal LOOP
                } // END vertical LOOP
            // window.alert(arrayXPos);                                               // TEST
     
         // possible Y positions
            arrayYPos = [];                                                                // create empty array accesisble outside function
                for (w = 1; w < (3 + 1); w++) {           // repeat Y coordinates for all coordinates of X
                     for (l = 1; l < (3 + 1); l++) {                // positions for the amount of verticalCirckles specified (+1 because l = 1)
                        var posY = ((3 * sizeCirckel) * l);                         // change depending on circkelSize
                        arrayYpos.push(posY);                                       // append new position to array containing all Y position
                    } // END vertical LOOP
                } // END horizontal LOOP
            //  window.alert(arrayYPos);                                               // TEST
            
            // sort so when paired with X creates unique XY coordinates
                 arrayYpos.sort();
                 
      // shuffle XY positions
            indexArray = [];                                                                     // create new Array for random indexing out of XY coordinate arrays
                for (y = 1; y < 9; y++) {   // create integers for each point in the grid (1 - 9) 
                    indexArray.push(y);                                                             // append integer to indexArray
                } // END for LOOP
            shuffleArray(indexArray);                                                             // shuffle order of integers to allow for random indexing (i.e. dot placement)
    
    return sizeCirckel;
	} // END positionGrid FUNCTION

```

</p></details>

***

We now have an empty canvas upon which we can draw a figure, we know how many dots should go on that figure, and we know all possible positions of a single dot. All that is left now is to draw a dot, and repeat that action for the appropriate amount of times.

<details><summary> Code: Draw Figure </summary><p>

Draw Black Dot

``` javascript

	function blackDot (canvasID, posX, posY, sizeCirckel) {
    // GOAL: draw a single black circkle
            // canvasID: id of the canvas to be drawn on
            // posX: X position of center circkel relative to canvas
            // posY: Y position of center circkel relative to canvas
            // sizeCirckel: size of circkel dependent on size of canvas
        
        // CALL CANVAS
            var c = document.getElementById(canvasID);         // draw on prespecified canvas (see HTML)
            var ctx = c.getContext("2d");                                    // unkown functionality but necessary 
        
        // DRAW CIRCKEL
            ctx.beginPath();                                                        // initialize drawing
            ctx.fillstyle = "black";                                                 // specify fill color = black
            ctx.arc(posX,posY,sizeCirckel,0,2*Math.PI);            // specification of shape to draw (in this case a circkle)
            ctx.stroke();                                                               // draw specified shape
            ctx.closePath();                                                        // to allow for other figures to be drawn
            ctx.fill();                                                                     // execute
	} // END blackDot FUNCTION    

```

Repeat appropriate amount of times

``` javascript

	// DRAW FIGURES ON CANVAS
                var sizeCirckel = dotCoordinates (canvasID);
                    var dots = dotArray[(t-1)]; // -1 because index starts at 0
                    
                    for (k = 0 ; k < dots; k++) {
                        var index =  indexArray[k];       
                        var posX = arrayXpos[index]; 
                         var posY = arrayYpos[index];
                        blackDot (canvasID, posX, posY, sizeCirckel)
            } // END drawing figures LOOP

```

</p></details>

***

[*top*](#top)

<H4 id="response"> Response Actions </H4>

The O-BVT requires the following response actions:

1. 1 Click = cross-out figure & 2 Clicks = correction 
3. Record Hits/Misses/False Alarms
4. Reaction Times per Row

I have also added the response action to change the background color of the figure when it is hovered over with the mouse. This way participants are more clear on where the mouse is, and thus which figure they are responding to. 

All these functionalities were added to the figures (i.e. canvasses) as they were created. All functionalities are placed in the `.mouseout` function with a delay of 200 milliseconds. In other words: none of these responses are logged if you quickly scroll over the stimuli, they are only logged if you "hover" over a figure longer than 200 milliseconds: ` if ((finishHover - startHover) > 200)`. 

**NOTE**

Initially any response is coded, pushed to the relevant array, and stored in memory. The responses are not cleaned until the results section.

<details><summary> Code: Mouse Click Actions </summary><p> 

``` javascript

	function responseLogging () {
    // SET VARIABLES
        var currentID = event.currentTarget.id; // log id of event that triggered the function
        var canvasWidth = document.getElementById(currentID).width; // determine canvas width
        var canvasHeight = document.getElementById(currentID).height;  // determine canvas height   
        var index = (currentID.replace("Canvas", ""))-1; // replace "Canvas" by nothing so unique number remains, -1 because index starts from 0
              
    // DRAW RESPONSE 
        var clicks = clickArray[index];
        if (clicks == 0) {
            // canvas has not been clicked - draw line
                    var c=document.getElementById(currentID);              // refer to correct canvas
                    var ctx=c.getContext("2d");                                         // unkown but necessary
                    imageData = ctx.getImageData(0,0,canvasWidth, canvasHeight); // store canvas picture as is
                    ctx.beginPath();                                                           // start new drawing
                    ctx.moveTo(0,0);                                                          // determine starting position of line - constant
                    ctx.lineTo(canvasWidth,canvasHeight);                       // finish position of line - changes on canvas size specifiedin drawGrid function
                    ctx.lineWidth = 4;                                                         // size of the line to be drawn (should depend on circkle size)
                    ctx.strokeStyle = "#ff0000";                                          // color of line; red
                    ctx.stroke();                                                                  // initialize drawing 
                    clickArray[index] = 1;                                                    // increment clicks to 1
        } else if (clicks == 1) {
            // second response, draw correction line
                    var c=document.getElementById(currentID);               // refer to correct canvas
                    var ctx=c.getContext("2d");                                           // unkown but necessary
                    ctx.putImageData(imageData, 0,0);                               // reset previous picture (i.e. remove red line)
                    clickArray[index] = 2;
        } else {
            // do nothing, pictures should not be clicked more than twice
        } // END clicks IF
                
	} // END responseLogging FUNCTION

```


</p></details>

***

<details><summary> Code: Hit/Miss/False Alarm Coding </summary><p> 

``` javascript

 	// CODE RESPONSES (only cross out (click = 1) figures with 4 dots)
                        // responses: HIT (1), Miss (2), False Alarm (3) 
                        // corrections: NO (0), YES (1)
                    if (amountDots == 3 || amountDots == 5) {
                        // do not click (click == 0) or correct mistake (click == 2) == HIT
                        if (clickArray[index] == 0) {                           // No click = CORRECT  // NOTE: not coded because function only activated upon mouseclick
                            responseArray.push(1);                             // HIT
                            correctionArray.push(0);                            // NO
                        } else if (clickArray[index] == 1) {                // 1 click == WRONG (only click figures with 4 dots)
                            responseArray.push(3);                              // FALSE ALARM
                            correctionArray.push(0);                               // NO
                        } else {                                                        // 2 clicks == CORRECTION
                            responseArray.push(1);                          // HIT
                            correctionArray.push(1);                            // YES
                        } // END  click amount IF
                    } else { // amountDots == 4
                         if (clickArray[index] == 0) {                  // no click == WRONG // NOTE: not coded because function only activated upon mouseclick
                            responseArray.push(2);                          // MISS
                            correctionArray.push(0);                         // NO
                        } else if (clickArray[index] == 1) {        // 1 click == CORRECT
                            responseArray.push(1);                          // HIT
                            correctionArray.push(0);                        // NO
                        } else {                                                   // 2 clicks == unjust correction aka WRONG
                            responseArray.push(2);                      // MISS
                            correctionArray.push(1);                     // YES
                        } // END click amount IF
                    } // END amountDots  IF

```

</p></details>

***


<details><summary> Code: Reaction Time </summary><p> 

``` javascript
            // STORE RESPONSE TIMES
                    responseTimeArray.push(currentTime()); // store current Time in responseTimeArray

```

*NOTE* Reaction Times are initialy stored per canvas. In the results section the average row reaction time is calculated.

</p></details>

***

All responses are stored in `sessionStorage` memory to allow for calling in the results section of the O-BVT.

<details><summary> Code: Store Data </summary><p> 

``` javascript
 	// startTime stored on window load
        sessionStorage.setItem("finish", currentTime()); // store finish Time
        sessionStorage.setItem("stimuliRows", stimuliRows); // store amount of rows containing stimuli
        sessionStorage.setItem("stimuliCols", stimuliColumns); // store amount of columns containing stimuli
        
        sessionStorage.setObj("ARRAY_MADE_RESPONSES", responseArray);                     // responses made
        sessionStorage.setObj("ARRAY_MADE_CORRECTIONS", correctionArray);                    // corrections made
        sessionStorage.setObj("ARRAY_CANVAS_RESPONSE_ORDER", responseOrderArray);   // order in which responses were made
        sessionStorage.setObj("ARRAY_N_DOTS", dotArray);                                     // amount of dots in each figures
        sessionStorage.setObj("ARRAY_RESPONSE_TIMES", responseTimeArray);                       // response times per canvas
        

```

</p></details>

***

[*top*](#top)

<H3 id="results"> Results </H3>

Experiment Leaders cannot access the results section unless the correct [password](#password) was entered. If the Experiment Leader does so, he/she will be provided with the Participant's scores and "Attention Age". "Attention Age" is calculated based on the participant's scores compared to the relevant norm group data. An "Attention Age" for accuracy and speed are provided. In addition to being able to view the data, the Experiment Leader is provided with the option to print the results.

First, all responses are cleaned so that only the last time a person clicked a canvas is used to calculate absolute scores.

<details><summary> Code: Clean Responses </summary><p> 

``` javascript

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

```

</p></details>

***

Then, the total amount of hits, misses, and false alarms is coded & compared to the norm group data. 

<details><summary> Code: Accuracy Scores </summary><p> 

Total amount of Hits, Misses, and False Alarms:

``` javascript
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


```

Compare to norm group data:

``` javascript

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

```

</p></details>

***


After determining the accuracy of the participants, it is also important to code how fast they were. To do so, first we had to calculate average row response times:

<details><summary> Code: Average Row RT </summary><p> 

``` javascript
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

```

</p></details>

***

Then, these row reaction times (rowRT) had to be compared to the relevant norm group data.

<details><summary> Code: Norm Group Data </summary><p> 

``` javascript
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


```
*NOTE* from Bourdon Vos Manual (Vos, 1998)

</p></details>

***


<details><summary> Code: Speed Scores </summary><p> 

Identify relevant norm group

``` javascript

    // GOAL: select the appropriate normGroup variable for calculation of scores
    
    for (i = 6; i < 18; i++) {
        if (i == AGE) { // extract correct normgroup
            var referenceData = "normGroup"+ i;
        } // END IF
    } // END FOR ALL AGES
    
    var referenceData = NORM_GROUP_DATA[normGroup]; // access relevant normgroup data (all data stored below)


```

Compare rowRT to norm group data

``` javascript

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

```

</p></details>

***

Once all scores were calculated, output tables of all the scores were created:

<details><summary> Code: Output Tables </summary><p> 

Output Accuracy

``` javascript

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

```


Output SPEED

``` javascript
	function outputTableRows () {
    // GOAL: to create an output table for the row times
    
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

```

</p></details>

***

[*top*](#top)

<H4 id="internet"> Supporting Functions From Internet </H4>

A few functions were used that were not created by the author:

<details><summary> Code: Round to x Decimals </summary><p> 

``` javascript

	function round(value, decimals) {
  	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	}

```
<a href ="http://www.jacklmoore.com/notes/rounding-in-javascript/"> Source </a>

</p></details>

***

<details><summary> Code: Shuffle Array Content </summary><p> 

``` javascript

	function shuffleArray(array) {
    // GOAL: to shuffle the content of an array (e.g., to create random presentation of stimuli)
            for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
        return array;
	} // END shuffleArray FUNCTION

```

<a href ="https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array"> Source </a>

</p></details>

***

<details><summary> Code: Array Storage Temporary Memory </summary><p> 

Store Array

``` javascript

	Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
	}
	
```

Retrieve Array

``` javascript

	Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
	}

```

<a href ="https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage"> Source </a>

</p></details>

***

[*top*](#top)

<H2 id="implementation"> Implementation </H2>

This was the first time that I programmed in HTML/JavaScript/CSS. I spoke to my supervisor C. Stevenson who pointed me in the direction of these three components that make up a website. Because I had only limited knowledge of HTML, and none of JavaScript and CSS, I started of by completing almost all tutorials on [w3schools](https://www.w3schools.com). This allowed me to come to grasp with different functions, and thus decide on which components I needed in order to create my O-BVT task. Of course [stackoverflow](https://stackoverflow.com) also provided useful answers to the many issues I came across. As I was completely new to the programming languages, some functions were not created by the Author. An example of this is how to store the content of an Array into memory. All functions (N = 4) that were extracted from the internet are cited in the [Supporting Functions From Internet](#internet) section.  

[*top*](#top)

<H3 id="versioncontrol"> Version Control </H3>

Version control was established by creating a [GitHub](https://github.com) account. All source file documents were stored in the [BourdonVosTest](https://github.com/SHogenboom/BourdonVosTest) folder. Initially commits were only made locally, however, after a while I put the folder online in order to be able to access the O-BVT online as well. Commits were made whenever a certain part of the test was working. For example, a commit was made after creating a functioning password validation system. In general, if a commit was made before achieving a functioning piece of code, a comment was made as to what was still left to be solved.

[*top*](#top)

<H3 id="codingstyle"> Coding Style </H3>

As the main part of the O-BVT in programmed in JavaScript in will only discuss those coding style guidelines. The HTML and CSS files are of such short and basic content that they did not follow any pre-specified coding styles.

I started of by learning JavaScript on [w3schools](https://www.w3schools.com), and thus followed their [coding style guidelines](https://www.w3schools.com/js/js_conventions.asp) & example formats. However, I must note that I forgot about the "rule" that JavaScript code lines should not be longer than 80 characters. Therefore, the earlier code does not follow this format. Unfortunately, due to time constraints, I was unable to revert all source files to the appropriate style guidelines. Furthermore, it is important to note that the w3schools coding style guidelines do not mention that "variables" that remain constant should be assigned `CAPITALIZED` names, as is specified in the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html). The w3schools guideline merely states naming variables with `camelCase` format. Consequently, variables are named according to the `camelCase` format, unless they were stored in `sessionStorage` memory. The coding style guidelines also did not agree on whether variables should be initialized at the beginning of the document, or where they are used. The current source files initialize variables at the beginning of the document when they influence, for example, the amount of figures that should be created. Variables that are only relevant for that function / section of code (e.g., a counter) are initialized before use. 

I have also incorporated my own coding style preferences. Firstly, that all functions should be accompanied by an explanation of their function. I find that this increases understanding of the code at a later time. Secondly, I mark all ends of functions, loops, and if statements as soon as I create one. This is mainly to do with error provision, as it allows me to keep track of where one section begins, and another finishes.   


**According to me the most important JavaScript style guide aspects were: ** 

* Indent coding with 4 spaces
* camelCase name variables
* do not create `new` elements but rather create empty variables (e.g., `var someThing = [];` vs. `var someThing = new Array;`)
* store and create variables in local scope where possible (e.g., in functions)
* store data in `sessionStorage` rather than `localStorage` which remains permantly available
* end all code lines with a `;`
* space around operators

[*top*](#top)

<H3 id="testing"> Testing </H3>

Testing of the O-BVT was done in multiple ways. It should be noted that not all `TEST`s remain in code due to cluttering of the code. Only vital `TEST`s are kept in code but commented out, to prevent the console from clogging.  

1. **Visual Checks** are the easiest way of checking whether a webpage is doing what it should, is by checking the page in the web browser. For example, I checked whether a figure appeared on screen when I had programmed it to do so. Or whether the size of the stimuli would change when I increased/decreased the window size.

2. Display variables and arrays on screen by changing the **`.innerHTML`** of a text object:
``` javascript 
document.getElementById("maintext").innerHTML = ("ARRAY_MADE_RESPONSES = " + ARRAY_MADE_RESPONSES);
```
I did this before I was aware of the `console.log` function to be able to view the content of variables and arrays.

3. **Window Alerts** are an easy way to quickly show some information without it remaining present. I used this, for example, to show how many stimuli were created, or whether a variable was stored in memory or not. This function, again, was used before I became aware of the `console.log` function.
``` javascript
window.alert("Passoword = " + RESULT_ACCES_PASSWORD);
```

4. **`console.log`** allows you to display certain information in the webpage log. When I became aware of this function I used this throughout as I provides an easy to view log that can easily contain multiple aspects of information. Using the `console.log` function makes it easier to track the whole process at once, rather than assessing one variable at a time.
``` javascript
console.log("count delta RT = " + deltaResponseTimeArray[count]);
```

5. **Manual calculations** were done in order to check whether hits/miss/false alarm percentages & absolute scores were logged correctly.

[*top*](#top)

<H3 id="documentation"> Documentation </H3>

Three types of documentation were created. Firstly, the [User Manual](https://github.com/SHogenboom/BourdonVosTest/blob/master/README_USERS.pdf) for Experiment Leaders. This document describes to the Experiment Leader how they should install the O-BVT and what it is used for. Furthermore, it specifies the hardware requirements.   

Secondly, the current documentation was made in a markdown file, which is also available [online](https://github.com/SHogenboom/BourdonVosTest/blob/master/README.html). This document contains information on the process behind creating the O-BVT inline with the requirements for the course "Programming The Next Step", which was given at the University of Amsterdam, the Netherlands, in 2017.  

Thirdly, all source files contain in-code documentation. Specifically, each function that was created contains information on the `goal` of that function and explains the input variables. Numerical coding for conditions are also explained (e.g., hits == 1, miss == 2, falseAlarm == 3).

[*top*](#top)

<H3 id="errorprovision"> Error Provision </H3>

The main thing I did to prevent errors in the code is to mark beginnings and endings of loops/functions/if-statements as I created them:

``` javascript
function anyFunction (){
	// GOAL: example of error prevention method
    	// no input variables
    
    if (someCondition == 1) {
    	// do something
    } // END someCondition IF
    
} // END anyFunction FUNCTION
```
In doing so I ensured that I did not put certain statements in the wrong loop and to prevent forgetting to close a loop or function. 

Furthermore, essential variables / processes were logged in the console before continuing with building additional code. 

[*top*](#top)

<H2 id="verification"> Verification </H2>

Personal verifications were made along the way, and are similar to the steps I took when [testing](#testing) the software while coding. When the task was almost done I approached three alpha testers.

<H3 id="alphatester"> Alpha Testing </H3>

Alpha testing revealed the following things:

1. The instructions were clear: everyone was able to complete the task accordingly
2. The O-BVT does not run on Android systems
3. Absolute scores (hit/miss/false alarms) are confusing, they should be displayed in percentages. Maybe even a graph. 

[*top*](#top)

<H3 id="bugs"> Bug Reporting </H3>  

I implemented a bug report button leading to a [google form](https://goo.gl/forms/eOf5efi0RSLs2xjr1). All throughout the experiment a small button will be available for the Experiment Leader to click on and report a bug. 

**WARNING** The form can currently only be completed by University of Amsterdam accounts due to allowing for screenshot file uploads.

[*top*](#top)

<H2 id="development"> Planned Developments </H2>

**Vital Improvements**

Currently, I have been unable to resolve one essential mistake: the correction of responses that were made two or more canvasses ago. I did not notice this mistake untill too late, as it does not become evident when one conducts the experiment in a normal fashion.

**Envisioned Improvements**

Although the O-BVT meets the basic requirements, I have envisioned a few adjustments / functionalities that should be implemented in the future. 

1. The respondents data should be stored in an online database so that the norm group data can grow with each participant. 

2. The test could be adjusted to meet the Bourdon Wiersma criteria (the adult version). This way, depending on the age entered in the demographics stage, either the Bourdon Vos (children) or Bourdon Wiersma (adults) is presented. 

3. The online version should be validated and compared to the paper test.  

4. The way the timing is recorded currently does not allow for use on a tablet. I would change the way the row times are logged, so that participants can also complete the O-BVT on tablets. 

5. The design could do with a brush up. It is currently all very minimal.

6. I think the instructions are quite complicated for a 6 year old. It would be good to have instructions tailored to each age / reading ability.

[*top*](#top)


<H2 id="usermanual"> User Manual </H2>

![User Manual1](https://github.com/SHogenboom/BourdonVosTest/blob/master/UserManual.jpg)

![User Manual2](https://github.com/SHogenboom/BourdonVosTest/blob/master/UserManual2.jpg)

![User Manual3](https://github.com/SHogenboom/BourdonVosTest/blob/master/UserManual3.jpg)

![User Manual4](https://github.com/SHogenboom/BourdonVosTest/blob/master/UserManual4.jpg)

[*top*](#top)

<H2 id="references"> References </H2>

* <p id="bourdonvostest"> Bourdon Vos Test information </p>

	+ Distributor of the official manual & test materials: [Pearson Benelux](http://www.pearsonclinical.nl/bourdon-vos-test)
    + [Article](http://bit.ly/2qZkPPc): Role of the Experimenter in administring the Bourdon Vos Test by Keldenbach (2015)
    
* [Norm Group Data](https://github.com/SHogenboom/BourdonVosTest/blob/master/Normtable_BV.png) 

![Screenshot Norm Group Data](https://github.com/SHogenboom/BourdonVosTest/blob/master/Normtable_BV.png)

[*top*](#top)











