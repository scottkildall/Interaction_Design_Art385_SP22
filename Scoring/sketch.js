/************************************************************************************
 * 
 * Scoring: by Scott Kildall
 *  Maps 
 * 
 *************************************************************************************/

// Array of scores
// these const values aren't used in this code, but they should give an idea of the framework
// 0-100
var scores = [];
const gradStudent = 1;
const singleMother = 2;
const elder = 3;
const engineer = 4;
const highSchoolStudent = 5;

// booleans to toggle displays
var displayPecentages = true;
var displayHorizontalBars = true;
var displayVerticalBars = false;
var displayStars = false;
var starOffset = 700;
var starHSpacing = 100;
var starVSpacing = 50;

// our star image
var fullStarImg;

// Display globals
var xLeftMargin = 50;     // for percentages
var xBarOffset = 30;
var yTopMargin = 50;
var yOffset = 50;
var barWidth = 30;
var barSpacing = 50;

function preload() {
  fullStarImg = loadImage("assets/fullStar.png");
}

// Setup code goes here
function setup() {
  createCanvas(1280, 720);

  initializeScores();
 }


// Draw code goes here
function draw() {
  background(0);

  // Show various displays
  if( displayPecentages ) {
    drawPercentages();
  }
  if( displayHorizontalBars ) {
    drawHorizontalBars();
  }
  if( displayVerticalBars ) {
    drawVerticalBars();
  }

  // not yet implemented
  if( displayStars ) {
     drawStars();
   }

  // Display Instructions
  fill(255)
  textSize(14);
  textAlign(CENTER);
  text("Click on mouse to randomly change scores", width/2, height-50);
  text("Press [1], [2], [3] or [4] to toggle displays", width/2, height-25);
}

 // Mouse will change
function mousePressed() {
  for( let i = 0; i < scores.length; i++ ) {
    scores[i] += random(-5,5);

    // keep within 0-100
    scores[i] = constrain(scores[i],0,100); 
  }
}

function keyPressed() {
  if( key === '1' ) {
    displayPecentages = !displayPecentages;
  }
  if( key === '2' ) {
    displayHorizontalBars = !displayHorizontalBars;
  }
  if( key === '3' ) {
    displayVerticalBars = !displayVerticalBars;
  }
  if( key === '4' ) {
    displayStars = !displayStars;
  }
}

function drawHorizontalBars() {
  fill(240,0,120);
  
  rectMode(CORNERS);
  
  let xPos = xLeftMargin + xBarOffset;
  let yPos = yOffset - barWidth + 8;
  for( let i = 0; i < scores.length; i++ ) {
    // map to pixels
    let mappedValue =  map(scores[i],0,100,0,1200);
    rect(xPos, yPos + (i*barSpacing),xPos + mappedValue ,yPos+ barWidth + (i*barSpacing));

  }
}

function drawStars() {
  imageMode(CORNERS);
  
  let yPos = height/2;

  for( let i = 0; i < scores.length; i++ ) {
    let numStars = scores[i]/20;
    drawStarPNGS( numStars, yPos + (i*starVSpacing));
  }
}

function drawStarPNGS(numStars, yPos) {
  imageMode(CENTER);
  for( let i = 0; i < numStars; i++ ) {
    image(fullStarImg, starOffset + (i*starHSpacing), yPos);
  }
}

function drawVerticalBars() {
  fill(120,240,120);
  
  rectMode(CORNERS);
  
  let xPos = xLeftMargin;
  let yPos = height-100;
  for( let i = 0; i < scores.length; i++ ) {
    let mappedValue =  map(scores[i],0,100,0,400);
    rect(xPos + (i*barSpacing), yPos, xPos+barWidth + (i*barSpacing), yPos-mappedValue,);
  }
}

function drawPercentages() {
  fill(128);
  textSize(20);
  for( let i = 0; i < scores.length; i++ ) {
    text( Math.round(scores[i]) + "%", xLeftMargin, yTopMargin + (i*yOffset));
  }
}

function initializeScores() {
  scores = [50,50,50,50,50];
  console.log(scores);
}

