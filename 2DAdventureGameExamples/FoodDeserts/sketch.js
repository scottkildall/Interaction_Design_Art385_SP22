/************************************************
Food Deserts
  by Fiona Young
Overview
Food Deserts, the interactive game, gives users the
opportunity to navigate around a fictional community
that provides tidbits of information surrounding the
definition, causes, and effects of food deserts. The
ending provides a short demonstration of a solution
for combating the issue, as well as external reads
and assistance.

Notes:
(1) Uses the p5.2DAdventure class by Scott Kildall,
p5.clickable library by Lartu and modified by Scott Kildall,
and p5.play library by Paolo Pedercini (molleindustria).
************************************************/


// Global Variables
 // managers
var adventureManager;
var clickablesManager;
var clickables;

// p5.play
var Cam;
var sizeChange;
var trash;
var plantsB;
var plants3;
var raisedBedsP;
var raisedBedsB;
var raisedBeds3;

var mulishFont;

 // indexes into the clickable array (constants)
const playGameIndex = 0;


// Preload code
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
  
  spriteCamBstand = loadAnimation('assets/camB_stand-01.png', 'assets/camB_stand-14.png');
  spriteCamBwalk = loadAnimation('assets/camB_walk-01.png', 'assets/camB_walk-04.png');
  spriteCamSstand = loadAnimation('assets/camS_stand-01.png', 'assets/camS_stand-14.png');
  spriteCamSwalk = loadAnimation('assets/camS_walk-01.png', 'assets/camS_walk-04.png');
    
  sproutAnimation = loadAnimation('assets/sprout-01.png', 'assets/sprout-03.png');
  tomatoAnimation = loadAnimation('assets/tomato-01.png', 'assets/tomato-04.png');
  carrotAnimation = loadAnimation('assets/carrot-01.png', 'assets/carrot-02.png');
}


