/***********************************************************************************
    Project 2: The Lesbian Visibility Maze Game
    by Natalie Morris

  The Lesbian Visibility Maze Game allows the user to navigate a series of rooms 
  they must escape, each representing a different way lesbianism exists in media 
  representation.

  This program uses the p5.play game library and the utilization of state machines, 
  conditional logic, classes, animation, collision detection, and micro-interactions, 
  to create its immersive maze experience.

***********************************************************************************/

// Navigation variables
var lastKeyPressed = 0;
var keyFront = 1;
var keyBack = 2;
var keyLeft = 3;
var keyRight = 4;
var keyHeld;

// Adventure Manager variables 
var adventureManager;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects
var clickableButtonPressed;

// indexes into the clickable array (constants)
const playGameIndex = 0;

// p5.play variables
var playerSprite;
var playerAnimation;

// MC Sprite animation variables
var spriteFrontIdle;
var spriteLeftIdle;
var spriteRightIdle;
var spriteBackIdle;
var spriteFrontWal;
var spriteLeftWalk;;
var spriteRightWalk;
var spriteBackWalk;

// Collision variables
var rectTop;
var rectLeft;
var rectRight;
var rectBottom;
var topUnlock = false;
var leftUnlock = false;
var rightUnlock = false;
var bottomUnlock = false;

// Instructions sprite variables
var starSprite;
var startScreenSprite;

// Sexy sprite variables
var sexySprite;
var censorXXXSprite;
var censorPornSprite;
var censor18PlusSprite;

// Hetero sprite variables
var hetSprite;
var person1Exclaim;
var person2Exclaim;
var person3Exclaim;

// Lesbian sprite variables
var lesbianSprite;
var whiteSkull;

// Button variables
var textWindow;
var interactButton;

// Instructions image variables
var instructions1;
var instructions2;
var instructions3;
var interactBox;

// Sexy room image variables
var sexyDetail;
var sexyDialogue1;
var sexyDialogue2;
var sexyDialogue3;
var sexyEsc;
var sexy18Plus;
var sexy18PlusBlack;
var sexyPorn;
var sexyPornBlack;
var sexyXXX;
var sexyXXXBlack;
var sexyMouse;
var sexyPointer;
var sexyCensor;

// Hetero room image variables
var hetDetail;
var hetDialogue1;
var hetDialogue2;
var hetDialogue3;
var hetExclaim;
var hetExit;
var hetHearts;
var hetCouple;
var hetMan;
var hetWoman;

// White room image variables
var whiteDetail;
var whiteDialogue1;
var whiteDialogue2;
var whiteDialogue3;
var whiteFin;
var whiteHearts;
var whitePortrait1;
var whitePortrait2;
var whitePortrait3;
var whiteCoupleDead;

// Evil room image variables
var evilDetail;
var evilBlood;
var evilBlood1;
var evilBlood2;
var evilBlood3;
var evilDialogue1;
var evilDialogue2;
var evilDialogue3;
var evilSprite;
var evilExit;
var evilKey;
var evilLock;
var evilGate;

// Evil room movement variables
var gateX;
var gateY;
var gateMove = 0;
var gateMoving = false;

// End room variables
var endComplete;
var endMirrorLayer;
var endDialogue1;
var endDialogue2;
var endDialogue3;
var endDialogue4;
var endDialogue5;
var endMirrorLine;
var endMirrorBlur;
var mirrorSprite;

// Detail movement variables
var detailMove;
var detailSpeed;

// Interaction booleans
var gameNotStarted = true;

// Interaction booleans for sexy room
var portalOpen = false;
var sexyRoomActive = false;
var interactSexyLadies = false;
var censorsOpen = false;
var censored18Plus = false;;
var censoredXXX = false;
var censoredPorn = false;
var escActive = false;

// Interaction booleans for het room
var hetRoomActive = false;
var interactHetCouple = false;
var couplesOpen = false;
var exitActive = false;
var couple1Done = false;
var couple2Done = false;
var couple3Done = false;

// Interaction booleans for white room
var whiteRoomActive = false;
var interactLesbians = false;
var deathOpen = false;
var deathHappened = false;
var finActive = false;

// Interaction booleans for evil room
var evilRoomActive = false;
var interactEvil = false;
var keyOpen = false;
var gateClosed = false;
var evilExitActive = false;

// Interaction booleans for end room
var endRoomActive = false;
var gameOver = false;
var interactMirror = false;

// Hetero room movement variables
var person1Move;
var person2Move;
var person3Move;
var person4Move;

