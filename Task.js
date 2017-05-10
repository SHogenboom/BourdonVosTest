// Bourdon Vos Test - Stimuli Presentation (i.e. Task)
// Written in conjuction with /Users/Sally/Documents/Universiteit/Master/9-Programming_NextStep/BourdonVosTest/Task.html
// Author: Sally A.M. Hogenboom
// Version Control via Git

// Set variables
	var i = 1;


// Determine window size
    var winWidth = window.innerWidth												
    // using both allows for this measure to work both in Explorer and other Browers
        || document.documentElement.clientWidth 			
        || document.body.clientWidth;

    var winHeight = window.innerHeight 												
     // using both allows for this measure to work both in Explorer and other Browers
        || document.documentElement.clientHeight
       || document.body.clientHeight;

// TEST: present window size (in pixels) on webpage				
    // replace text of 'windowWidth / windowHeight' with variable value, allows for test of variable change
    document.getElementById('windowWidth').innerHTML = winWidth;		
    document.getElementById('windowHeight').innerHTML = winHeight;		
    	
// Determine size of stimulus (e.g., single picture presented)
    var stimWidth = document.getElementById('stim').width;
    var stimHeight = document.getElementById('stim').width;
   
 // TEST: present stimulus size (in pixels) on webpage
 	// replace text of 'stimulusWidth/stimulusHeight' with variable values
 	document.getElementById('stimulusWidth').innerHTML = stimWidth;		
    document.getElementById('stimulusHeight').innerHTML = stimHeight;	
    
 // Determine maximum of pictures that can be presented 
    var horizontalPictures = winWidth / stimWidth;  //Math.floor > round down to nearest integer
    var verticalPictures = winHeight / stimHeight;
 
// TEST: present total number of stimuli that can be presented
//    var totalPictures = (Math.floor(winWidth / stimWidth)) * (Math.floor(winHeight / stimHeight));
//    document.getElementById('test').innerHTML = totalPictures;
 
 // presenting multiple pictures through appending to existing element <div id = 'stimuli'>
     function stimuliPresentation (stimID, stimObject) {
     	// stimID = id tag of the image that needs to be presented, stimObject = id tage of <div> to be appended to
          var winWidth = window.innerWidth												
              // using both allows for this function to work both in Explorer and other Browers
                    || document.documentElement.clientWidth 			
                    || document.body.clientWidth;

          var winHeight = window.innerHeight 												
              // using both allows for this function to work both in Explorer and other Browers
                    || document.documentElement.clientHeight
                    || document.body.clientHeight;
                    
         // Determine size of stimulus (e.g., single picture presented)  // stimID input
          var stimWidth = document.getElementById(stimID).width;
          var stimHeight = document.getElementById(stimID).height;
          
          // Calculate number of pictures to fit the window
          var totalPictures = (Math.floor(winWidth / stimWidth)) * (Math.floor(winHeight / stimHeight));
          
          // TEST: present output from totalPictures in 'test' object
          document.getElementById('test').innerHTML = totalPictures;
          
          // Append number of totalPictures to exisitng stimObject
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
          } 
      }

// initate function
stimuliPresentation('stim', 'stimuli');

 
    
    
    