// Setup code
function setup() {
  createCanvas(1280, 720);
    
  // setup the clickables
  clickables = clickablesManager.setup();
    
  // create a sprite and the animations
  Cam = createSprite(width/9, height/1.45);
  spriteCamBstand.frameDelay = 6;
  spriteCamBwalk.frameDelay = 4;
  spriteCamSstand.frameDelay = 6;
  spriteCamSwalk.frameDelay = 4;
  Cam.addAnimation('CamBstand', spriteCamBstand);
  Cam.addAnimation('CamBwalk', spriteCamBwalk);
  Cam.addAnimation('CamSstand', spriteCamSstand);
  Cam.addAnimation('CamSwalk', spriteCamSwalk);
    
  // use this to track movement from room to room in adventureManager.draw()
  adventureManager.setPlayerSprite(Cam);
    
  // managing button visibility
  adventureManager.setClickableManager(clickablesManager);
    
  // load the images, go through state and interation tables, etc
  adventureManager.setup();
    
  // set up additional info about p5.clickables
  setupClickables();

  // set up groups for sprites
  trash = new Group();
  plantsB = new Group();
  plants3 = new Group();
  raisedBedsP = new Group();
  raisedBedsB = new Group();
  raisedBeds3 = new Group();

  // PNG overlay for intro on Learning state
  CamIntro = createSprite(255, 145);
  CamIntro.addAnimation('normal', 'assets/CamIntro.png');
    
  // PNG overlay for intro and solutions on SolutionSelect state
  SSIntro = createSprite(200,115);
  SSIntro.addAnimation('normal', 'assets/SSIntro.png');
    
  SolutionBoard = createSprite(1028.5,391.5);
  SolutionBoard.addAnimation('normal', 'assets/SolutionBoard.png');

  // PNG overlay for intro on CGardens state
  CGIntro = createSprite(200,115);
  CGIntro.addAnimation('normal', 'assets/CGIntro.png');

  // PNG overlay for next on CGardens state
  CGNext = createSprite(1098,656);
  CGNext.addAnimation('normal', 'assets/CGNext.png');
    
  // PNG overlay for intro on CGardensP state
  CGPIntro = createSprite(200,115);
  CGPIntro.addAnimation('normal', 'assets/CGPIntro.png');
    
  // PNG overlay for intro on CGardensB state
  CGBIntro = createSprite(200,115);
  CGBIntro.addAnimation('normal', 'assets/CGBIntro.png');
    
  // PNG overlay for intro on Resources state
  RIntro = createSprite(1080, 115);
  RIntro.addAnimation('normal', 'assets/RIntro.png');
    
  // collectables for seeds and trash on CGardens
  seed1 = createSprite(250,250);
  seed1.addAnimation('normal', 'assets/nSeeds.png');
  trash.add(seed1);

  seed2 = createSprite(400,300);
  seed2.addAnimation('normal', 'assets/bSeeds.png');
  trash.add(seed2);

  seed3 = createSprite(450,350);
  seed3.addAnimation('normal', 'assets/gSeeds.png');
  trash.add(seed3);

  seed4 = createSprite(950,600);
  seed4.addAnimation('normal', 'assets/nSeeds.png');
  trash.add(seed4);

  seed5 = createSprite(800,500);
  seed5.addAnimation('normal', 'assets/bSeeds.png');
  trash.add(seed5);

  seed6 = createSprite(1000,600);
  seed6.addAnimation('normal', 'assets/bSeeds.png');
  trash.add(seed6);
    
  trash1 = createSprite(720,250);
  trash1.addAnimation('normal', 'assets/tire.png');
  trash.add(trash1);

  trash2 = createSprite(910,325);
  trash2.addAnimation('normal', 'assets/cans.png');
  trash.add(trash2);

  trash3 = createSprite(1100,375);
  trash3.addAnimation('normal', 'assets/plastic.png');
  trash.add(trash3);

  trash4 = createSprite(1200,425);
  trash4.addAnimation('normal', 'assets/bag.png');
  trash.add(trash4);

  trash5 = createSprite(600,475);
  trash5.addAnimation('normal', 'assets/tire.png');
  trash.add(trash5);

  trash6 = createSprite(550,550);
  trash6.addAnimation('normal', 'assets/cans.png');
  trash.add(trash6);

  trash7 = createSprite(625,625);
  trash7.addAnimation('normal', 'assets/plastic.png');
  trash.add(trash7);

  trash8 = createSprite(900,675);
  trash8.addAnimation('normal', 'assets/bag.png');
  trash.add(trash8);

  // plants in the raised beds CGardenB
  sprout = createSprite(380,555);
  sproutAnimation.frameDelay = 12;
  sprout.addAnimation('sprout', sproutAnimation);
  plantsB.add(sprout);
    
  sprout2 = createSprite(490,555);
  sproutAnimation.frameDelay = 14;
  sprout2.addAnimation('sprout', sproutAnimation);
  sprout2.mirrorX(-1);
  plantsB.add(sprout2);
    
  sprout3 = createSprite(788, 200);
  sproutAnimation.frameDelay = 12;
  sprout3.addAnimation('sprout', sproutAnimation);
  sprout3.mirrorX(-1);
  plantsB.add(sprout3);
    
  sprout4 = createSprite(1154, 376);
  sproutAnimation.frameDelay = 16;
  sprout4.addAnimation('sprout', sproutAnimation);
  plantsB.add(sprout4);
    
  tomato = createSprite(435,544);
  tomatoAnimation.frameDelay = 20;
  tomato.addAnimation('tomato', tomatoAnimation);
  plantsB.add(tomato);
    
  tomato2 = createSprite(706,188);
  tomatoAnimation.frameDelay = 22;
  tomato2.addAnimation('tomato', tomatoAnimation);
  tomato2.mirrorX(-1);
  plantsB.add(tomato2);
    
  tomato3 = createSprite(1124, 364);
  tomatoAnimation.frameDelay = 18;
  tomato3.addAnimation('tomato', tomatoAnimation);
  plantsB.add(tomato3);
    
  carrot = createSprite(828, 197);
  carrotAnimation.frameDelay = 14;
  carrot.addAnimation('carrot', carrotAnimation);
  plantsB.add(carrot);
    
  carrot2 = createSprite(748, 199);
  carrotAnimation.frameDelay = 18;
  carrot2.addAnimation('carrot', carrotAnimation);
  carrot2.mirrorX(-1);
  plantsB.add(carrot2);
    
  carrot3 = createSprite(1091, 376);
  carrotAnimation.frameDelay = 18;
  carrot3.addAnimation('carrot', carrotAnimation);
  carrot3.mirrorX(-1);
  plantsB.add(carrot3);
    
  lettuce = createSprite(1050, 380);
  lettuce.addAnimation('normal', 'assets/lettuce.png');
  plantsB.add(lettuce);

  // plants in the raised beds CGarden3
  sprout5 = createSprite(226, 611);
  sproutAnimation.frameDelay = 12;
  sprout5.addAnimation('sprout', sproutAnimation);
  plants3.add(sprout5);
    
  sprout6 = createSprite(449, 116);
  sproutAnimation.frameDelay = 14;
  sprout6.addAnimation('sprout', sproutAnimation);
  sprout6.mirrorX(-1);
  plants3.add(sprout6);
    
  sprout7 = createSprite(764, 409);
  sproutAnimation.frameDelay = 16;
  sprout7.addAnimation('sprout', sproutAnimation);
  sprout7.mirrorX(-1);
  plants3.add(sprout7);
    
  tomato4 = createSprite(286, 598);
  tomatoAnimation.frameDelay = 22;
  tomato4.addAnimation('tomato', tomatoAnimation);
  plants3.add(tomato4);
    
  tomato5 = createSprite(806, 398);
  tomatoAnimation.frameDelay = 18;
  tomato5.addAnimation('tomato', tomatoAnimation);
  tomato5.mirrorX(-1);
  plants3.add(tomato5);
    
  carrot4 = createSprite(260, 611);
  carrotAnimation.frameDelay = 18;
  carrot4.addAnimation('carrot', carrotAnimation);
  plants3.add(carrot4);
    
  carrot5 = createSprite(555, 117);
  carrotAnimation.frameDelay = 14;
  carrot5.addAnimation('carrot', carrotAnimation);
  carrot5.mirrorX(-1);
  plants3.add(carrot5);
    
  lettuce2 = createSprite(176, 618);
  lettuce2.addAnimation('normal', 'assets/lettuce.png');
  lettuce2.mirrorX(-1);
  plants3.add(lettuce2);

  lettuce3 = createSprite(504, 120);
  lettuce3.addAnimation('normal', 'assets/lettuce.png');
  plants3.add(lettuce3);
    
  lettuce4 = createSprite(864, 415);
  lettuce4.addAnimation('normal', 'assets/lettuce.png');
  lettuce4.mirrorX(-1);
  plants3.add(lettuce4);
    
  // colliders for raised beds on CGardensP
  raisedBed1 = createSprite(192,600);
  raisedBed1.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsP.add(raisedBed1);

  raisedBed2 = createSprite(371,245);
  raisedBed2.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsP.add(raisedBed2);

  raisedBed3 = createSprite(539,421);
  raisedBed3.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsP.add(raisedBed3);

  raisedBed4 = createSprite(788,657);
  raisedBed4.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsP.add(raisedBed4);

  raisedBed5 = createSprite(1070,455);
  raisedBed5.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsP.add(raisedBed5);

  raisedBed6 = createSprite(903,161);
  raisedBed6.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsP.add(raisedBed6);

  raisedBed7 = createSprite(432,600);
  raisedBed7.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsB.add(raisedBed7);

  raisedBed8 = createSprite(774,245);
  raisedBed8.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsB.add(raisedBed8);

  raisedBed9 = createSprite(1096,421);
  raisedBed9.addAnimation('normal', 'assets/raisedBed.png');
  raisedBedsB.add(raisedBed9);

  raisedBed10 = createSprite(228,657);
  raisedBed10.addAnimation('normal', 'assets/raisedBed.png');
  raisedBeds3.add(raisedBed10);

  raisedBed11 = createSprite(830,455);
  raisedBed11.addAnimation('normal', 'assets/raisedBed.png');
  raisedBeds3.add(raisedBed11);

  raisedBed12 = createSprite(500,161);
  raisedBed12.addAnimation('normal', 'assets/raisedBed.png');
  raisedBeds3.add(raisedBed12);
} 


