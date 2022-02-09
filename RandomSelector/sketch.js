/*
  Random Selector
  by Scott Kildall
  
 Choose a random students name and display it for presentation
  
  Improvements/problems
    * Right now this is cloned from RandomPartners, so has the same floating code in it and same fucntionality
    
    
*/

// All of our arrays
var names = ["Sarah", "Kaila", "Hannah", "Ty", "Mitch", "Matt", "Morgan", "Jennifer", "Mindy", "Monique", "Luis", "Kianna", "Savannah"];
var x = [];
var y = [];
var selected = [];    // true or false

// Selection-related global variables
var numChosen = 0;
var rouletteOn = false;
var rouletteCounter = 0;
var rouletteThreshold = 4;
var rouletteMax = 30;
var selectedIndex = 0;
var lastSelected = -1;

// Setup code goes here
function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(CENTER);
  frameRate(30);
  
  initializeArrays();
 }


// Draw code goes here
function draw() {
  background(0);

  drawNames();
}

function drawNames() {
  textSize(20);

  if( rouletteOn ) {
    if(rouletteCounter >= rouletteThreshold  ) {
      selectNext();
    }

    rouletteCounter++;
    if( rouletteCounter > rouletteMax ) {
      // we are done, make as current selection and as selected
      lastSelected = selectedIndex;
      selected[selectedIndex] = true;   
      rouletteOn = false;
    }
  }

  for( let i = 0; i < names.length; i++ ) {
    // deafault is unselected (white)
    fill(255);      
    
    // current selection (orange)
    if( rouletteOn && selectedIndex === i ) {
      fill(240,120,0);
    }

    // has already been selected (gray out)
    else if( selected[i] ) {
      fill(128)
    }

    if( lastSelected === i ) {
      fill(250,60,0);
    }

    text( names[i], x[i], y[i]);
  }
}

function keyPressed() {
  if( key === ' ' ) {
    if( rouletteOn === false ) {
      lastSelected = -1;      // turn off last selected
      rouletteThreshold = 4;
      rouletteCounter = 0;
      rouletteOn = true;
    }
    numChosen++;
  }
}

function initializeArrays() {
  doRandomSeed();

  names = shuffle(names);   // this will be the selection order, extra randomness

  // initialize x and y arrays to random (x,y) values
  // initialize selected array to false
  // these 3 arrays will match the length of the names array
  for( let i = 0; i < names.length; i++ ) {
    x.push(random(100,width-100));
    y.push(random(100,height-100));
    selected.push(false);
  }
}

// Seed random numbers from seconds * milliseconds of current time
function doRandomSeed() {
  var today = new Date();
  var time = today.getSeconds() * today.getMilliseconds();
  randomSeed(time);
}

// go through array, if any one is false, return false, otherwise all must be selected
function areAllSelected() {
  for( let i = 0; i < names.length; i++ ) {
    if( selected[i] === false ) {
      return false;
    }
  }
      
  return true;
}

// moves global selectedIndex variable to the next one
function selectNext() {
  if( areAllSelected() ) {
    return -1;    // out of bounds (error)
  }
  
  // go to next, skip while we are selected
  selectedIndex++;
  if( selectedIndex === names.length ) {
    selectedIndex = 0;
  }  

  while( selected[selectedIndex] === true ) {
    selectedIndex++;
    if( selectedIndex === names.length ) {
      selectedIndex = 0;
    }  
  }

  rouletteCounter = 0;
  rouletteThreshold += random(2,4);
}