// Allocate Adventure Manager with states table and interaction tables and load animations
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager("data/adventureStates.csv", "data/interactionTable.csv", "data/clickableLayout.csv");

  // Load clickable images for instructions
  instructions1 = loadImage('assets/instructions/instructions1.png');
  instructions2 = loadImage('assets/instructions/instructions2.png');
  instructions3 = loadImage('assets/instructions/instructions3.png');
  interactBox = loadImage('assets/interact.png');

  // Load clickable images for sexy room
  sexyDialogue1 = loadImage('assets/sexroom/dialogue1.png')
  sexyDialogue2 = loadImage('assets/sexroom/dialogue2.png')
  sexyDialogue3 = loadImage('assets/sexroom/dialogue3.png')
  sexyPornBlack = loadImage('assets/sexroom/pornblack.png');

  // Load clickable images for hetero room
  hetDialogue1 = loadImage('assets/hetroom/dialogue1.png')
  hetDialogue2 = loadImage('assets/hetroom/dialogue2.png')
  hetDialogue3 = loadImage('assets/hetroom/dialogue3.png')

  // Load sprite animations
  spriteFrontIdle = loadAnimation('assets/sprite/em_spritefront1.png', 'assets/sprite/em_spritefront2.png');
  spriteLeftIdle = loadAnimation('assets/sprite/em_spriteleftstand1.png', 'assets/sprite/em_spriteleftstand2.png');
  spriteRightIdle = loadAnimation('assets/sprite/em_spriterightstand1.png', 'assets/sprite/em_spriterightstand2.png');
  spriteBackIdle = loadAnimation('assets/sprite/em_spriteback1.png', 'assets/sprite/em_spriteback2.png');
  spriteFrontWalk = loadAnimation('assets/sprite/em_spritefrontwalk1.png', 'assets/sprite/em_spritefront1.png',
   'assets/sprite/em_spritefrontwalk2.png', 'assets/sprite/em_spritefront1.png');
  spriteLeftWalk = loadAnimation('assets/sprite/em_spriteleft1.png', 'assets/sprite/em_spriteleftstand1.png',
   'assets/sprite/em_spriteleft2.png', 'assets/sprite/em_spriteleftstand1.png');
  spriteRightWalk = loadAnimation('assets/sprite/em_spriteright1.png', 'assets/sprite/em_spriterightstand1.png',
   'assets/sprite/em_spriteright2.png', 'assets/sprite/em_spriterightstand1.png');
  spriteBackWalk = loadAnimation('assets/sprite/em_spritebackwalk1.png', 'assets/sprite/em_spriteback1.png',
   'assets/sprite/em_spritebackwalk2.png', 'assets/sprite/em_spriteback1.png');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  angleMode(DEGREES); // change the angle mode from radians to degrees

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // Create MC sprite
  playerSprite = createSprite(width/2, height/2);

  // Mirror sprite
  mirrorSprite = createSprite(width/2, height/2);

  // Create collision sprites
    rectTop = createSprite(0,0);
    rectTop.addImage(loadImage('assets/width.png'));
    rectTop.setCollider('rectangle', 0, 0, width*2, 1);

    rectBottom = createSprite(width,height);
    rectBottom.addImage(loadImage('assets/width.png'));
    rectBottom.setCollider('rectangle', 0, 0, width*2, 1);

    rectLeft = createSprite(0,0);
    rectLeft.addImage(loadImage('assets/height.png'));
    rectLeft.setCollider('rectangle', 0, 0, 1, height*2);

    rectRight = createSprite(width,height);
    rectRight.addImage(loadImage('assets/height.png'));
    rectRight.setCollider('rectangle', 0, 0, 1, height*2);

  // Create sexy sprites
    starSprite = createSprite(width/2 - 450, height/2);
    starSprite.addImage(loadImage('assets/instructions/star.png'));

    startScreenSprite = createSprite(width/2, height/2);
    startScreenSprite.addImage(loadImage('assets/instructions/screen.png'));

    sexySprite = createSprite(width/2, height/2);
    sexySprite.addImage(loadImage('assets/sexroom/pornwindow.png'));

    censorXXXSprite = createSprite(1120, 200);
    censorXXXSprite.addImage(loadImage('assets/sexroom/censorbutton.png'));
    censor18PlusSprite = createSprite(140, 320);
    censor18PlusSprite.addImage(loadImage('assets/sexroom/censorbutton.png'));
    censorPornSprite = createSprite(width/2, 560);
    censorPornSprite.addImage(loadImage('assets/sexroom/censorbutton.png'));

  // Create hetero sprites
    hetSprite = createSprite(width/2, height/2);
    hetSprite.addImage(loadImage('assets/hetroom/straightcouple.png'));

    person1Exclaim = createSprite(910, 50);
    person1Exclaim.addImage(loadImage('assets/hetroom/exclaim.png'));
    person2Exclaim = createSprite(690, 500);
    person2Exclaim.addImage(loadImage('assets/hetroom/exclaim.png'));
    person3Exclaim = createSprite(230, 120);
    person3Exclaim.addImage(loadImage('assets/hetroom/exclaim.png'));

  // Create lesbian sprites
    lesbianSprite = createSprite(width/2, height/2);
    lesbianSprite.addImage(loadImage('assets/whiteroom/couple.png'));

    whiteSkull = createSprite(width/2 + 150, height/2 - 100);
    whiteSkull.addImage(loadImage('assets/whiteroom/die.png'));

  // Create evil sprites
    evilSprite = createSprite(width/2, height/2);
    evilSprite.addImage(loadImage('assets/evilroom/evilsprite.png'));

    evilKey = createSprite(width/2 - 500, height/2);
    evilKey.addImage(loadImage('assets/evilroom/key.png'));

    evilLock = createSprite(width/2 + 500, height/2);
    evilLock.addImage(loadImage('assets/evilroom/lock.png'));

  // Setup detail bounce variables
  detailMove = 5;
  detailSpeed = .1;

  // Het room movement variables
  person1Move = 0;
  person2Move = 0;
  person3Move = 0;
  person4Move = 0;

  // Control speeds of sprite animations
  spriteFrontIdle.frameDelay = 14;
  spriteLeftIdle.frameDelay = 14;
  spriteRightIdle.frameDelay = 14;
  spriteBackIdle.frameDelay = 14;
  spriteFrontWalk.frameDelay = 12;
  spriteLeftWalk.frameDelay = 12;
  spriteRightWalk.frameDelay = 12;
  spriteBackWalk.frameDelay = 12;

  // MC sprite animations
  playerSprite.addAnimation('regular', spriteFrontIdle);
  playerSprite.addAnimation('frontWalk', spriteFrontWalk);
  playerSprite.addAnimation('leftIdle', spriteLeftIdle);
  playerSprite.addAnimation('leftWalk', spriteLeftWalk);
  playerSprite.addAnimation('rightIdle', spriteRightIdle);
  playerSprite.addAnimation('rightWalk', spriteRightWalk);
  playerSprite.addAnimation('backIdle', spriteBackIdle);
  playerSprite.addAnimation('backWalk', spriteBackWalk);

  // Mirror sprite animations
  mirrorSprite.addAnimation('regular', spriteFrontIdle);
  mirrorSprite.addAnimation('frontWalk', spriteFrontWalk);
  mirrorSprite.addAnimation('leftIdle', spriteLeftIdle);
  mirrorSprite.addAnimation('leftWalk', spriteLeftWalk);
  mirrorSprite.addAnimation('rightIdle', spriteRightIdle);
  mirrorSprite.addAnimation('rightWalk', spriteRightWalk);
  mirrorSprite.addAnimation('backIdle', spriteBackIdle);
  mirrorSprite.addAnimation('backWalk', spriteBackWalk);

  // Default animation front idle
  lastKeyPressed = keyFront;

  // use this to track movement from toom to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerSprite);

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // Make buttons
  setupTextWindow();
  setupInteractBox();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();

  // responds to keydowns
  moveSprite();

  // this is a function of p5.js, not of this sketch
  drawSprite(playerSprite);
}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }

  // dispatch key events for adventure manager to move from state to 
  // state or do special actions - this can be disabled for NPC conversations
  // or text entry
  adventureManager.keyPressed(key);  
}