// Draw code
function draw() {
  // draw background rooms
  adventureManager.draw();

  // draw p5.clickables
  clickablesManager.draw();
    
  // no avatar for select screens
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Instructions" ) {
    // responds to keydowns
    moveSprite();
    // this is a function of p5.js, not of this sketch
    drawSprite(Cam);
  }
    
  // setting PNG over player sprite 
  if( adventureManager.getStateName() == "SolutionSelect" ) {
    drawSprite(SolutionBoard);
  }
    
  if( adventureManager.getStateName() == "CGardens" ) {
    drawSprite(CGIntro);
  }
    
  if( adventureManager.getStateName() == "CGardensP" ) {
    drawSprite(CGPIntro);
  }
    
  if( adventureManager.getStateName() == "CGardensB" ) {
    drawSprite(CGBIntro);
  }
    
  if( adventureManager.getStateName() == "CGardens3" ) {
    drawSprite(CGBIntro);
  }
  
  if( adventureManager.getStateName() == "Resources" ) {
    drawSprite(RIntro);
      
    // stylizing the cursor for link hover
    if( (mouseX > 68) && (mouseX < 374) && (mouseY > 235) && (mouseY < 257) ) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
    if( (mouseX > 68) && (mouseX < 378) && (mouseY > 287) && (mouseY < 351) ) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
    if( (mouseX > 68) && (mouseX < 535) && (mouseY > 381) && (mouseY < 403) ) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
    if( (mouseX > 68) && (mouseX < 378) && (mouseY > 432) && (mouseY < 456) ) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
  }
    
