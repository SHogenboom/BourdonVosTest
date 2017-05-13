// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Task.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

function randomPresentation (stimID, stimObject, targetHeight, targetWidth) {
     // Goal: to randomly present  figures with 3,4, or 5 dots across the entire available window
            // stimID = id tag of the empty image object that needs to be presented / changed;
            // stimObject = id tag of <div> to which the additional pictures should be appended;
            // targetHeight = height of the stimulus picture;
            // targetWidth = width of the stimulus picture;
     
    // DETERMINE MAX AMOUNT OF PICTURES TO PRESENT
            // Determine size of window, using || allows for this function to work in Explorer and other browsers;
                    var winWidth = window.innerWidth												
                         || document.documentElement.clientWidth  || document.body.clientWidth;
                    var winHeight = window.innerHeight 												
                         || document.documentElement.clientHeight || document.body.clientHeight;
                    
            // Determine size of stimulus (i.e. the picture / grid of dots that is to be presented
                 var stimWidth = document.getElementById(stimID).width;
                 var stimHeight = document.getElementById(stimID).height;
          
            // Calculate  max number of pictures to fit the window
                 var totalPictures = ((Math.floor(winWidth / stimWidth)) * (Math.floor(winHeight / stimHeight))) + 1; //Math.floor rounds the outcome down to an integer. +1 because first img object gets hidden so need to display an extra

    // APPEND RANDOM PICTURES
            for (i = 1; i < totalPictures;) {
                   // SELECT RANDOM FIGURE    
                        function getRandomInt(min, max) {
                            // GOAL: get a random integer in a range from min to max, in this case 3 - 5 dots.
                            return Math.floor(Math.random() * (max - min + 1) + min);
                         } // end RandomInt fucntion

                        var dots = getRandomInt(3,5); // set amount of dots
                        // document.getElementById('testing').innerHTML = dots; // TEST
    
                   if (dots == 3) {
                            // GOAL: set corresponding source
                            var source = '/Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Stimuli/Dots3.png'; 
                    } else if (dots == 4) {
                            var source = '/Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Stimuli/Dots4.png';
                    } else {
                            var source = '/Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Stimuli/Dots5.png'; 
                    } // end if presenting 3/4/5 dot picture source

                // APPEND PICTURE
                    // appending picture to stimObject
                     var stimAdd = new Image ();
                     stimAdd.src = source;
                     stimAdd.width = targetWidth;
                     stimAdd.height = targetHeight;
                     stimAdd.alt = "Dots" + dots;
                
                     document.getElementById(stimObject).appendChild(stimAdd);
                
             i = i + 1;      
            } // END LOOP  "Append Random Picture" 
     
} // end of randomPresentation function

// initialize function
randomPresentation ('stim', 'stimuli', 50, 50);
 
    
    