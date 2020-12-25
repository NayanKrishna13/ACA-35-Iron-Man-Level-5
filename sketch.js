
var bg, backgroundImg,ironMan,ironManImg;
var stoneGroup,stoneImg;
var diamondImg,diamondGroup;
var spikesImg,spikesGroup;
var score=0;
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironManImg = loadImage("images/iron.png");
  stoneImg =loadImage("images/stone.png");
  diamondImg =loadImage("images/diamond.png");
  spikesImg=loadImage("images/spikes.png");
}


function setup() {
  createCanvas(1000, 600);

  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale=2;
  bg.velocityY=-6;


  ironMan =createSprite(500,500,80,90);
  ironMan.addImage(ironManImg);
  ironMan.scale =0.2;
  ironMan.debug=true;
  ironMan.setCollider("rectangle",100,0,200,400);

  stoneGroup = new Group();
  diamondGroup = new Group();
  spikesGroup =new Group();
 }

function draw() {
  if(keyDown("up")){
    ironMan.velocityY=-10;
  }
  
  if(keyDown("left")){
    ironMan.x=ironMan.x-5;
  }
  if(keyDown("right")){
    ironMan.x=ironMan.x+5;
  }
  ironMan.velocityY=ironMan.velocityY+0.5;
  
  
  if(bg.y<100){
    bg.y=bg.height/4;
  }
  generateStones();
  for(var i=0;i<(stoneGroup).length;i++){
    var temp=stoneGroup.get(i);
    if(temp.isTouching(ironMan)){
      ironMan.collide(temp);
    }
  }
  generateDiamonds();
  for(var i=0;i<(diamondGroup).length;i++){
    var temp=diamondGroup.get(i);
    if(temp.isTouching(ironMan)){
      score++;
      temp.destroy();
      temp=null;
    }
  }
  generateSpikes();
  for(var i=0;i<(spikesGroup).length;i++){
    var temp=spikesGroup.get(i);
    if(temp.isTouching(ironMan)){
      score-=5;
      temp.destroy();
      temp=null;
    }
  }
    drawSprites();
    textSize(20);
    fill("white")
    text("Diamonds collected:"+ score,500,50);
   
}
function generateStones(){
  if(frameCount % 70===0){
    var stone=createSprite(random(2,570),0,40,20);
    stone.addImage(stoneImg);
    stone.velocityY=2;
    stone.scale=0.5;
    stoneGroup.add(stone);
    stone.lifetime=250;
  }
}
function generateDiamonds(){
  if(frameCount % 70===0){
    var diamond=createSprite(random(0,580),0,40,40);
    diamond.addImage(diamondImg);
    diamond.velocityY=10;
    diamond.scale=0.5;
    diamondGroup.add(diamond);
    diamond.lifetime=250;
  }
}
function generateSpikes(){
  if(frameCount % 70 ===0){
    var spikes=createSprite(random(0,560),0,40,40);
    spikes.addImage(spikesImg);
    spikes.velocityY=2;
    spikes.scale=0.5;
    spikesGroup.add(spikes);
    spikes.lifetime=250;
  }
}