//  text("(" + mouseX + ", " + mouseY + ")", 100, height/2);
    
  // collect
  Cam.overlap(trash, collect);
}

// pass to adventure manager to draw/undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f' ) {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }
    
  if( key === 'z' ) {
    adventureManager.keyPressed('z');
  }
}

// set the collected sprite to be removed
function collect(collector, collected) {
  collected.remove();
}

// hyperlink redirection to new tab on Resources
function mousePressed() {
  if( adventureManager.getStateName() == "Resources" ) {
    if( (mouseX > 68) && (mouseX < 374) && (mouseY > 235) && (mouseY < 257) ) {
        window.open('https://foodispower.org/access-health/food-deserts/', '_blank');
    }
    if( (mouseX > 68) && (mouseX < 378) && (mouseY > 287) && (mouseY < 351) ) {
        window.open('https://www.rallyhealth.com/food/do-you-live-in-a-food-desert-8-ways-to-eat-healthy-if-you-do', '_blank');
    }
    if( (mouseX > 68) && (mouseX < 535) && (mouseY > 381) && (mouseY < 403) ) {
        window.open('https://www.usa.gov/food-help', '_blank');
    }
    if( (mouseX > 68) && (mouseX < 378) && (mouseY > 432) && (mouseY < 456) ) {
        window.open('https://www.ers.usda.gov/data-products/food-access-research-atlas/documentation/', '_blank');
    }
  }
}
   

//-------------- SPRITE MOVEMENT  ---------------//

