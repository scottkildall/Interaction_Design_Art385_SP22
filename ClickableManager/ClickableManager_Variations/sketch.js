
/***********************************************************************************
  ClickableAllocator
  by Scott Kildall
  
  Start your localhost before running this, otherwise no PNGs will display

  Shows an example of how to use allocation tables with the
  modified p5.clickable class. This uses a ClickableManager class to
  (1) allocate and set variables from a .csv file
  (2) draw all the clickables that are visible in a single function


***********************************************************************************/

// the manager class
var clickablesManager;

// an array of clickable objects
var clickables;

// indexes into the array (constants)
const cat1Index = 0;
const cat2Index = 1;
const cat3Index = 2;
const cat4Index = 3;


var xPos = 250;

// ALWAYS allocate the ClickableManager in the preload() function
// if you get an error here, it is likely the .csv file that is not the
// correct filename or path
function preload(){
  clickablesManager = new ClickableManager('assets/clickableLayout.csv');
}

// ALWAYS call the setup() funciton for ClickableManager in the setup(), after
// the class has been allocated in the preload() function.
function setup() {
  createCanvas(1280,600);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  // output to the message window
  console.log(clickables);
}

// Just draw the button
function draw() {
  background(128);
  // draw the p5.clickables
  clickablesManager.draw();
}


// change individual fields of the clickables
function setupClickables() {

  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;

    clickables[i].drawImageOnly = false;
  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {
  alert(this.name);
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  this.color = "#FFFFFF";
  

  this.noTint = true;
}