function mouseReleased() {
  adventureManager.mouseReleased();
}

//-------------- YOUR SPRITE MOVEMENT CODE HERE  ---------------//

// When front, back, left, or right arrow is pressed the animation changes
// Store a new value inside of the lastKeyPressed
function moveSprite() {
  if(keyIsDown(RIGHT_ARROW)) {
    playerSprite.velocity.x = 10;
    mirrorSprite.velocity.x = 10;
    playerSprite.changeAnimation('rightWalk');
    mirrorSprite.changeAnimation('rightWalk');
    lastKeyPressed = keyRight;
    keyHeld = true;
  }
  else if(keyIsDown(LEFT_ARROW)) {
    playerSprite.velocity.x = -10;
    mirrorSprite.velocity.x = -10;
    playerSprite.changeAnimation('leftWalk');
    mirrorSprite.changeAnimation('leftWalk');
    lastKeyPressed = keyLeft;
    keyHeld = true;
  }
  else {
    playerSprite.velocity.x = 0;
    mirrorSprite.velocity.x = 0;
    keyHeld = false;
  }

  if(keyIsDown(DOWN_ARROW)) {
    playerSprite.velocity.y = 10;
    mirrorSprite.velocity.y = 10;
    playerSprite.changeAnimation('frontWalk');
    mirrorSprite.changeAnimation('backWalk');
    lastKeyPressed = keyFront;
    keyHeld = true;
  }
  else if(keyIsDown(UP_ARROW)) {
    playerSprite.velocity.y = -10;
    mirrorSprite.velocity.y = -10;
    playerSprite.changeAnimation('backWalk');
    mirrorSprite.changeAnimation('frontWalk');
    lastKeyPressed = keyBack;
    keyHeld = true;
  }
  else {
    playerSprite.velocity.y = 0;
    mirrorSprite.velocity.y = 0;
  }

// Use lastKeyPressed to use idle animations
  if(!keyHeld) {
    if(lastKeyPressed === keyRight) {
      playerSprite.changeAnimation('rightIdle');
      mirrorSprite.changeAnimation('rightIdle');
    }
    if(lastKeyPressed === keyLeft) {
      playerSprite.changeAnimation('leftIdle');
      mirrorSprite.changeAnimation('leftIdle');
    }
    if(lastKeyPressed === keyFront) {
      playerSprite.changeAnimation('regular');
      mirrorSprite.changeAnimation('backIdle');
    }
    if(lastKeyPressed === keyBack) {
      playerSprite.changeAnimation('backIdle');
      mirrorSprite.changeAnimation('regular');
    }
  }
}

