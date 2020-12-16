var Raji, bg1, bg2, RajiImg, bg1Img, bg2;

var bgSound, deathSound;

var gameState;

var demonGroup, fireGroup;

var demonImg, wolfImg, demonBossImg, fireImg;

var ground , fireball;

var invisible;

var deadSound;

var score = 0;

function preload() {
  RajiImg = loadImage("Raji-removebg-preview.png");
  bg1Img = loadImage("BG4.png");
  demonImg = loadImage("randomdemon-removebg.png");
  wolfImg = loadImage("Wolf.png");
  demonBossImg = loadImage("finalDemon-removebg.png");
  fireImg = loadImage("fireball-removebg.png");
  
}

function setup() {
  
  //as per bg4
  createCanvas(960, 540);
  
  gameState = "instructions";

  ground = createSprite(960, 270);
  ground.addImage(bg1Img);
  ground.scale = 0.5;

  Raji = createSprite(50, 300);
  Raji.addImage(RajiImg);
  Raji.scale = 0.3;
  
  enemyGroup = new Group();
  fireGroup = new Group();
  demonGroup = new Group();
}

function draw() {

  if (gameState === "instructions") {


    background(0);

    fill("lightgreen");
    textSize(30);
    textFont("Georgia")
    text("'Your brother is kidnapped!'", 75, 130);
    stroke("yellow");
    fill("white");
    textSize(20);
    text("Use 'Arrow Keys' To move Up and Down", 120, 200);
    text("Burn The Incoming Enemies By Pressing 'Space'", 70, 240);

    text("Press 'S' To Start", 205, 300);

  }

  if (keyDown("s") && gameState === "instructions") {

    gameState = "play";

  }
  if (gameState === "play") {
    // background(bg1Img);
    // background.scale=0.2;
   // console.log("Ground.x = "+ ground.x);
    //console.log("Ground.width = "+ ground.width);
    ground.velocityX = -2;
    if (ground.x === 0) {
      ground.x = ground.width/4;
    }
    //Raji.velocityX=2;
    
    if(keyDown("up")){
      Raji.y = Raji.y - 5;
    }
    
    if(keyDown("down")){
      Raji.y = Raji.y + 5;
    }
    
    spawnEnemy();
    
    if(keyDown("space")) {
      fireball = createSprite(60,Raji.y);
      fireball.addImage(fireImg);
      fireball.velocityX = 2;
      fireball.scale = 0.1;
      fireGroup.add(fireball);
    }
    
    if(enemyGroup.isTouching(fireGroup)){
      
        score = score+1;
        console.log("score:" + score);
        enemyGroup.destroyEach();
        fireGroup.destroyEach();      
    }
    
    if(score >=20){
      spawnDevilDemon();
    }
    
    if(demonGroup.isTouching(fireGroup)){
      gameState = "end";
      enemyGroup.destroyEach();
        fireGroup.destroyEach(); 
    }
    
    drawSprites();
  }
  
  if(gameState === "end"){
    background(0);
        fill("lightgreen");
    textSize(30);
    textFont("Georgia")
    text("'Truth Alone Triumphs'", 105, 130);
    stroke("yellow");
    fill("white");
    textSize(20);
    text("Congratualtions you have saved your brother", 120, 200);
    text("'press R to play again'", 205, 300);
        if(keyDown("R")) {
                enemyGroup.destroyEach();
        fireGroup.destroyEach();
          score = 0;
          gameState = "instructions";

    }
    
    

    
  }

  
}

function spawnEnemy(){
  
  if(frameCount%100 ===0){
    
    var enemy = createSprite(630,300);
    enemy.velocityX = -8;
    var count = Math.round(random(1,2));
    switch(count){
        case 1: enemy.addImage(demonImg);
                break;
        case 2: enemy.addImage(wolfImg);
                break;        
    }
    enemy.scale = 0.2;
    //enemy.debug = true;
    enemy.setCollider("rectangle",0,0,enemy.width-80,enemy.height-300);
    
    enemy.lifetime = 300;
    enemy.y = Math.round(random(100,500));
    
  
    
    enemyGroup.add(enemy);
    
    
    
  }
  
}

function spawnDevilDemon(){
  
  if(frameCount%100 ===0){
    
    var demonBoss = createSprite(630,300);
    demonBoss.velocityX = -8;
    
    demonBoss.addImage(demonBossImg);
                    
    
    demonBoss.scale = 0.2;
    //enemy.debug = true;
    demonBoss.setCollider("rectangle",0,0,demonBoss.width-80,demonBoss.height-300);
    
    demonBoss.lifetime = 300;
    demonBoss.y = Math.round(random(100,500));
    
  
    
    demonGroup.add(demonBoss);
    
    
    
  }
  
}