function moveSprite() {
  if(keyIsDown(RIGHT_ARROW)) {
    if( adventureManager.getStateName() == "Learning" | 
      adventureManager.getStateName() == "LearningC" | 
      adventureManager.getStateName() == "Learning2" | 
      adventureManager.getStateName() == "Learning2C" | 
      adventureManager.getStateName() == "SolutionSelect" | 
      adventureManager.getStateName() == "Resources" | 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBwalk');
          Cam.mirrorX(1);
          Cam.velocity.x = 4;
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(1);
      Cam.velocity.x = 4;
    }
  }
  else if(keyIsDown(LEFT_ARROW)) {
    if( adventureManager.getStateName() == "Learning" | 
      adventureManager.getStateName() == "LearningC" | 
      adventureManager.getStateName() == "Learning2" | 
      adventureManager.getStateName() == "Learning2C" | 
      adventureManager.getStateName() == "SolutionSelect" | 
      adventureManager.getStateName() == "Resources" | 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBwalk');
          Cam.mirrorX(-1);
          Cam.velocity.x = -4;
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(-1);
      Cam.velocity.x = -4;
    }
  }
  else if(keyIsDown(DOWN_ARROW)) {
    if( adventureManager.getStateName() == "Learning" | 
      adventureManager.getStateName() == "LearningC" | 
      adventureManager.getStateName() == "Learning2" | 
      adventureManager.getStateName() == "Learning2C" | 
      adventureManager.getStateName() == "SolutionSelect" | 
      adventureManager.getStateName() == "Resources" | 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBstand');
          Cam.mirrorX(0);
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(1);
      Cam.velocity.x = 0;
      Cam.velocity.y = 4;
    }
  }
  else if(keyIsDown(UP_ARROW)) {
    if( adventureManager.getStateName() == "Learning" | 
      adventureManager.getStateName() == "LearningC" | 
      adventureManager.getStateName() == "Learning2" | 
      adventureManager.getStateName() == "Learning2C" | 
      adventureManager.getStateName() == "SolutionSelect" | 
      adventureManager.getStateName() == "Resources" | 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBstand');
          Cam.velocity.y = -0;
        }
    else {
      Cam.changeAnimation('CamSwalk');
      Cam.mirrorX(1);
      Cam.velocity.x = 0;
      Cam.velocity.y = -4;
    }
  }
  else {
    if( adventureManager.getStateName() == "Learning" | 
      adventureManager.getStateName() == "LearningC" | 
      adventureManager.getStateName() == "Learning2" | 
      adventureManager.getStateName() == "Learning2C" | 
      adventureManager.getStateName() == "SolutionSelect" | 
      adventureManager.getStateName() == "Resources" | 
      adventureManager.getStateName() == "End" )
        {
          Cam.changeAnimation('CamBstand');
          Cam.velocity.x = 0;
          Cam.velocity.y = 0;
        }
    else {
      Cam.changeAnimation('CamSstand');
      Cam.velocity.x = 0;
      Cam.velocity.y = 0;
    }
  }
}
 

//-------------- CLICKABLES ---------------//

function setupClickables() {
  // same effects for all clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed; 
  }
}

// cursor change when mouse over
clickableButtonHover = function () {
  cursor(HAND);
}

// removing defaults
clickableButtonOnOutside = function () {
  this.color = "#00000000";
  this.strokeWeight = 0;
  cursor(ARROW);
}

clickableButtonPressed = function() {
  // trigger state change
  adventureManager.clickablePressed(this.name); 
}


//-------------- SUBCLASSES ---------------//

// draws PNG overlay for intro on Learning
class Learning extends PNGRoom {
  draw() {
    super.draw();
    drawSprite(CamIntro);
  }
}

// draws PNG overlay for solution on SolutionSelect
class SolutionSelect extends PNGRoom {
  draw() {
    super.draw();
    drawSprite(SSIntro);
    drawSprite(SolutionBoard);
  }
}

// draws PNG overlay for intro on CGardens
class CGardens extends PNGRoom {
  draw() {
    super.draw();   
    drawSprites(trash);
  }
}
 
// draws PNG overlay for beds on CGardensP
class CGardensP extends PNGRoom {
  draw() {
    super.draw();   
    drawSprites(raisedBedsP);
    Cam.collide(raisedBedsP);
  }
}

// draws PNG overlay for beds on CGardensB
class CGardensB extends PNGRoom {
  draw() {
    super.draw();
    drawSprites(plantsB);
    Cam.collide(plantsB);
    drawSprites(raisedBedsB);
    Cam.collide(raisedBedsB);
  }
}

// draws PNG overlay for beds on CGardensB
class CGardens3 extends PNGRoom {
  draw() {
    super.draw();   
    drawSprites(plants3);
    Cam.collide(plants3);
    drawSprites(raisedBeds3);
    Cam.collide(raisedBeds3);
  }
}