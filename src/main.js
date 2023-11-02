// Exercise 01: Normalized Movement
// Name: Edwin Fong
// Date: 10/20/23

// Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites

"use strict"

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    width: 1280,
    height: 720,
    scene: [ Play ],
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

let spaceBar;
let keyUP;
let groundLevel = height  - 150;
let centerX = game.config.width/2;
let velocity = 450;
let skySpeed = 3;
let buildingSpeed = 1;
