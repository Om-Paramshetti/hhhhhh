//makes all the varibles for the game
var player,coinsGroup,wallsGroup;
var o;
var start = 1,play = 2,end = 0;
var gameState = start;
var coins = 0;

function setup() {
  //creates the canvas
  createCanvas(600, 400);
  
  //creates the egde sprites
  edges = createEdgeSprites();
  
  //creates the black outline
  o = createSprite(300,380,24,24);
  o.shapeColor = "black";
  
  //creates the player
  player = createSprite(300,380,20,20);
  player.shapeColor = "white";
  
  //creates the groups
  wallsGroup = new Group();
  coinsGroup = new Group();
}

function draw() {
  background("lightblue");
  //makes the outline follow the player
  o.y = player.y;
  o.x = player.x;
  
  //makes the player collide with the walls
  player.collide(wallsGroup);
  
  if(gameState === start){
      //makes the start text
      textSize(20);
      fill("green");
      text("Press [Space] to start",width/2-30,height/2);
      //makes the game playable
      if(keyDown("space")){
        gameState = play;
      }
    }
  
    if(gameState === play){
      //creates the walls & coins
      walls();
      coin();
      
      //makes the player collide with the edges 0,1,2
      player.collide(edges[0]);
      player.collide(edges[1]);
      player.collide(edges[2]);
      
      //creates the coincounter
      textSize(20);
      fill("white");
      strokeWeight(5);
      stroke(0);
      text("Coins : " + coins,50,50);
      
      //increses the coincounter
      if(coinsGroup.isTouching(player)){
        coins = coins + 1;
        coinsGroup.destroyEach();
      }

      //allows the player to move
      if (keyDown(LEFT_ARROW)) {
        player.x = player.x - 6;
      }
      if (keyDown(RIGHT_ARROW)) {
        player.x = player.x + 6;
      }
      
      //allows the player ro jump
      if(keyDown("space") /*&& player.y >= 159*/) {
        player.velocityY = -12 ;
      }
      //adds gravity
      player.velocityY = player.velocityY + 0.8;
        
      //makes the player die
      if(player.isTouching(edges[3])){
        gameState = end;
      }
    
  }
  if(gameState === end){
    //destroys the walls & coins
    wallsGroup.destroyEach();
    coinsGroup.destroyEach();
    
    //makes the game over text
    textSize(20);
    fill("red");
    text("Game Over!",width/2,height/2);
    text("press 'r' to restart",width/2-15,height/2+25);
    text("Coins : " + coins,width/2,height/2+25*2);
    
    //makes the player stop moving
    player.velocityY = 0;
    
    //resets the game
    if(keyDown('r')){
      reset();
    }
  }
  //draws the sprites
  drawSprites();
}
function walls(){
  if (frameCount % 60 === 0) {
    //create the wall
    var wall = createSprite(600,120,200,50);
    wall.shapeColor = "white";
    wall.x = Math.round(random(20,560));
    wall.scale = 0.5;
    wall.velocityY = 3;
    
     //assign lifetime to the variable
    wall.lifetime = 200;
    
    
    //add each wall to the group
    wallsGroup.add(wall);
    
  }
}
//function for reset
function reset(){
  gameState = start;
  player.y = 380;
  coins = 0;
}

//function for coins
function coin(){
  if(frameCount % 120 === 0){
    var coin = createSprite(600,120,50,50);
    coin.shapeColor = "yellow";
    coin.x = Math.round(random(20,560));
    coin.scale = 0.5;
    coin.velocityY = 3;
    
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    
    //add each coin to the group
    coinsGroup.add(coin);
  }
}