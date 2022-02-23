/*******************************************************************************************************************
      Moody
    by Scott Kildall
 
  Color Palette Values:

  Black: #031927
  Turquoise: #3ED8D2
  Canary: #FFF689
  Sizzling Red: #F2545B
  Pale Purple: #E9D6EC

    Uses the p5.ComplexStateMachine library. Check the README.md + source code documentation
    The index.html needs to include the line:  <script src="p5.complexStateManager.js"></script>
*********************************************************************************************************************/

var complexStateMachine;           // the ComplexStateMachine class
var clickablesManager;             // our clickables manager
var clickables;                    // an array of clickable objects

var moodImage;

var bkColor = '#031927';

function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  complexStateMachine = new ComplexStateMachine("data/interactionTable.csv", "data/clickableLayout.csv");
}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);
  imageMode(CENTER);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // setup the state machine with callbacks
  complexStateMachine.setup(clickablesManager, setImage);

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
 }


// Draw code goes here
function draw() {
  drawBackground();
  drawImage();
  drawUI();
}

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#F2545B";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#E9D6EC";
}

clickableButtonPressed = function() {
  complexStateMachine.clickablePressed(this.name);
}

// this is a callback, which we use to set our display image
function setImage(imageFilename) {
  moodImage = loadImage(imageFilename);
} 



//==== KEYPRESSED ====/
function keyPressed() {
 
}

//==== MODIFY THIS CODE FOR UI =====/

function drawBackground() {
  background(color(bkColor));
}

function drawImage() {
  if( moodImage !== undefined ) {
    image(moodImage, width/2, height/2);
  }  
}

function drawUI() {
  push();
  textAlign(LEFT);
  textSize(18);
  pop();

  clickablesManager.draw();
}
