var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var characters, phoenix, raze, reyna;

var track, c1_img, c2_img, c3_img;

function preload(){
  track = loadImage("bj.jpg");
  c1_img = loadImage("phoenix.png");
  c2_img = loadImage("Raze.png");
  c3_img = loadImage("REYNA.png");
  bg=loadImage("track.jpg")
  
}

function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  background(track)
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 3){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