//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
  }
}

clickableButtonPressed = function() {
    // these clickables are ones that change your state
    // so they route to the adventure manager to do this
    adventureManager.clickablePressed(this.name); 
}

function setupTextWindow() {
  // Create clickable text window
  textWindow = new Clickable();

  textWindow.image = instructions1;
  textWindow.width = instructions1.width;
  textWindow.height = instructions1.height;

  textWindow.locate(width/2 - textWindow.width/2, height/2 - textWindow.height/2 - 200);
  textWindow.onPress = textWindowPressed;
}

textWindowPressed = function() {
  // If we are on the instructions room, window 1, clicking with change to window 2
  if (textWindow.image === instructions1) {
    textWindow.image = instructions2;
    textWindow.width = instructions2.width;
    textWindow.height = instructions2.height;
  }
  else if (textWindow.image === instructions3) {
    portalOpen = true;
  }

  // If we are in sexy room and open to dialogue 1, clicking will change to dialogue 2
  if (textWindow.image === sexyDialogue1) {
    textWindow.image = sexyDialogue2;
    textWindow.width = sexyDialogue2.width;
    textWindow.height = sexyDialogue2.height;
  }
  else if (textWindow.image === sexyDialogue2) {    
    textWindow.image = sexyDialogue3;
    textWindow.width = sexyDialogue3.width;
    textWindow.height = sexyDialogue3.height;
    censorsOpen = true;
  }

  // If we are in the hetero room and open to dialogue 1, clicking will change to dialogue 2
  if (textWindow.image === hetDialogue1) {
    textWindow.image = hetDialogue2;
    textWindow.width = hetDialogue2.width;
    textWindow.height = hetDialogue2.height;
  }
  else if (textWindow.image === hetDialogue2) {    
    textWindow.image = hetDialogue3;
    textWindow.width = hetDialogue3.width;
    textWindow.height = hetDialogue3.height;
    couplesOpen = true;
  }

  // If we are in the white room and open to dialogue 1, clicking will change to dialogue 2
  if (textWindow.image === whiteDialogue1) {
    textWindow.image = whiteDialogue2;
    textWindow.width = whiteDialogue2.width;
    textWindow.height = whiteDialogue2.height;
  }
  else if (textWindow.image === whiteDialogue2) {    
    textWindow.image = whiteDialogue3;
    textWindow.width = whiteDialogue3.width;
    textWindow.height = whiteDialogue3.height;
    deathOpen = true;
  }

  // If we are in the evil room and open to dialogue 1, clicking will change to dialogue 2
  if (textWindow.image === evilDialogue1) {
    textWindow.image = evilDialogue2;
    textWindow.width = evilDialogue2.width;
    textWindow.height = evilDialogue2.height;
  }
  else if (textWindow.image === evilDialogue2) {    
    textWindow.image = evilDialogue3;
    textWindow.width = evilDialogue3.width;
    textWindow.height = evilDialogue3.height;
    keyOpen = true;
  }

  // If we are in the end room and open to dialogue 1, clicking will change to dialogue 2
  if (textWindow.image === endDialogue1) {
    textWindow.image = endDialogue2;
    textWindow.width = endDialogue2.width;
    textWindow.height = endDialogue2.height;
  }
  else if (textWindow.image === endDialogue2) {    
    textWindow.image = endDialogue3;
    textWindow.width = endDialogue3.width;
    textWindow.height = endDialogue3.height;
  }
  else if (textWindow.image === endDialogue3) {    
    textWindow.image = endDialogue4;
    textWindow.width = endDialogue4.width;
    textWindow.height = endDialogue4.height;
  }
  else if (textWindow.image === endDialogue4) {    
    textWindow.image = endDialogue5;
    textWindow.width = endDialogue5.width;
    textWindow.height = endDialogue5.height;
  }
  else if (textWindow.image === endDialogue5) {    
    gameOver = true;
  }  
}

function setupInteractBox() {
  // Create clickable interact button
  interactButton = new Clickable();

  interactButton.image = interactBox;
  interactButton.width = interactBox.width;
  interactButton.height = interactBox.height;
  interactButton.onPress = interactButtonPressed;
}

