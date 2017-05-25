<H1 id="top"> Online Bourdon Vos Test </H1>

The Online Bourdon Vos Test (O-BVT) has transformed the Bourdon Vos Test (BVT; 1998) from a paper-and-pencil version to a web based test. The O-BVT & BVT measure continued attention in children aged 6 - 17. This is done by providing the participants with a sheet (BVT) or screen (O-BVT) containing 33 rows with 24 figures each (i.e. 792 figures). Each figure contains of either 3, 4, or 5 black dots. This is why the adult version (Bourdon Wiersma Test) is also called the "Dot Cancellation Test".  

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

![Screenshot Bourdon Vos Test](/Users/Sally/Documents/Universiteit/Master/9-
Programming_NextStep/BourdonWiersma.png)   

*Screenshot of Bourdon Vos Test*      


![Screenshot Online Bourdon Vos Test](/Users/Sally/Documents/Universiteit/Master/9-
Programming_NextStep/O-BVT.png)  

*Screenshot of Online Bourdon Vos Test*    
All figures with 4 dots are to be clicked (i.e. crossed out). When the participant has moved the mouse over a figure, this figure will turn grey. 

[*top*](#top)

<H3 id="taskflow"> Task Flow </H3>

| Page |`HTML` | `Javascript` | `CSS` | Function|
|:----:|:-----:|:------------:|:-----:|:-------:|
|1|[index.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.html)|[index.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Demograhpics|
|2|[bv\_practice.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_practice.html)|[bv\_practice.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_practice.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)| Practice the task|
|3|[bv_test_fixed.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_test_fixed.html)|[bv_test_fixed.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_test_fixed.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)| Bourdon Vos Test|
|4|[bv\_results.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results.html)|[bv\_results\_fixed.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results_fixed.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Results|  

*Table of HTML pages presented in the O-BVT in the order they are displayed to the user. Supporting Javascript & CSS files per page. All links refer to the source file location on 
.*  


<H4 id="taskflowuser"> Task Flow User </H4>

**Experiment Leader** follows instructions from the [User Manual](https://github.com/SHogenboom/BourdonVosTest/blob/master/UserManual.docx) to start the O-BVT. The O-BVT starts with the index page to display **Experiment Leader** instructions & allows for entering the *demographics* of the participant. The **Experiment Leader** then calls the **Participant** to the computer who will start the *practice* phase. After completing the practice phase, indicating that the **Participant** understands how to operate the computer and what is expected in the task, the **Participant** will continue on to the main phase: the *Bourdon Vos Test*. When the **Participant** has finished the task, he/she will call the **Experiment Leader** again. The **Experiment Leader** then has to enter the pre-specified password in order to access the participant's *results*.

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

This section provides examples of the code that was used to create the Bourdon Vos Test from a more global perspective. All code files are accessible  on [GitHub](https://github.com/SHogenboom/BourdonVosTest) and contain in-code comments for specifics.

<H4 id="content"> Content </H4>  

* [Demographics](#demographics)
* [Password](#password)
* [Practice Trial](#practice)
* [Bourdon Vos Test](#bvt)
	+ [Stimuli](#stimuli)
* [Results](#results)  


<H6 id="demographics"> Demographics </H6>

**Goal** is to extract `firstName`, `lastName`, `gender`, `age`. Especially the participant's `age` is relevant to be able to compare the participant's results to norm group data.

``` javascript
	const FIRSTNAME = 
        window.prompt("First name: "); // ... enter pp. first name
    const LASTNAME = 
        window.prompt("Last name: "); // ... enters pp. last name
    const GENDER = 
        window.prompt("The participant is ... [Male/Female/Other]"); 
        // ... enter pp gender [suggestions] 
    const AGE =
        window.prompt("The participant is ... years old: ");
        // ... enter pp age > validated!

```

The participant's `age` is **validated** to be between 6 and 17 years old. This is important because the Bourdon Vos Test is only suited for this age range, and thus no norm group data are available for other age groups.  

<H6 id="password"> Password Protection </H6>
**Goal** is to allow only the Experiment Leader to access the results. Therefore, the Experiment leader has to specify the password after entering the demographics:

``` javascript
	const RESULT_ACCES_PASSWORD =
        window.prompt(("Please enter a password that will allow only you" +
        " to access the participant's results after completion"), "password");

```
This password is stored in `sessionStorage`. When the participant has completed the Bourdon Vos Test, the Experiment Leader is prompted to enter their personal password. The entered password is **validated** against the earlier given password. 

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

**WARNING**   
If the Experiment Leader has forgotten the password, he/she will not be able to access the results.


<H2 id="implementation"> Implementation </H2>

This was the first time that I programmed in HTML/Javascript/CSS, therefore, the implementation started of by trying to get something on the screen. C. Stevenson helped me by explaining which files / aspects make up a webpage, and I went from there. I completed almost all tutorials on [w3schools](https://www.w3schools.com) in order to be able to create the current task. Of course [stackoverflow](https://stackoverflow.com) also provided useful answers to the many issues I came across. Some functions that were used were not created by the student (i.e. me), but those are clearly marked in the `Internet Functions` sections in the code files. An example of such a function is the [`arrayShuffle()`](https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array) function from a forum question on stackoverflow:

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

Three types of documentation were created. Firstly, the [User Manual](https://github.com/SHogenboom/BourdonVosTest/blob/master/UserManual.docx) for Experiment Leaders. This document describes to the Experiment Leader how they should install the O-BVT and what it is used for. Furthermore, it specifies the hardware requirements.   

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
In doing so I ensured that I did not put certain statements in the wrong loop and to prevent for forgetting to close a loop or function. 


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








