
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,groundImage;
var sprite_1,sprite_2,sprite_3,sprite_4,sprite_5,sprite_6,sprite_7,sprite_8;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
   var message = "This is a message";
 console.log(message)
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.5;

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
}


function draw(){

   if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        monkey.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
}
   spawnClouds();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
}

 else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
       if(mousePressedOver(restart)) {
      reset();
   
  
  
  }
     //change the monkey animation
    monkey.changeAnimation("collided", trex_collided);
    
     
     
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
    
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
       
   }
  
 
  
  monkey.collide(invisibleGround);
  
  


  drawsprites();


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(sprite_1);
              break;
      case 2: obstacle.addImage(sprite_2);
              break;
      case 3: obstacle.addImage(sprite_3);
              break;
      case 4: obstacle.addImage(sprite_4);
              break;
      case 5: obstacle.addImage(sprite_5);
              break;
      case 6: obstacle.addImage(sprite_6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