interactButtonPressed = function() {
  // Star demo prompt from Instructions page
  if (textWindow.image === instructions2) {
    textWindow.image = instructions3;
  }

  // Entering start screen
  if ( (portalOpen) && (gameNotStarted) ) {
    adventureManager.changeState('Sexy', null);
    gameNotStarted = false;
  }

  // Interacting with sexy ladies in sexy room
  if (sexyRoomActive) {
    interactSexyLadies = true;
    textWindow.locate(100, 100);
    textWindow.image = sexyDialogue1;
    textWindow.width = sexyDialogue1.width;
    textWindow.height = sexyDialogue1.height;
  }

  // Interacting with hetero couple in hetero room
  if (hetRoomActive) {
    interactHetCouple = true;
    textWindow.locate(150, 320);
    textWindow.image = hetDialogue1;
    textWindow.width = hetDialogue1.width;
    textWindow.height = hetDialogue1.height;
  }

  // Interacting with lesbians in white room
  if (whiteRoomActive) {
    interactLesbians = true;
    textWindow.locate(800, 50);
    textWindow.image = whiteDialogue1;
    textWindow.width = whiteDialogue1.width;
    textWindow.height = whiteDialogue1.height;
  }

  // Interacting with villain in evil room
  if (evilRoomActive) {
    interactEvil = true;
    textWindow.locate(900, 100);
    textWindow.image = evilDialogue1;
    textWindow.width = evilDialogue1.width;
    textWindow.height = evilDialogue1.height;
  }

  // Interacting with mirror in last room
  if (endRoomActive) {
    interactMirror = true;
    textWindow.locate(width/2 - textWindow.width/2, height/2 - textWindow.height/2 - 150);
    textWindow.image = endDialogue1;
    textWindow.width = endDialogue1.width;
    textWindow.height = endDialogue1.height;
  }
}

//-------------- COLLISIONS ---------------//

// Make collisions that guard the sides of the room so player cannot leave
function makeCollisions() {
  playerSprite.collide(rectTop);
  playerSprite.collide(rectLeft);
  playerSprite.collide(rectBottom);
  playerSprite.collide(rectRight);
  drawSprite(rectTop);
  drawSprite(rectLeft);
  drawSprite(rectBottom);
  drawSprite(rectRight);
  rectTop.setCollider('rectangle', 0, 0, width*2, 1);
  rectBottom.setCollider('rectangle', 0, 0, width*2, 1);
  rectLeft.setCollider('rectangle', 0, 0, 1, height*2);
  rectRight.setCollider('rectangle', 0, 0, 1, height*2);
}

// Check to see if collisions are still in place
function checkCollisions() {
  if (topUnlock) {
    rectTop.remove();
  }
  if (leftUnlock) {
    rectLeft.remove();
  }
  if (bottomUnlock) {
    rectBottom.remove();
  }
  if (rightUnlock) {
    rectRight.remove();
  }
}

// Set collisions onto all sides again
function resetCollisions() {
  topUnlock = false;
  leftUnlock = false;
  rightUnlock = false;
  bottomUnlock = false;
}

//-------------- SUBCLASSES ---------------//

class InstructionsScreen extends PNGRoom {
  preload() {
  }

  draw() {
    super.draw();

    // Draw clickable textbox with instructions inside
    textWindow.draw();

    // Showing the second instructions page will prompt a star to appear
    if (textWindow.image === instructions2) {
      drawSprite(starSprite);

      // When the player walks up to the star, the interact button appears
      if(playerSprite.overlap(starSprite)) {
        // Update the position of the interact to appear above the player
        interactButton.locate(playerSprite.position.x - 40, playerSprite.position.y - 140);
        interactButton.draw();
      }
    }

    if (portalOpen) {
      textWindow.image = null;
      drawSprite(startScreenSprite);

      // When player overlaps with the screen portal, interact button prompts
      if(playerSprite.overlap(startScreenSprite)) {
        // Update the position of the interact to appear above the player
        interactButton.locate(playerSprite.position.x - 40, playerSprite.position.y - 140);
        interactButton.draw();
      }
    }
  }
}

class SexRoom extends PNGRoom {
  preload() {
    // Load sexy room assets
    sexyDetail = loadImage('assets/sexroom/detail.png');
    sexyEsc = loadImage('assets/sexroom/escbutton.png')
    sexyPorn = loadImage('assets/sexroom/pornwindow.png');
    sexyXXX = loadImage('assets/sexroom/xxxwindow.png');
    sexy18Plus = loadImage('assets/sexroom/18pluswindow.png');
    sexyMouse = loadImage('assets/sexroom/mouse.png');
    sexyPointer = loadImage('assets/sexroom/point.png');
    sexyXXXBlack = loadImage('assets/sexroom/xxxblack.png');
    sexy18PlusBlack = loadImage('assets/sexroom/18plusblack.png');
  }

