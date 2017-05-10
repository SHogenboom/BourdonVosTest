// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Task.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

 // presenting multiple pictures through appending to existing element <div id = 'stimuli'>;
     function stimuliPresentation (stimID, stimObject) {
     	// stimID = id tag of the image that needs to be presented;
     	// stimObject = id tag of <div> to which the additional pictures should be appended;
     	
     	// Determine size of window, using || allows for this function to work in Explorer and other browsers;
          var winWidth = window.innerWidth												
                    || document.documentElement.clientWidth  || document.body.clientWidth;
          var winHeight = window.innerHeight 												
                    || document.documentElement.clientHeight || document.body.clientHeight;
                    
         // Determine size of stimulus (i.e. the picture / grid of dots that is to be presented
          var stimWidth = document.getElementById(stimID).width;
          var stimHeight = document.getElementById(stimID).height;
          
          // Calculate  max number of pictures to fit the window
          var totalPictures = (Math.floor(winWidth / stimWidth)) * (Math.floor(winHeight / stimHeight)); //Math.floor rounds the outcome down to an integer
          
          // Present more than 1 stimulus by adding the totalPictures number to an existing HTML object
         for (i = 1; i < totalPictures; ){
              // create new image object with appropriate values
              var stimAdd = new Image();
              stimAdd.src = document.getElementById(stimID).src;
              stimAdd.alt = document.getElementById(stimID).alt;
              stimAdd.width = document.getElementById(stimID).width;
              stimAdd.height = document.getElementById(stimID).height;
              
              // append object to existing stimObject
              document.getElementById(stimObject).appendChild(stimAdd);
              
            i = i + 1;
          }  // end picture creation loop
      } // end stimuli creation function

// initate function, input 'name of stimulus <img> id' & name of HTML object <div> id
stimuliPresentation('stim', 'stimuli');

 
    
    
    