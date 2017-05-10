
// Determine window size, for change in amount of stimuli presented
var w = window.innerWidth												// using both allows for this measure to work both in Explorer and other Browers
		|| document.documentElement.clientWidth 			
		|| document.body.clientWidth;

var h = window.innerHeight												// using both allows for this measure to work both in Explorer and other Browers
		|| document.documentElement.clientHeight
		|| document.body.clientHeight;

// TEST: present window size (in pixels) on webpage				
document.getElementById('windowWidth').innerHTML = w;		// replace text of 'windowWidth' with variable value, allows for test of variable change
document.getElementById('windowHeight').innerHTML = h;		// replace text of 'windowHeight' with variable value, allows for test of variable change
	