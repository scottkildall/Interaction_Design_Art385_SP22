/*
  Random Selector
  by Scott Kildall
  
 Choose a random students name and display it for presentation
  
  Improvements/problems
    * Right now this is cloned from RandomPartners, so has the same floating code in it and same fucntionality
    
    
*/

var names = ["Matt", "Kiana", "Ty"];
var x = [];
var y = [];

var rouletteOn = false;
var rouletteCounter = 0;
var rouletteMax = 90;
var numChosen = 0;


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

  fill(255);
  for( let i = 0; i < names.length; i++ ) {
    //console.log("x = " + x[i]);
    text( names[i], x[i], y[i]);
  }
}

function keyPressed() {
  if( key === ' ' ) {
    if( rouletteOn === false ) {
      rouletteMax = 90 + random(10,100);
      rouletteCounter = 0;
      rouletteOn = true;
    }
    numChosen++;
  }
}

function initializeArrays() {
  doRandomSeed();

  for( let i = 0; i < names.length; i++ ) {
    x.push(random(100,width-100));
    y.push(random(100,height-100));
  }
}

// Seed random numbers from seconds * milliseconds of current time
function doRandomSeed() {
  var today = new Date();
  var time = today.getSeconds() * today.getMilliseconds();
  randomSeed(time);
}




// //-- array of names, change numNames and addName() below if students are absent
// int numStudents = 16;      // array sizes
// int numNames = 0;              // number actually added
// DisplayName [] names;
// boolean [] bSelected;

// int rouletteNameIndex = -1;      // set to -1 if we are not using

// // array-shuffling
// IntList connections;


  
// void setup() {
 
//   // create your fonts
//   bigFont = createFont("Helvetica",36,true); 
//   smallFont = createFont("Helvetica",24,true); 
  
//   textFont(bigFont);
  
//   connections = new IntList();
//   initializeNames();
  
//   //-- this shuffles our array, for the randomizer
//   connections.shuffle();
// }


// void draw() {
//   // background for the screen, 0-255 grayscale or an (r,g,b) color
//   background(0);
  
//   // font and fill color
//   textFont(smallFont);       

//   // draw all names in white, check for roulette wheel
  
//   for( int i = 0; i < numNames; i++ ) {
//     // unselected, draw in white
//     if( i != rouletteNameIndex ) {
//       textFont(smallFont);
      
//       // unselected = white, selected = gray
//       if( bSelected[connections.get(i)] )
//          fill(100);
//       else
//         fill(255);
      
//       names[connections.get(i)].draw();
//     }
      
//     // is current selection, draw in white
//     else {
//       textFont(bigFont); 
//       fill(240,120,0);
//       names[connections.get(rouletteNameIndex)].draw();
//     }  
//   }
  
//   //-- spin roulette wheel
//   if( bRouletteOn == true ) {
//     nextRouletteName();
    
//     delay(delayTime);
    
//     // add some randomness here
//     delayTime = delayTime + (int)random(10,12);
//     if( delayTime > random(350,400) ) {
//       bRouletteOn = false;
//     }
//   }
// }

// // SPACEBAR turns on the roulette wheel
// void keyPressed() {
//   if( key == ' ' ) {
//     if( bRouletteOn == false ) {
//       delayTime = 100;
//       bRouletteOn = true;
//       println("turning on roulette");
      
//       if( rouletteNameIndex != -1 ) {
//          bSelected[connections.get(rouletteNameIndex)] = true; 
//       }
//     } 
//   }
// }

// //-- go through all students in list, comment out if people aren't here
// //-- also set array of bSelected to false
// //-- note: there is a better way!
// void initializeNames() {
//   names = new DisplayName[numStudents];
//   bSelected = new boolean[numStudents];
    
//   addName("Alvin");
//   addName("Ashley");
//   addName("DJ");
//   addName("Graham");
//   addName("Jake");
//   addName("Jeffrey");
//   addName("Journ");
//   addName("Juliet");
//   addName("Kara");
//   addName("Lauren");
//   addName("My");
//   addName("Natalie");
//   addName("Reilly");
//   addName("Taylor");
//   addName("Toff");
//   addName("Tommy");
// }

// void addName(String s) {
//   // for the connections, a shuffled list
//   connections.append(numNames);
  
//   names[numNames] = new DisplayName(s);
//   bSelected[numNames] = false;
  
//   numNames++;
// }

// void nextRouletteName() {
//   if( areAllSelected() ) {
//     bRouletteOn = false;
//     rouletteNameIndex = -1;
//   }
  
//   rouletteNameIndex++;
  
//   if( rouletteNameIndex == numNames )
//    rouletteNameIndex = 0;
   
 
//   while( bSelected[connections.get(rouletteNameIndex)] == true ) {
//     rouletteNameIndex++;
//     if( rouletteNameIndex == numNames )
//      rouletteNameIndex = 0;
  
//      println("skip"); 
//   }
// }

// boolean areAllSelected() {
//   for( int i = 0; i < numNames; i++ ) {
//      if( bSelected[i] == false )
//        return false;
//   }
  
//   return true;
// }
