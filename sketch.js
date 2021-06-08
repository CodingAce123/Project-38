//Made By Aaryan Bizoara
//Sprites
var Town,Thief,Stop,Police,Coin,Diamond,Notes

//Image Sprites
var TownImage,ThiefImage,Thief_Colided,StopImage,PoliceImage,CoinImage,DiamondImage,NotesImage

//Groups
var StopGroup,PoliceGroup,CoinGroup,DiamondGroup,NotesGroup

//Sounds
var JumpSound,DieSound,CoinSound
var BackgroundSound

//Ground and Invisible Ground
var Ground,InvisibleGround

//Score,Total Coins,Diamonds,Notes
var score = 0, TotalCoins = 0, TotalDiamonds = 0, NotesCombo = 0;

//gamestate
var gameState = 0

localStorage["HighestScore"] = 0;

function preload(){

TownImage = loadImage("images/desert.jpg")
ThiefImage = loadImage("images/robber.gif")
Thief_Collided = loadImage("images/thief.png")

StopImage = loadImage("images/stop warning.png")
PoliceImage = loadImage("images/police car.png")
CoinImage= loadImage("images/coin.gif")
DiamondImage = loadImage("images/diamond.png")
NotesImage = loadImage("images/money.png")
  
JumpSound = loadSound("sounds/Jumpsound.mp3")
DieSound = loadSound("sounds/Die.mp3")
CoinSound = loadSound("sounds/checkPoint.mp3")

BackgroundSound = loadSound("sounds/Game Bjm.mp3")
}

function setup(){
createCanvas(1400,600)

Town= createSprite(555,305)
Town.addImage(TownImage)
Town.scale = 2.3;

Thief = createSprite(260,540)
Thief.addImage(ThiefImage)
Thief.scale = 0.3;

InvisibleGround = createSprite(700,590,1400,60)
fill("red")
InvisibleGround.visible = true;
InvisibleGround.x = InvisibleGround.width/2;
InvisibleGround.velocityX = -(6 + 3*score/100);
  
StopGroup = createGroup();
PoliceGroup = createGroup();
CoinGroup = createGroup();
DiamondGroup = createGroup();
NotesGroup = createGroup();

Thief.setCollider("rectangle",-58,20,320,280)
}