  draw() {
    super.draw();
    sexyRoomActive = true;
    makeCollisions();
    resetCollisions();

    // Draw porn window with lesbians inside
    drawSprite(sexySprite);

    // Draw other porn ads only if they haven't been censored yet
    if (!censoredXXX) {
      image(sexyXXX, 1000, 10);
    }
    else if (censoredXXX){
      image(sexyXXXBlack, 1000, 10);
    }

    if (!censored18Plus) {
      image(sexy18Plus, 50, 350);
    }
    else if (censored18Plus){
      image(sexy18PlusBlack, 50, 350);
    }

    if (censoredPorn) {
      image(sexyPornBlack, width/2 - sexyPornBlack.width / 2, height/2 - sexyPornBlack.height / 2);
    }

    // Draw mouse and cursors on top of images and sexySprite that wiggle left to right
    image(sexyMouse, 1000 + detailMove, 150);
    image(sexyMouse, 180 + detailMove, 520);
    image(sexyPointer, 800 + detailMove, 490);

    // Draw sparkles
    image(sexyDetail, 0, 0 + detailMove);

    // Make sparkles and bubbles in sexyDetail bounce
    if (detailMove > 10) {
      detailSpeed = -.2;
    }

    if (detailMove < 0) {
      detailSpeed = .2;
    }

    detailMove = detailMove + detailSpeed;

    // The interact button will only prompt if you are overlapping with the sexy ladies
    // Once you interact with them, the button diappears so you can click on the text window
    if( (playerSprite.overlap(sexySprite)) && (!interactSexyLadies) ) {
      interactButton.locate(playerSprite.position.x - 40, playerSprite.position.y - 140);
      interactButton.draw();
    }

    // If you interact with the porn window, the text window appears
    if( (interactSexyLadies) && (!escActive) ) {
      textWindow.draw();
    }

    // If you have prompted dialogue three the censorship buttons appear
    if (censorsOpen) {
      drawSprite(censorXXXSprite);
      drawSprite(censorPornSprite);
      drawSprite(censor18PlusSprite);
      // When the sprite touches the censor buttons, they will disappear
      if (playerSprite.overlap(censorXXXSprite)) {
        censorXXXSprite.remove();
        censoredXXX = true;
      }
      if (playerSprite.overlap(censorPornSprite)) {
        censorPornSprite.remove();
        censoredPorn = true;
        sexySprite.changeImage(sexyPornBlack);
      }
      if (playerSprite.overlap(censor18PlusSprite)) {
        censor18PlusSprite.remove();
        censored18Plus = true;
      }
    }

    // If all censor buttons are pressed, the escape window will appear
    // Remove the left collision
    if ( (censoredXXX) && (censoredPorn) && (censored18Plus) ) {
      escActive = true;
      leftUnlock = true;
      rectLeft.setCollider('rectangle', 0, 0, 0, 0);
      image(sexyEsc, 50, 50);
    }

    checkCollisions();
  }
}

class HetRoom extends PNGRoom {
  preload() {
    // Load hetero room assets
    hetDetail = loadImage('assets/hetroom/detail.png');
    hetExit = loadImage('assets/hetroom/exit.png');
    hetHearts = loadImage('assets/hetroom/floatyhearts.png');
    hetMan = loadImage('assets/hetroom/man.png');
    hetWoman = loadImage('assets/hetroom/woman.png');
  }

  draw() {
    super.draw();
    makeCollisions();
    resetCollisions();
    sexyRoomActive = false;
    hetRoomActive = true;

    // Allow sprite to walk through from the right
    rectRight.setCollider('rectangle', 0, 0, 0, 0);

    // Draw straight couple sprite
    drawSprite(hetSprite);

    // Draw hearts around sprites that wiggle left to right
    image(hetHearts, 270 + detailMove, 50);

    // Draw men and women waiting to be paired up
      // Couple 1
      image(hetMan, 920, 50 + person1Move);
      image(hetWoman, 850, 500);

      // Couple 2
      image(hetMan, 700 - person2Move, 500);
      image(hetWoman, 400 + person3Move, 500);

      // Couple 3
      image(hetMan, 240, 120 + person4Move);
      image(hetWoman, 176, 500);

    // When prompted by dialogue 3, exclaim sprites guide the user to push the couples
    if (couplesOpen) {
      drawSprite(person1Exclaim);
      drawSprite(person2Exclaim);
      drawSprite(person3Exclaim);
      if (playerSprite.overlap(person1Exclaim)) {
        if (person1Move <= 440) {
          person1Move = person1Move + 10;
          // Exclaim sprites only disappear when couples are standing together
          if (person1Move >= 400) {
            person1Exclaim.remove();
            couple1Done = true;
          }
        }
      }
      if (playerSprite.overlap(person2Exclaim)) {
        if (person2Move <= 109) {
          person2Move = person2Move + 10;
          person3Move = person3Move + 10;
          // Exclaim sprites only disappear when couples are standing together
          if (person2Move >= 109) {
            person2Exclaim.remove();
            couple2Done = true;
          }
        }
      }
      if (playerSprite.overlap(person3Exclaim)) {
        if (person4Move <= 370) {
          person4Move = person4Move + 10;
          // Exclaim sprites only disappear when couples are standing together
          if (person4Move >= 370) {
            person3Exclaim.remove();
            couple3Done = true;
          }
        }
      }
    }

    // Exit sign appears when all couples have been pushed together
    if ( (couple1Done) && (couple2Done) && (couple3Done) ) {
      exitActive = true;
      image(hetExit, 50, 50);
      rectTop.setCollider('rectangle', 0, 0, 0, 0);
    }

    // Draw sparkles
    image(hetDetail, 0, 0 + detailMove);

    // Make sparkles and bubbles in hetDetail bounce
    if (detailMove > 10) {
      detailSpeed = -.2;
    }

    if (detailMove < 0) {
      detailSpeed = .2;
    }

    detailMove = detailMove + detailSpeed;

    // The interact button will only prompt if you are overlapping with the hetero couple
    // Once you interact with them, the button diappears so you can click on the text window
    if( (playerSprite.overlap(hetSprite)) && (!interactHetCouple) ) {
      interactButton.locate(playerSprite.position.x - 40, playerSprite.position.y - 140);
      interactButton.draw();
    }

    // If you interact with the hetero couple, the text window appears
    if( (interactHetCouple) && (!exitActive) ) {
      textWindow.draw();
    }
  }
}

