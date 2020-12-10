
// game
//declaring variables

var PLAY = 1;
var END = 0;
var gameState = PLAY

var number = 0;


var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacles;

var gameOver;
var score=0;

var monkey_collided;

function preload(){
  
  //loading Animation
  backImage=loadImage("Forest.jpeg");
 
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstacles = loadImage("obstacle.png"); 
  
  coinse = loadImage("coins.png");
  coinsBag = loadImage("coinsBag.png");
  
  gameOver = loadImage("gameOver.png");
  restart = loadImage("restart.png");
}

function setup() {
  //boundary
  createCanvas(800,400);
  
  //background animation
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  
  // monkey Animation
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.1;
  
  
  reGame = createSprite(315, 280, 20, 20); 
  reGame.addImage(restart);
  reGame.scale = 0.2
  reGame.visible = false;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  gameFinish = createSprite(300, 180, 20, 20);
  gameFinish.addImage(gameOver);
  gameFinish.visible = false;
  

  coinsbg = createSprite(400, 50, 20, 20);
  coinsbg.addImage(coinsBag);
  coinsbg.scale = 0.1;
   
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
     coinsGroup = new Group();
  
  score = 0;
//monkey.setColider = true;
  obstaclesGroup.debug = true;
 number = 0;
 
}

function draw() {
  
  background(255);

  
  if(gameState===PLAY){
   
    gameFinish.visible = false;
    reGame.visible = false;
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    if(coinsGroup.isTouching(monkey)){
      coinsGroup.destroyEach();
      number = number+1;
   
    }
  
    if(keyDown("space") && monkey.y>=170 ){
    monkey.velocityY = -12;
    }
    
   monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();
    spawnCoins();
 
    if(obstaclesGroup.isTouching(monkey)){ 
        gameState=END
    }
  }
     
  else if (gameState === END) {
    gameFinish.visible = true;
    reGame.visible = true;
     
     //set velcity of each game object to 0
  backgr.velocityX = 0;
    ground.velocityX = 0;
   monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    coinsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    coinsGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("collided",monkey_collided);
    
    if(mousePressedOver(reGame)){
        reset();
      }
      
     
    }
  
   drawSprites();
  
  stroke("white");
  textSize(30);
  fill("white");
  text("Energy: "+ score, 500,50);
  
  stroke("white");
  textSize(40);
  fill("white");
  text(number+number, 430, 50);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("A GAME BY AMOGH P KAUSHIK", 10, 50);
  
 
}


function reset(){
  score = 0;
  gameState=PLAY;
  
  gameOver.visible = false;
  reGame.visible = false;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  coinsGroup.destroyEach();
 backgr.velocityX=-4;
   monkey.changeAnimation("Running",monkey_running);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 250;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(800,330,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacles);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   obstacle.depth =    monkey.depth
   monkey.depth=monkey.depth+6;
      console.log(obstacle.depth);
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    
   
  }
}

function spawnCoins() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var coin = createSprite(700,250,40,10);
    coin.y = random(120,200);    
    coin.addImage(coinse);
    coin.scale = 0.05;
    coin.velocityX = -5;
     //assign lifetime to the variable
    coin.lifetime = 300;
    monkey.depth = coin.depth + 1;
    
    //add each banana to the group
    coinsGroup.add(coin);
  }
}
