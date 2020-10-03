var sword,swordImage;
var fruit,fruit1,fruit2,fruit3,fruit4;
var fruitGroup;
var alien,alienImage,alien_moving;
var alienGroup;
var score;
var PLAY=1;
var END=0;
var gameState=1;
var gameOver,gameOverImg;
var swooshSound,gameoverSound;

function setup() {
  createCanvas(400, 400);
  //creating sword or knife
  sword=createSprite(200,350,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
//adding scores
 score=0;

//creating the groups
  alienGroup= new Group();
  fruitGroup= new Group();
}

function preload(){
//loading images
  swordImage=loadImage("sword.png");
alienImage=loadAnimation("alien1.png","alien2.png");
fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  gameOverImg=loadImage("gameover.png");
  swooshSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
}
function draw() {
  background(220);
  //displaying score
  text("score : " + score,300,50);
  //spawning the alien
  enemy();
  //spawn fruits
  spawnfruits();
  //making the sword move
  sword.x=World.mouseX;
  if(gameState===PLAY){
   
    
    if(fruitGroup.isTouching(sword)){
   fruitGroup.destroyEach();
   score=score+2;
  swooshSound.play();
  } 
    if(alienGroup.isTouching(sword)){
    gameState=END;
      gameoverSound.play();
  }
  
  }
  else if(gameState===END){  
    sword.addImage(gameOverImg);
    sword.x=200;
    sword.y=200;
    score=0;
    
  } 
  
     drawSprites();
}


function enemy(){
if(World.frameCount%200==0){
//creating the enemy
alien=createSprite(200,150,30,30);
//adding animtion to the alien
  alien.addAnimation("alien_moving",alienImage);
//spwaning the alien randomly 
  alien.y=Math.round(random(100,300));
alien.velocityY=(8+(score/10));
alien.setlifetime=50;

alienGroup.add(alien);
}

}

function spawnfruits(){
if(World.frameCount%80===0){
  position=Math.round(random(1,2));
  fruit=createSprite(200,300,20,20);
fruit.scale=0.2;
r=Math.round(random(1,4));
if(r==1){
fruit.addImage(fruit3);
} else if(r==2){ 
fruit.addImage(fruit1);
}else if(r==3){
fruit.addImage(fruit2);
}else{
fruit.addImage(fruit4);

} 
fruit.y=Math.round(random(50,340));
//setting a velocity
 fruit.velocityY=(6+(score/4)); 
  //setting a life time
  fruit.setLifetime=100;
  //spawning the fruits at dife]frent location and place
  if(position==1){
   fruit.x=300;
    fruit.velocityY=(6+(score/4));
  }
  else{
  if(position==2){
    fruit.velocityY=(6+(score/4));
  }
  }
    fruitGroup.add(fruit);
} 
}
  