class WhiteRoom extends PNGRoom {
  preload() {
    // Load white room assets
    whiteDetail = loadImage('assets/whiteroom/details.png');
    whiteDialogue1 = loadImage('assets/whiteroom/dialogue1.png');
    whiteDialogue2 = loadImage('assets/whiteroom/dialogue2.png');
    whiteDialogue3 = loadImage('assets/whiteroom/dialogue3.png');
    whiteFin = loadImage('assets/whiteroom/fin.png');
    whiteHearts = loadImage('assets/whiteroom/floatyhearts.png');
    whitePortrait1 = loadImage('assets/whiteroom/portrait1.png');
    whitePortrait2 = loadImage('assets/whiteroom/portrait2.png');
    whitePortrait3 = loadImage('assets/whiteroom/portrait3.png');
    whiteCoupleDead = loadImage('assets/whiteroom/coupledead.png');
  }

  draw() {
    super.draw();
    makeCollisions();
    resetCollisions();
    hetRoomActive = false;
    whiteRoomActive = true;

    // Allow sprite to walk through from the bottom
    rectBottom.setCollider('rectangle', 0, 0, 0, 0);

    // Draw lesbian sprite
    drawSprite(lesbianSprite);

    // Draw portraits of white women
    image(whitePortrait1, 90, 300);
    image(whitePortrait2, 40, 80);
    image(whitePortrait3, 950, 200);

    // When dialogue is over, skull appears to kill the lesbian's lover
    if (deathOpen) {
      drawSprite(whiteSkull);
      if ( playerSprite.overlap(whiteSkull) ) {
        whiteSkull.remove();
        deathHappened = true;
      }
    }

    // When skull icon is collected, sprite is removed and replaced with image of lesbian alone
    if (deathHappened) {
      lesbianSprite.remove();
      image(whiteCoupleDead, width/2 - whiteCoupleDead.width / 2, height/2 - whiteCoupleDead.height / 2);
      finActive = true;
    }

    // When lesbian is dead, "fin" paper appears and collider is removed on the right
    if (finActive) {
      image(whiteFin, 1000, 50);
      rectRight.setCollider('rectangle', 0, 0, 0, 0);
    }

    // Draw hearts around sprites that wiggle left to right
    image(whiteHearts, width/2 - 200 + detailMove, height/2 - 300);

    // Draw sparkles
    image(whiteDetail, 0, 0 + detailMove);

    // Make sparkles and bubbles in whiteDetails bounce
    if (detailMove > 10) {
      detailSpeed = -.2;
    }

    if (detailMove < 0) {
      detailSpeed = .2;
    }

    detailMove = detailMove + detailSpeed;

    // The interact button will only prompt if you are overlapping with the lesbians
    // Once you interact with them, the button diappears so you can click on the text window
    if( (playerSprite.overlap(lesbianSprite)) && (!interactLesbians) ) {
      interactButton.locate(playerSprite.position.x - 40, playerSprite.position.y - 140);
      interactButton.draw();
    }

    // If you interact with the lesbians, the text window appears
    if( (interactLesbians) && (!finActive) ) {
      textWindow.draw();
    }
  }
}

class EvilRoom extends PNGRoom {
  preload() {
    // Load evil room assets
    evilDetail = loadImage('assets/evilroom/details.png');
    evilBlood = loadImage('assets/evilroom/bloodspatter.png');
    evilBlood1 = loadImage('assets/evilroom/bloodspatter1.png');
    evilBlood2 = loadImage('assets/evilroom/bloodspatter2.png');
    evilBlood3 = loadImage('assets/evilroom/bloodspatter3.png');
    evilDialogue1 = loadImage('assets/evilroom/dialogue1.png');
    evilDialogue2 = loadImage('assets/evilroom/dialogue2.png');
    evilDialogue3 = loadImage('assets/evilroom/dialogue3.png');
    evilExit = loadImage('assets/evilroom/exittriangle.png');
    evilGate = loadImage('assets/evilroom/gate.png');
  }

