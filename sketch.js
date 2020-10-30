var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,groundImage;
var collider; 
var steve,steve_running,steveImage;
var creeper,creeperImage,creeperGroup;
var cactus,cactus1,cactus2,cactus3,cactusGroup;
var gameover,gameoverImg;
var restart,restartImg;
var touches;

function preload(){

  groundImage = loadImage("ground.png");
  
  steve_running = loadAnimation("1.png","2.png","3.png","4.png","5.png","6.png");
  
  creeperImage = loadImage("creeper.png")
  
  cactus1 = loadImage("cactus.png");
  cactus2 = loadImage("cactus2.png");
  cactus3 = loadImage("cactus3.png");
  
  gameoverImg = loadImage("gameover.png")
  
  restartImg = loadImage("restart.png")
  
}

function setup() {
  createCanvas(600,300);
 
  ground = createSprite(300,150);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 1.3
  ground.velocityX = -6;
  
  
  collider = createSprite(100,242,500,10);
  
  steve=createSprite(220,190)
  steve.addAnimation("running",steve_running)
  steve.scale = 0.4
  
  creeperGroup=new Group();
  cactusGroup = new Group();
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg)
  gameover.scale=0.3
  
  restart = createSprite(300,180);
  restart.addImage(restartImg)
  restart.scale=0.07
  
}

function draw() {
 background(240)
  
  gameover.visible = false;
  
  console.log (steve.y)
  
  restart.visible = false;
  
  if(gameState===PLAY){
  
    if (ground.x < 0){
        ground.x = ground.width/2;
      } 

    collider.visible = false

    steve.collide(collider)

    spawn_creeper();
    spawn_cactus();

    if(keyDown("space")  || touches.length>0 && steve.y>191){
      steve.velocityY = -13
      touches=[]
    }
    steve.velocityY = steve.velocityY +0.8

    if(steve.isTouching(creeperGroup) || steve.x<0){
      gameState = END
    }
    
    if(steve.isTouching(cactusGroup)){
      steve.velocityX = -6;
    }
  }

  if(gameState===END){
    gameover.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    cactusGroup.setVelocityXEach = 0;
    steve.velocityX = 0;
    if(keyDown("r") || mousePressedOver(restart) && gameState ===END ){
       reset();
      }
    }
  
    drawSprites();
}
  
function spawn_creeper(){
  if(frameCount%1 == 0){
      creeper=createSprite(30,195)
      creeper.addImage(creeperImage)
      creeper.velocityX = 0;
      creeper.scale = 0.125;
      creeper.lifetime = 10
      //creeper.debug=true
      creeper.setCollider("circle",0,0,20)
      creeperGroup.add(creeper)
    }
}
function spawn_cactus(){
  if(frameCount%100 == 0){
  var cactus = createSprite(600,205,10,40);
    cactus.setCollider("circle",0,0,130)
    cactus.velocityX = -6;
    cactus.addImage(cactus1)
    cactus.scale = 0.17
    cactusGroup.add(cactus)
  }
}

function reset(){
  gameState = PLAY;
  ground.velocityX = -6;
  steve.x = 221
  steve.y = 196
}