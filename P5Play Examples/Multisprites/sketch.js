/***********************************************************************************
  MultiSprite Navigation

  Use of the p5.play library with a sprite class

  Improvements:
  - stop for an avatar
  - mirror
  - add individual speeds for different avatars
  - set positions for each one
  - do collision-detection
  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// This is a 'sprite' which we can move
var speed = 10;

// an array of all the class avaatars
var avatars = [];
var selectedIndex = 0;

function preload() {
  // Add new avatar animations here
  avatars[0] = new Avatar("Matt", 100, 150, 'assets/walk-01.png', 'assets/walk-04.png');
  avatars[1] = new Avatar("Mitch", 300, 150, 'assets/mos_1.png', 'assets/mos_2.png');
  avatars[2] = new Avatar("Jennifer", 300, 150, 'assets/tree01.png', 'assets/tree03.png');
}
// Setup code goes here
function setup() {
  createCanvas(1000, 800);

  frameRate(30);
 }

// Draw code goes here
function draw() {
  // could draw a PNG file here
  background(255);

  // trap keyboard arrow keys
  checkMovement();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();
}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    // stop current avatar
    avatars[selectedIndex].setSpeed(0,0);
    selectedIndex++;
    if( selectedIndex === avatars.length ) {
      selectedIndex = 0;
    }
  }
}

function checkMovement() {
  var xSpeed = 0;
  var ySpeed = 0;

  // Check x movement
  if(keyIsDown(RIGHT_ARROW)) {
    xSpeed = speed;
  }
  else if(keyIsDown(LEFT_ARROW)) {
    xSpeed = -speed;
  }
  
  // Check y movement
  if(keyIsDown(DOWN_ARROW)) {
    ySpeed = speed;
  }
  else if(keyIsDown(UP_ARROW)) {
    ySpeed = -speed;
  }

  avatars[selectedIndex].setSpeed(xSpeed, ySpeed);
}

// Animated character
class Avatar  {
  // gets called with new keyword
  constructor(name, x, y, startPNGPath, endPNGPath) {
    this.name = name;
    this.sprite = createSprite(x, y);
    this.sprite.addAnimation('floating', startPNGPath, endPNGPath);
    
    // no grabables
    this.grabbable = undefined;

    // make avatar still
    this.setSpeed(0,0);
  }

  setSpeed(xSpeed,ySpeed) {
    this.sprite.velocity.x = xSpeed;
    this.sprite.velocity.y = ySpeed;
  }
}