  draw() {
    super.draw();
    makeCollisions();
    resetCollisions();
    whiteRoomActive = false;
    evilRoomActive = true;

    // Allow sprite to walk through from the left
    rectLeft.setCollider('rectangle', 0, 0, 0, 0);

    // Draw evil sprite
    drawSprite(evilSprite);

    // Draw blood spatter
    image(evilBlood, 90, 200);
    image(evilBlood1, 90, 450);
    image(evilBlood2, 40, 80);
    image(evilBlood3, 1000, 400);

    // When the third dialogue is prompted, the key is displayed and the cell gate appears
    if (keyOpen) {
      gateX = -1000;
      gateY = 30;
      image(evilGate, gateX + gateMove, gateY);
      drawSprite(evilKey);
      if ( playerSprite.overlap(evilKey)) {
        evilKey.remove();
        gateMoving = true;
      }
    }

    // When the player overlaps with the key, the gate will move with the player
    // The gate stops moving when the player reaches the lock on the other side of the room
    if (gateMoving) {
      drawSprite(evilLock);
      gateMove = playerSprite.position.x;
      if ( playerSprite.overlap(evilLock)) {
        evilLock.remove();
        gateMoving = false;
        gateClosed = true;
      }
    }

    // When the gate is fully closed, the exit sign appears
    if (gateClosed) {
      evilExitActive = true;
    }

    // Draw sparkles
    image(evilDetail, 0, 0 + detailMove);

    // Make sparkles and bubbles in evilDetail bounce
    if (detailMove > 10) {
      detailSpeed = -.2;
    }

    if (detailMove < 0) {
      detailSpeed = .2;
    }

    detailMove = detailMove + detailSpeed;

    // Draw exit triangle when activated and remove collider on top
    if (evilExitActive) {
      image(evilExit, 900, 10);
      rectTop.setCollider('rectangle', 0, 0, 0, 0);
    }

    // The interact button will only prompt if you are overlapping with the villain
    // Once you interact with them, the button diappears so you can click on the text window
    if( (playerSprite.overlap(evilSprite)) && (!interactEvil) ) {
      interactButton.locate(playerSprite.position.x - 40, playerSprite.position.y - 140);
      interactButton.draw();
    }

    // If you interact with the villain, the text window appears
    if( (interactEvil) && (!evilExitActive) ) {
      textWindow.draw();
    }
  }
}

class EndRoom extends PNGRoom {
  preload() {
    // Load end room assets
    endMirrorLayer = loadImage('assets/end/mirrorlayer.png');
    endMirrorLine = loadImage('assets/end/mirrorline.png');
    endMirrorBlur = loadImage('assets/end/mirrorblur.png');
    endDialogue1 = loadImage('assets/end/endtext1.png');
    endDialogue2 = loadImage('assets/end/endtext2.png');
    endDialogue3 = loadImage('assets/end/endtext3.png');
    endDialogue4 = loadImage('assets/end/endtext4.png');
    endDialogue5 = loadImage('assets/end/endtext5.png');
    endComplete = loadImage('assets/end/complete.png');
  }

  draw() {
    super.draw();
    makeCollisions();
    resetCollisions();
    evilRoomActive = false;
    endRoomActive = true;

    // Allow sprite to walk through from the bottom
    rectBottom.setCollider('rectangle', 0, 0, 0, 0);

    // Only allow Sprite to walk up to mirror
    rectTop.setCollider('rectangle', 0, 500, width*2, 1);

    // Mirror sprite is drawn underneath the mirror layer
    // Always appears 200 pixels above the MC sprite
    drawSprite(mirrorSprite);
    mirrorSprite.position.x = playerSprite.position.x;
    mirrorSprite.position.y = playerSprite.position.y - 200;

    // Add in mirror details on top and the mirror layer so mirror sprite is hidden
    image(endMirrorBlur, width/2 - endMirrorBlur.width/2, height/2 - endMirrorBlur.height/2);
    image(endMirrorLayer, 0, 0);
    image(endMirrorLine, width/2 - endMirrorLine.width/2, height/2 - endMirrorLine.height/2);

    // When player approaches the mirror, interaction button prompts
    if( (playerSprite.position.y < 600) && (playerSprite.position.x > 450)  
      && (playerSprite.position.x < 800) && (!gameOver) && (!interactMirror) ) {
      interactButton.locate(playerSprite.position.x - 40, playerSprite.position.y - 140);
      interactButton.draw();
    }

    // If interaction button is pressed, but game isn't over yet
    if( (interactMirror) && (!gameOver) ) {
      textWindow.draw();
    }

    // When the dialogue is completed, game will end by prompting "game completed" text
    if(gameOver) {
      image(endComplete, width/2 - endComplete.width/2, endComplete.height/2 + 200);
    }
  }
}