function draw(){

var index = 0
index = index+1

InvisibleGround.velocityX = -(4 + 4*score/50);

Town.velocityX = -15
 
if(Town.x < 0){
Town.x = Town.width/2
}

if(InvisibleGround.x < 1000){
InvisibleGround.x = InvisibleGround.width/2;
}
      
if(score === 2){
BackgroundSound.loop()  
}

camera.position.x = displayWidth/2;
camera.position.y = Thief.y[index-1]

if(keyWentDown("space") && Thief.y >= 100){
Thief.velocityY = -15
JumpSound.play() 
}

Thief.velocityY = Thief.velocityY + 0.8;
Thief.collide(InvisibleGround);

if(Thief.isTouching(CoinGroup)){
TotalCoins = TotalCoins + 1;
CoinGroup.destroyEach();
CoinSound.play()
}
  
if(Thief.isTouching(DiamondGroup)){
TotalDiamonds = TotalDiamonds + 1;
DiamondGroup.destroyEach();
CoinSound.play()
}
  
if(Thief.isTouching(NotesGroup)){
NotesCombo = NotesCombo + 1;
NotesGroup.destroyEach();
CoinSound.play()
}

if(Thief.isTouching(StopGroup) || Thief.isTouching(PoliceGroup)){

BackgroundSound.stop()
Town.velocityX = 0;
Thief.velocityX = 0;
Thief.velocityY = 0; 
   
StopGroup.setVelocityXEach(0)
PoliceGroup.setVelocityXEach(0)
CoinGroup.setVelocityXEach(0)
NotesGroup.setVelocityXEach(0)
DiamondGroup.setVelocityXEach(0)

StopGroup.setLifetimeEach(-1)
PoliceGroup.setLifetimeEach(-1)
CoinGroup.setLifetimeEach(-1)
NotesGroup.setLifetimeEach(-1)
DiamondGroup.setLifetimeEach(-1)

score = 0;



if(keyWentDown("R")){
reset();
}
}


stop();
police();
coins();
diamonds();
notes();

drawSprites();
  
if(Thief.isTouching(StopGroup) || Thief.isTouching(PoliceGroup)){

background(0)

stroke ("black")
fill ("gold")
textFont ("Arial")
textSize(25);
text ("Mission: Rob The National Bank Of Egypt",460,240)
 
stroke ("black")
fill ("red")
textFont ("Arial")
textSize(25);
text ("GAME OVER",600,280)
  
stroke ("black")
fill ("red")
textFont ("Arial")
textSize(25);
text ("You Were Caught By The Police",510,320)
     
stroke ("black")
fill ("lightgreen")
textFont ("Arial")
textSize(25);
text ("Press R to Restart",580,360)
} 

stroke ("black")
fill ("red")
textFont ("Arial")
textSize(25);
text ("Total Coins : " + TotalCoins,20,25)
  
stroke ("black")
fill ("blue")
textFont ("Arial")
textSize(25);
text ("Total Diamonds : " + TotalDiamonds,20,55)
  
stroke ("black")
fill ("green")
textFont ("Arial")
textSize(25);
text ("Total Notes : " + NotesCombo,20,85)
  
stroke ("black")
fill ("Black")
textFont ("Arial")
textSize(30);
text ("Score : " + score ,585,27)
score = score + Math.round(getFrameRate()/60);
  
stroke ("black")
fill ("yellow")
textFont ("Arial")
textSize(25);
text ("Bob The Robber 6: Egyptian Edition",925,25)
  
stroke ("black")
fill ("red")
textFont ("Arial")
textSize(25);
text ("Press SPACE To Jump",970,60)
}

function stop(){
if (frameCount % 500 == 0){
Stop = createSprite(1380, 490)
Stop.addImage(StopImage)
Stop.scale = 0.1;
Stop.velocityX = -(6 + 3*score/80);
Stop.lifetime = 240;
StopGroup.add(Stop)
}
}

function police(){
if (frameCount % 700 == 0){
Police = createSprite(1380, 520)
Police.addImage(PoliceImage)
Police.scale = 0.1;
Police.velocityX = -(6 + 3*score/80);
Police.lifetime = 240;
PoliceGroup.add(Police);
Police.setCollider("rectangle", 0, 0, 1400, 900)
}
}

function coins(){
if (frameCount % 70 == 0){
Coin = createSprite(1380,530)
Coin.addImage(CoinImage)
Coin.scale = 0.1;
Coin.velocityX = -(6 + 3*score/80);
Coin.lifetime = 300;
CoinGroup.add(Coin)
}
}

function diamonds(){
if (frameCount % 312 == 0){
Diamond = createSprite(1380,530)
Diamond.addImage(DiamondImage)
Diamond.scale = 0.1;
Diamond.velocityX = -(6 + 3*score/80);
Diamond.lifetime = 300;
DiamondGroup.add(Diamond)
}
}

function notes(){
if(frameCount % 1018 == 0){
Notes = createSprite(1380,535)
Notes.addImage(NotesImage)
Notes.scale = 0.1;
Notes.velocityX = -(6 + 4*score/80);
Notes.lifetime = 2403
NotesGroup.add(Notes)
}
}

function reset(){
BackgroundSound.play()
DieSound.play()
score = 0;
TotalCoins = 0;
TotalDiamonds = 0;
NotesCombo = 0;
    
NotesGroup.destroyEach();
DiamondGroup.destroyEach();
CoinGroup.destroyEach();
StopGroup.destroyEach();
PoliceGroup.destroyEach();

if(localStorage["HighestScore"]<score){
localStorage["HighestScore"] = score;
}
console.log(localStorage["HighestScore"]);
      
score = 0;
}