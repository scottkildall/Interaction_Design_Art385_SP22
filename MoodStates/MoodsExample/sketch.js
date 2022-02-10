/*******************************************************************************************************************
    Moods Example
    by Scott Kildall
*********************************************************************************************************************/

var simpleStateMachine;

function preload() {
  simpleStateMachine = new SimpleStateManager("assets/moodStates.csv");
}

// Setup code goes here
function setup() {
  createCanvas(1200, 900);

  simpleStateMachine.setup();
 }


// Draw code goes here
function draw() {
  background(0);
}