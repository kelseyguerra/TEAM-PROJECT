# _Get to the Crapper!_

#### _Epicodus Team Project - Intro - Week 5, April 9, 2018_

#### _Collaborators_

* Mike Chu
* Kayl Eubanks
* Kelsey Guerra
* Nicholas Kardish
* Susan Southall

## Description

 A quirky top-down and turn-based 2D game. The player must navigate obstacles and reach a toilet in time to avoid an embarrassing accident.

## Specifications

|Program Behavior|Input |Output|
|----------------|------|------|
|**Player Control:** Given player coordinates (0,0), updates player's x-coordinate by one unit when horizontal movement is initiated.|"Right"|(1,0)|
|**Player Control:** Given player coordinates (1,0), updates player's y-coordinate by one unit when vertical movement is initiated.|"Down"|(1,1)|
|**Player Control:** Given player coordinates (0,0), prevents player movement past limit of coordinate system.|"Up"|(0,0)|
|**NPC Random Pattern:** Given non-player coordinates (2,2), randomly automates non-player coordinates by one unit after player movement is initiated.|Player Moves.|(2,3)|
|**NPC Horizontal Pattern:** Given non-player coordinates (2,2), updates non-player coordinates by one horizontal unit after player movement is initiated.|Player Moves.|(3,2)|
|**NPC Horizontal Pattern:** Given non-player character has reached the rightward-limit of coordinate system at coordinates (0,5), changes non-player horizontal direction leftward after player movement is initiated.|Player Moves.|(0,4)|
|**NPC Vertical Pattern:** Given non-player coordinates (2,2), updates non-player coordinates by one vertical unit after player movement is initiated.|Player Moves.|(2,3)|
|**NPC Vertical Pattern:** Given non-player character has reached the upward-limit of coordinate system at coordinates (5,0), changes non-player vertical direction downward after player movement is initiated.|Player Moves.|(5,1)|
|**Game Status:** Executes losing condition when player and non-player entities occupy the same coordinates.|Player (x,y) = Non-Player (x,y)| Game Over|
|**Game Status:** Given movement turn counter of "10," counter decreases by 1 after each player movement.|Player Moves.|Turns = 9|
|**Game Status:** Executes losing condition when movement turn counter reaches 0.|Turns = 0 | Game Over|
|**Game Status:** Executes winning condition when player entity occupies the same coordinates as toilet entity|Player (x,y) = Toilet (x,y)|Player Wins|

## Setup/Installation Requirements

1. Visit website link: **Currently Not Available.**

## Known Bugs

None.

## Support and Contact

Please send comments and questions to Mike Chu at mcihkue@gmail.com.

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* jQuery

### License

_GPL_

Copyright (c) 2018 **Mike Chu, Kayl Eubanks, Kelsey Guerra, Nicholas Kardish & Susan Southall**
