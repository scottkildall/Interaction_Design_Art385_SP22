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
var speed = 20;

// an array of all the class avaatars
var avatars = [];
var selectedIndex = 0;

var star;

function preload() {
 
  // Add new avatar animations here
  avatars[0] = new Avatar("Matt", 100, 150, 'assets/walk-01.png', 'assets/walk-04.png');
  avatars[0].setMaxSpeed(2);
  
  avatars[1] = new Avatar("Mitch", 400, 150, 'assets/mos_1.png', 'assets/mos_2.png');
  avatars[2] = new Avatar("Jennifer", 500, 150, 'assets/blob01.png', 'assets/blob08.png');
  avatars[2].setMaxSpeed(20);
  avatars[3] = new Avatar("Ty", 200, 400, 'assets/avatar1.png', 'assets/avatar5.png');
  avatars[4] = new Avatar("Hannah", 100, 400, 'assets/Smile01.png', 'assets/Smile04.png');
  avatars[5] = new Avatar("Luis", 300, 400, 'assets/run1.png', 'assets/run2.png');
  avatars[6] = new Avatar("Morgan", 500, 400, 'assets/frog-01.png', 'assets/frog-08.png');
  avatars[7] = new Avatar("Savannah", 100, 700, 'assets/girl2.png', 'assets/girl6.png');

  star = new Grabbable(400, 400, 'assets/fullStar.png');
  avatars[3].setGrabbable(star);
}

// Setup code goes here
function setup() {
  createCanvas(1000, 800);

  star.setup();

  frameRate(30);
 }

// Draw code goes here
function draw() {
  // could draw a PNG file here
  background(128);

  // trap keyboard arrow keys
  checkMovement();

  // drawSprites is a function in p5.play, draws all the sprites
  drawSprites();

  for( let i = 0; i < avatars.length; i++ ) {
    avatars[i].drawLabel();
    avatars[i].update();
  }
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
    this.maxSpeed = 6;
    
    //console.log(this);
    // no grabables
    this.grabbable = undefined;

    // make avatar still
    this.setSpeed(0,0);
  }

  setMaxSpeed(num) {
    this.maxSpeed = num;
  }

  setSpeed(xSpeed,ySpeed) {
    // flip sprite depending on direction
    if( xSpeed > 0 ) {
      this.sprite.mirrorX(-1);
    }
    else {
      this.sprite.mirrorX(1);
    }

    this.sprite.velocity.x = xSpeed;
    if( this.sprite.velocity.x > this.maxSpeed ) {
      this.sprite.velocity.x = this.maxSpeed;
    }
    else if( this.sprite.velocity.x < -this.maxSpeed ) {
      this.sprite.velocity.x = -this.maxSpeed;
    }

    this.sprite.velocity.y = ySpeed;
    if( this.sprite.velocity.y > this.maxSpeed ) {
      this.sprite.velocity.y = this.maxSpeed;
    }
    else if( this.sprite.velocity.y < -this.maxSpeed ) {
      this.sprite.velocity.y = -this.maxSpeed;
    }
  }

  // accessor function to give avatar a grabbable
  setGrabbable(grabbable) {
    this.grabbable = grabbable;
  }

  // if avatar has a grabble, update the position of that grabbable
  // call every draw loop
  update() {
    if( this.grabbable !== undefined ) {
      this.grabbable.sprite.position.x = this.sprite.position.x + 10;
      this.grabbable.sprite.position.y = this.sprite.position.y + 10;
    }
  }

  drawLabel() {
    textSize(12);
    fill(240);
    text(this.name, this.sprite.position.x, this.sprite.position.y);
  }
}

class Grabbable {
  constructor(x, y, pngPath) {
    this.img = loadImage(pngPath);
    this.sprite = createSprite(x, y);
  }

  setup() {
    this.sprite.addImage('static', this.img );
  }
}