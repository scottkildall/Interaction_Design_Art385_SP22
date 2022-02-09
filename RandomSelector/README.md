## RandomSelector
#### by Scott Kildall
#### February 9 2021


### Overview
Using a hardcoded array of the first names of all the students in a class, this
(1) generate random (x, y) locations for all the text and then draw them on the screen
(2) Do a roulette-style random student selection when you press the SPACE BAR
(3) Display the next selected student


### Technical Details

Uses the current seconds + time as the random seed
Generates an array of x and y values based on the the length of the students array
