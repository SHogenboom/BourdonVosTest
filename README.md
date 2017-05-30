<H1 id="top"> Online Bourdon Vos Test </H1>

The Online Bourdon Vos Test (O-BVT) has transformed the Bourdon Vos Test (BVT; 1998) from a paper-and-pencil version to a web based test. The O-BVT & BVT measure continued attention in children aged 6 - 17. This is done by providing the participants with a sheet (BVT) or screen (O-BVT) containing 33 rows with 24 figures each (i.e. 792 figures). Each figure contains of either 3, 4, or 5 black dots. This is why the adult version (the Bourdon Wiersma Test) is also called the "Dot Cancellation Test".  

**IF YOU WISH TO USE THE ONLINE BOURDON VOS TEST - PLEASE SEE THE [USER MANUAL](https://github.com/SHogenboom/BourdonVosTest/blob/master/README_USERS.pdf) FOR INSTRUCTIONS !**

This document contains information on the process behind creating the O-BVT inline with the requirements for the course "Programming The Next Step", which was given at the University of Amsterdam, the Netherlands, in 2017. For other software developers I recommend looking at the [Design](#design) section as it contains examples of the code. Of course, all source files are accessible on GitHub: [Bourdon Vos Test](https://github.com/SHogenboom/BourdonVosTest). All files contain in-line comments.

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
	+ 
* [References](#references)
	+ [Bourdon Vos Test](#bourdonvostest)
    + [Norm Groups](#normgroup)
    

[*top*](#top)


<H2 id="requirements"> Requirements </H2>

<H3 id="scenario"> Scenario </H3>

The BVT is administered by an `Experiment Leader` to a child aged 6 - 17 with (un)diagnosed attention deficits. Therefore, the O-BVT serves two audiences: the `Experiment Leader` and the `Participant`. The `Participant` is merely pre-occupied with crossing out any figure that contains 4 dots (leaving 3 and 5 dot figures untouched). To do so, the `Participant` needs to comprehend how to perform the task while on the computer. The `Experiment Leader` aims to determine if the `Participant`'s continued attention levels matches that of his/her peers. Therefore, the `Experiment Leader` normally (in the BVT) has to instruct the `Participant`, record reaction times, and compute total scores. In the O-BVT, this will all be done by the software, thereby significantly decreasing the time and effort it costs an `Experiment Leader` to administer the Bourdon Vos paradigm. 

[*top*](#top)

<H3 id="screenshots"> Screenshots </H3>

![Screenshot Bourdon Vos Test](https://github.com/SHogenboom/BourdonVosTest/blob/master/BourdonWiersma.png)   

*Screenshot of Bourdon Vos Test*      


![Screenshot Online Bourdon Vos Test](https://github.com/SHogenboom/BourdonVosTest/blob/master/O-BVT.png)  

*Screenshot of Online Bourdon Vos Test*    
All figures with 4 dots are to be clicked (i.e. crossed out). When the participant has moved the mouse over a figure, this figure will turn grey. 

[*top*](#top)

<H3 id="taskflow"> Task Flow </H3>

| Page |`HTML` | `Javascript` | `CSS` | Function|
|:----:|:-----:|:------------:|:-----:|:-------:|
|1|[index.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.html)|[index.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Demograhpics|
|2|[bv\_practice.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_practice.html)|[bv\_practice.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_practice.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)| Explain task|
|3|[bv_test_fixed.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_test_fixed.html)|[bv_test_fixed.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_test_fixed.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)| Practice Line + Bourdon Vos Test|
|4|[bv\_results.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results.html)|[bv\_results\_fixed.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results_fixed.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Results|  

*Table of HTML pages presented in the O-BVT in the order they are displayed to the user. Supporting Javascript & CSS files per page. All links refer to the source file location on 
.*  


<H4 id="taskflowuser"> Task Flow User </H4>

**Experiment Leader** follows instructions from the [User Manual](https://github.com/SHogenboom/BourdonVosTest/blob/master/README_USERS.pdf) to start the O-BVT. The O-BVT starts with the index page to display **Experiment Leader** instructions & allows for entering the *demographics* of the participant. The **Experiment Leader** then calls the **Participant** to the computer who will start the *practice* phase. After completing the practice phase, indicating that the **Participant** understands how to operate the computer and what is expected in the task, the **Participant** will continue on to the main phase: the *Bourdon Vos Test*. When the **Participant** has finished the task, he/she will call the **Experiment Leader** again. The **Experiment Leader** then has to enter the pre-specified password in order to access the participant's *results*.

<H4 id="taskflowsoftware"> Task Flow Software </H4>

*NOTE: all links refer to the javascript code documented in the [O-BVT Design](#design) section.*

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
	+ **Track** responses
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

This section provides context on the code that was used to create the Bourdon Vos Test from a more global perspective. All code files are accessible  on [GitHub](https://github.com/SHogenboom/BourdonVosTest) and contain in-code comments for specifics. Specific code snippets can be viewed by clicking the "> Code" buttons 

<H3 id="content"> Content </H3>  

* [Demographics](#demographics)
* [Password Protect Results](#password)
* [Practice Trial](#practice)
* [Bourdon Vos Test](#bvt)
	+ [Stimuli](#stimuli)
    + [Response Actions](#response)
* [Results](#results)  


<H3 id="demographics"> Demographics </H3>

The experiment leader is asked to provide the participant's `FIRSTNAME`, `LASTNAME`, `GENDER`, and `AGE`. `FIRSTNAME`, `LASTNAME`, `GENDER` input is **not validated** because these are not used for any other reason than to adress the participant at a later phase. `AGE` is **validated** against two criteria: 1) The input is a number, and 2) the participant is between 6 and 17 years old. This validation is important because norm group data is not available for other age groups. 

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


<H3 id="password"> Password Protect Results </H3>

Both the Experiment Leader and the Participant use the same computer, therefore, the *results* are protected from being viewed by the participant through a password. When the Eperiment Leader sets up the experiment by entering the participant demographics, he/she is also asked to specify a password. The default value is set to "password".  

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

<H3 id="bvt"> Bourdon Vos Test </H3>

In order to provide the participant with a functioning Bourdon Vos Test I had to create the [stimuli](#stimuli) and allow for mouse actions (i.e. [response action](#response).

<H4 id="stimuli"> Stimulus Creation </H4>

In order to create anything graphical on a webpage that is not an image, one has to create a `canvas` element. In the Bourdon Vos Test it is specified that their are 24 figures per row, and 33 rows. Therefore, depending on the window size, the canvasses are smaller or larger. It is assumed that computer screens are wider than they are high, thus only the maximum width has to be determined in order to create square canvasses

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
*NOTE* the variables are passed forward to this function in the main function `stimuliPresentation();`. Secondly, all response actions are stored in seperate functions.

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

<H4 id="response"> Response Actions </H4>

The O-BVT requires the following response actions:

1. 1 Click = cross-out figure & 2 Clicks = correction 
3. Record Hits/Misses/False Alarms
4. Reaction Times per Row

I have also added the response action to change the background color of the figure when it is hovered over with the mouse. This way participants are more clear on where the mouse is, and thus which figure they are responding to. 

All these functionalities were added to the figures (i.e. canvasses) as they were created. All functionalities are placed in the `.mouseout` function with a delay of 200 miliseconds. In other words: none of these responses are logged if you quickly scroll over the stimuli, they are only logged if you "hover" over a figure longer than 200 miliseconds: ` if ((finishHover - startHover) > 200)`. 

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


In the results section, all data are cleaned (i.e. only the last responses is used for score calculations).





<details><summary> Code:  </summary><p> 

``` javascript


```

</p></details>
***




<H2 id="implementation"> Implementation </H2>

This was the first time that I programmed in HTML/Javascript/CSS, therefore, the implementation started of by trying to get something on the screen. C. Stevenson helped me by explaining which files / aspects make up a webpage, and I went from there. I completed almost all tutorials on [w3schools](https://www.w3schools.com) in order to be able to create the current task. Of course [stackoverflow](https://stackoverflow.com) also provided useful answers to the many issues I came across. Some functions that were used were not created by the student (i.e. me), but those are clearly marked in the `Internet Functions` sections in the code files. An example of such a function is the [`arrayShuffle()`](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) function from a forum question on stackoverflow:

<details><summary> Code: shuffleArray Function </summary><p>

``` javascript
function shuffleArray(array) {
    // GOAL: to shuffle the content of an array (e.g., to create random order of stimuli)
            for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            }
        return array;
} // END shuffleArray FUNCTION

```

</p></details>
***

<H3 id="versioncontrol"> Version Control </H3>

Version control was established by creating a [GitHub](https://github.com) account. All source file documents were stored in the [BourdonVosTest](https://github.com/SHogenboom/BourdonVosTest) folder. Initially commits were only made locally, however, after a while I put the folder online in order to be able to access the O-BVT online as well. Commits were made whenever a certain part of the test was working. For example, a commit was made after creating a functioning password validation system. In general, if a commit was made before achieving a functioning piece of code, a comment was made as to what was still left to be solved.

<H3 id="codingstyle"> Coding Style </H3>

As the main part of the O-BVT in programmed in Javascript in will only discuss those coding style guidelines. The HTML and CSS files are of such short and basic content that they did not follow any pre-specified coding styles.

I started of by learning Javascript on [w3schools](https://www.w3schools.com), and thus followed their [coding style guidelines](https://www.w3schools.com/js/js_conventions.asp) & example formats. However, I must note that I forgot about the "rule" that javascript code lines should not be longer than 80 characters. Therefore, the earlier code does not follow this format. Unfortunately, due to time constraints, I was unable to revert all source files to the appropriate style guidelines. Furthermore, it is important to note that the w3schools coding style guidelines do not mention that "variables" that remain constant should be assigned `CAPITALIZED` names, as is specified in the [Google Javascript Style Guide](https://google.github.io/styleguide/jsguide.html). The w3schools guideline merely states naming variables with `camelCase` format. Consequently, variables are named according to the `camelCase` format, unless they were stored in `sessionStorage` memory. The coding style guidelines also did not agree on whether variables should be initialized at the beginning of the document, or where they are used. The current source files initialize variables at the beginning of the document when they influence, for example, the amount of figures that should be created. Variables that are only relevant for that function / section of code (e.g., a counter) are initialized before use. 

I have also incorporated my own coding style preferences. Firstly, that all functions should be accompanied by an explanation of their function. I find that this increases understanding of the code at a later time. Secondly, I mark all ends of functions, loops, and if statements as soon as I create one. This is mainly to do with error provision, as it allows me to keep track of where one section begins, and another finishes.   


**According to me the most important Javascript style guide aspects were: ** 

* Indent coding with 4 spaces
* camelCase name variables
* do not create `new` elements but rather create empty variables (e.g., `var someThing = [];` vs. `var someThing = new Array;`)
* store and create variables in local scope where possible (e.g., in functions)
* store data in `sessionStorage` rather than `localStorage` which remains permantly available
* end all code lines with a `;`
* space around operators

<H3 id="testing"> Testing </H3>

Testing of the O-BVT was done in multiple ways. It should be noted that not all `TEST`s remain in code due to cluttering of the code.   

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


<H3 id="documentation"> Documentation </H3>

Three types of documentation were created. Firstly, the [User Manual](https://github.com/SHogenboom/BourdonVosTest/blob/master/README_USERS.pdf) for Experiment Leaders. This document describes to the Experiment Leader how they should install the O-BVT and what it is used for. Furthermore, it specifies the hardware requirements.   

Secondly, the current documentation was made in a markdown file, which is also available [online](https://github.com/SHogenboom/BourdonVosTest/blob/master/README.html). This document contains information on the process behind creating the O-BVT inline with the requirements for the course "Programming The Next Step", which was given at the University of Amsterdam, the Netherlands, in 2017.  

Thirdly, all source files contain in-code documentation. Specifically, each function that was created contains information on the `goal` of that function and explains the input variables. Numerical codings for conditions are also explained (e.g., hits == 1, miss == 2, falseAlarm == 3).

<H3 id="errorprovision"> Error Provision </H3>

The main thing I did to prevent errors in the code is to mark beginnings and endings of loops/functions/if-statments as I created them:

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


<H2 id="verification"> Verification </H2>

Personal verifications were made along the way, and are similar to the steps I took when [testing](#testing) the software while coding. When the task was almost done I approached three alpha testers.

<H3 id="alphatester"> Alpha Testing </H3>

Alpha testing revealed the following things:

1. The instructions were clear: everyone was able to complete the task accordingly
2. The O-BVT does not run on Android sytems
3. Absolute scores (hit/miss/false alarms) are confusing, they should be displayed in percentages. Maybe even a graph. 


<H3 id="bugs"> Bug Reporting </H3>  

I implemented a bug report button leading to a [google form](https://goo.gl/forms/eOf5efi0RSLs2xjr1). All throughout the experiment a small button will be available for the Experiment Leader to click on and report a bug. 

**WARNING** The form can currenlty only be completed by University of Amsterdam accounts due to allowing for screenshot file uploads.

<H2 id="development"> Planned Developments </H2>

Although the O-BVT meets the basic requirements, I have envisioned a few adjustments / functionalities that should be implemented in the future. 

1. The respondents data should be stored in an online datbase so that the normgroup data can grow with each participant. 

2. The test could be adjusted to meet the Bourdon Wiersma criteria (the adult version). This way, depending on the age entered in the demographics stage, either the Bourdon Vos (children) or Bourdon Wiersma (adults) is presented. 

3. The online version should be validated and compared to the paper test.  

4. The way the timing is recorded currently does not allow for use on a tablet. I would change the way the row times are logged, so that participants can also complete the O-BVT on tablets. 

5. The design could do with a brush up. It is currently all very minimal.

<H2 id="references"> References </H2>

* <p id="bourdonvostest"> Bourdon Vos Test information </p>

	+ Distributor of the official manual & test materials: [Pearson Benelux](http://www.pearsonclinical.nl/bourdon-vos-test)
    + [Article](http://bit.ly/2qZkPPc): Role of the Experimenter in administring the Bourdon Vos Test by Keldenbach (2015)
    
* <p id="normgroup"> norm group file link </p>








