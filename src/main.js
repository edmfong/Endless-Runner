// Exercise 01: Normalized Movement
// Name: Edwin Fong
// Date: 10/20/23

// Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites

"use strict"

let config = {
    parent: 'phaser-game',
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
    backgroundColor: '#9c3c37',
    scene: [ Load, Menu, Instructions, Credits, Play, GameOver ],
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config

let spaceBar;
let keyUP;
let keyR;
let groundLevel = height  - 190;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let velocity = 450;
let skySpeed = 3;
let buildingSpeed = 1;
let gameOver = false;
let killedBy;
