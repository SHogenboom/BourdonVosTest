// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/BVFinalScreen.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

// NOTE: Screen loads upon clicking "I am finished" on "BVTest_Duplicate.html"

// AVAILABLE DATA
    var startTime = sessionStorage.getItem("start");                                                // startTime BV Test
    var finishTime = sessionStorage.getItem("finish");                                             // finishTime entire page
    var responseArray = sessionStorage.setItem("responseArray");                       // responses made
    var correctionArray = sessionStorage.setItem("correctionArray");                     // corrections made
    var clickArray = sessionStorage.setItem("clickArray");                                      // mouseclicks made
    var responseOrderArray = sessionStorage.setItem("responseOrderArray");    // order in which responses were made
    var dotsArray = sessionStorage.setItem("dotsArray");                                      // amount of dots in each figure
        
window.onload = document.getElementById("output").innerHTML = ("dotsArray = " + "<br>" +  dotsArray + "<br>" + 
                                                                                "clickArray = " + "<br>" +  clickArray + "<br>" + 
                                                                                "responseArray = " + "<br>" +  responseArray + "<br>" + 
                                                                                "responseOrderArray = " + "<br>" +  responseOrderArray + "<br>");
