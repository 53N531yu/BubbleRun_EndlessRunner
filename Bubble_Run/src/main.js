// Oscar Tiong
// Bubble Run
// Hours spent : 

/* Creative tilt (Aethestics):
- This is an endless runner set in a world that is powered by classical music. 
- The game takes place in the romantic caves, one of the many areas of this world.
- Run across this dreamy cave, which formed by the romantic motives seen in the music of multiple composers.
*/

/* Creative tilt (Technicalities)
- There are bounce pads in the game that make you jump automatically
*/
// Original: 4/20/17 (Phaser CE version)
// Updated: 5/1/23 (Phaser 3.55)

// keep me honest
'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 768,
    width: 1024,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

// uncomment the following line if you need to purge local storage data
//localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let paddle = null;
const paddleWidth = 16;
const paddleHeight = 128;
const paddleVelocity = 150;
let level;
let highScore;
let newHighScore = false;
let cursors;