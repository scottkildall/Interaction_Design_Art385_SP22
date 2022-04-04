/***********************************************************************************
  MultiSprite Navigation

  Use of the p5.play library with a sprite class
  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.timer.js"></script>
***********************************************************************************/

// This is a speed of the 'sprite' which we can move
var speed = 20;

// an array of all the class avaatars
var playerAvatar;
var selectedIndex = 0;

var grabbables = [];

// a static sprite representing the teleporting door
var door;

// keycods for W-A-S-D
const W_KEY = 87;
const S_KEY = 83;
const D_KEY = 68;
const A_KEY = 65;

// control variables for grabbables
var overlapCount = 0;
var preventPickup = false;        // for when you drop one
var preventRepickup = false;      // two objects

// opened 
var opened = false;

function preload() {
 
  // Add new avatar animations here
  playerAvatar = new Avatar("Player", 100, 150);
   
  // MODIFY THIS: to make your avatar go faster or slower
  playerAvatar.setMaxSpeed(5);

  door = new StaticSprite("Door", 900,700, 'assets/door.png');

  // default direction facing LEFT for the moving animation
  // MODIFY THIS: change to your avatar filenames
  playerAvatar.addMovingAnimation( 'assets/run1.png', 'assets/run2.png');
  playerAvatar.addStandingAnimation('assets/standing1.png', 'assets/standing2.png');

  // MODIFY THIS - add more grabbables beloiw
  // Add grabbables - these appear on top of the player icon
  grabbables.push(new StaticSprite("Star", 500,500, 'assets/fullStar.png'));
  grabbables.push(new StaticSprite("Key", 750,200, 'assets/key.png'));
  grabbables.push(new StaticSprite("Wheel", 400,300, 'assets/wheel.png'));
}

// Setup code goes here
function setup() {
  createCanvas(1000, 800);
  frameRate(30);

  // This will setup the animation
  for( let i = 0; i < grabbables.length; i++ ) {
    grabbables[i].setup();
  }

  // loads image for the door
  door.setup();
 }

// Draw code goes here
function draw() {
  // MODIFY THIS: if you want to do something more with the key
  if( opened ) {
    background(128,80,0);
  }
  else {
    background(128);
  }

  // trap keyboard arrow keys
  checkMovement();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  // We call this to support grabbables
  playerAvatar.update();

  checkOverlaps();
}

function checkOverlaps() {
  // We are looking for an overlap of the player avatar with the door.
  // the 2nd argument is a local callback function, that will get called repeatedly while
  // we may build better ov
 playerAvatar.sprite.overlap(door.sprite, doorCollision);

  // go through grabble array and set these 
  overlapCount = 0;
  for( let i = 0; i < grabbables.length; i++ ) {
    playerAvatar.sprite.overlap(grabbables[i].sprite, grabbableCollision);
  }

  // we aren't overlapping, so prevent re-pickup
  if( overlapCount === 0 ) {
    preventPickup = false;
  }
  if( overlapCount === 1 ) {
    preventRepickup = false;
  }
}

// This will reset position
function keyPressed() {
  if( key === ' ') {
    if( playerAvatar.grabbable !== undefined ) {
      preventPickup = true;
      playerAvatar.clearGrabbable();
    }
  }

  // MODIFY THIS
  // Comment out this code BELOW if you don't have multiple avatars
  checkSelectAvatar();
}

// MODIFY THIS: if you are using multiple avatars for selection. Change the filenames
function checkSelectAvatar() {
  // code to switch avatar animations
  if( key === '1') {
    playerAvatar.addMovingAnimation( 'assets/run1.png', 'assets/run2.png');
    playerAvatar.addStandingAnimation('assets/standing1.png', 'assets/standing2.png');
  }
  if( key === '2') {
    playerAvatar.addMovingAnimation( 'assets/blob01.png', 'assets/blob08.png');
    playerAvatar.addStandingAnimation('assets/blob01.png', 'assets/blob08.png');
  }
  if( key === '3') {
    playerAvatar.addMovingAnimation( 'assets/sun1.png', 'assets/sun5.png');
    playerAvatar.addStandingAnimation('assets/sun1.png', 'assets/sun5.png');
  }
}

// respond to W-A-S-D or the arrow keys
function checkMovement() {
  var xSpeed = 0;
  var ySpeed = 0;

  // Check x movement
  if(keyIsDown(RIGHT_ARROW) || keyIsDown(D_KEY)) {
    xSpeed = speed;
  }
  else if(keyIsDown(LEFT_ARROW) || keyIsDown(A_KEY)) {
    xSpeed = -speed;
  }
  
  // Check y movement
  if(keyIsDown(DOWN_ARROW) || keyIsDown(S_KEY)) {
    ySpeed = speed;
  }
  else if(keyIsDown(UP_ARROW) || keyIsDown(W_KEY)) {
    ySpeed = -speed;
  }

  playerAvatar.setSpeed(xSpeed,ySpeed);
}

// When the player avatar intesects with the door, gets called repeatedly
function doorCollision(spriteA, spriteB) {
  if( playerAvatar.getGrabbableName() === "Key" ) {
    opened = true;
  }
  else {
    playerAvatar.setPosition(width/2, height/2);
    opened = false;
  }
}

// When the player avatar intesects with the door, gets called repeatedly
// SpriteB = grabble sprite
function grabbableCollision(spriteA, spriteB) {  
  overlapCount++;

  if( preventPickup || preventRepickup ) {
    return;
  }

  // check for new grabble (not self)
  if( playerAvatar.grabbable === undefined || playerAvatar.grabbable.sprite !== spriteB ) {
    for( let i = 0; i < grabbables.length; i++ ) {
      if( grabbables[i].sprite === spriteB ) {
        //console.log("new set: " + i);
        playerAvatar.setGrabbable(grabbables[i]);
        preventRepickup = true;
        break;
      }
    }    
  }
}