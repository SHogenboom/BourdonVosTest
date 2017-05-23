# Online Bourdon Vos Test

The Online Bourdon Vos Test (O-BVT) has transformed the Bourdon Vos Test (BVT; 1998) from a paper-and-pencil version to a web based test. It allows for automatic calculations of participants scores and, thereby, saves the experiment leader ample amounts of time.

## Task Flow

`Experiment Leader` follows instructions from the [User Manual](https://github.com/SHogenboom/BourdonVosTest/blob/master/UserManual.docx) to start the task. The O-BVT starts with the index page to display `Experiment Leader` instructions & allows for entering the demographics of the participant. The `Experiment Leader` then calls the `participant` to the computer who will start the practice phase. After completing the practice phase, indicating that the `participant` understand how to operate the computer and complete the task, the `participant` will continue on to the  main phase: the Bourdon Vos Test. When the `participant` has finished the task, he/she will call the `Experiment Leader` again. The `Experiment Leader` then has to enter the pre-specified password to be able to access the participant's results.


| Page |`HTML` | `Javascript` | `CSS` | Function|
|:----:|:-----:|:------------:|:-----:|:-------:|
|1|[index.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.html)|[index.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/index.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Demograhpics|
|2|[bv\_practice.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_practice.html)|[bv\_practice.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_practice.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)| Practice the task|
|3|[bv_test_fixed.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_test_fixed.html)|[bv_test_fixed.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_test_fixed.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)| Bourdon Vos Test|
|4|[bv\_results.html](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results.html)|[bv\_results.js](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_results.js)|[bv\_css.css](https://github.com/SHogenboom/BourdonVosTest/blob/master/bv_css.css)|Results

## Functions
* [Demographics](#demographics)
	+ [first name](#firstname)
    + [last name](#lastname)
    + [gender](#gender)
    + [age](#age)
* [Password Protect Results](#passwordprotection)
* [Stimuli](#stimuli)
	1. [Create empty canvas](#createcanvas)
    2. [Draw one black dot](#blackdot)
    3. [Draw random amount of dots](#multipledots)
    4. 
    





<h3 id="demographics"> Demographics </h5>
