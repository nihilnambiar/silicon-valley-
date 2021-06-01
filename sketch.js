const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Render = Matter.Render;
const Constraint=Matter.Constraint;

var bg,bgimg,car,carimg,zombie,zombieimg,obstacle,obstacleimg,arrow,arrowimg;
var reset,resetimg;
var ground;
var kills=0;
var zombie_array=[];
var obstacle_array=[];
var arrow_array=[];
var gameState="PLAY"
var gameOver,gameOverimg;

function preload(){
bgimg=loadImage("destruction2 copy.png")
carimg=loadImage("car.png")
zombieimg=loadImage("zombies.png")
obstacleimg=loadImage("obstacle.png")
resetimg=loadImage("reset2.png")
gameOverimg=loadImage("game over.jpeg")
arrowimg=loadImage("arrow.png")
}

function setup() {
createCanvas(1300, 600);
bg=createSprite(650,300,1300,600)
bg.addImage(bgimg)
bg.scale=0.8
bg.velocityX=-5

ground=createSprite(650,580,2600,10)
ground.velocityX=-2
ground.visible=false

car=createSprite(100,550,10,10)
car.addImage("car",carimg)
car.scale=0.3
car.debug=true
car.setCollider("rectangle",10,10,400,400)

arrow=createSprite(150,510,10,10)
arrow.addImage(arrowimg)
arrow.scale=0.3

gameOver=createSprite(650,300,10,10)
gameOver.addImage(gameOverimg)
gameOver.visible=false

reset=createSprite(650,450,10,10)
reset.addImage(resetimg)
reset.visible=false
}

function draw(){
background(230);
if(gameState==="PLAY"){
bg.velocityX=-4
ground.velocityX=-4

if(bg.x<330){
bg.x=650
}
if(ground.x<0){
ground.x=ground.width/2
}
if(keyDown("space")){
car.velocityY=-10
}
car.velocityY=car.velocityY+1
car.y=arrow.y
if(keyWentDown("t")){
arrow.velocityX=5
arrow_array.push(arrow)
arrow=createSprite(150,510,10,10)
arrow.addImage(arrowimg)
arrow.scale=0.07
}

for(var i=0;i<obstacle_array.length;i++){
if(obstacle_array[i].isTouching(car)){
gameState="END"
}
}

for(var i=0;i<zombie_array.length;i++){
if(zombie_array[i].isTouching(car)){
gameState="END"
}
}

for(var i=0;i<arrow_array.length;i++){
for(var j=0;j<zombie_array.length;j++){
if(zombie_array[i].isTouching(zombie_array[j])){
zombie_array[j].destroy();
arrow_array[i].lifetime=20
kills=kills+1
updateKills();
}
}
}
spawnObstacles();
spawnZombie();
}

if(gameState==="END"){
bg.velocityX=0
for(var i=0;i<obstacle_array.length;i++){
obstacle_array[i].velocityX=0
}
for(var i=0;i<zombie_array.length;i++){
zombie_array[i].velocityX=0
}
gameOver.visible=true
hero.velocityY=0;
reset.visible=true
reset.scale=0.1
if (mousePressedOver(reset)){
restart()
}
}
car.collide(ground)
drawSprites();
textSize(30)
stroke("white")
fill("black ")
text("Zombies killed: "+kills,900,100)
}

function restart(){
gameState="PLAY"
gameOver.visible=false
reset.visible=false
for(var i=0;i<zombie_array.length;i++){
zombie_array[i].destroy()
}
for(var i=0;i<obstacle_array.length;i++){
obstacle_array[i].destroy()
}
kills=0
updateKills();
}
function spawnObstacles(){
if(frameCount%170===0){
var obstacle=createSprite(1300,550,10,10)
var rand=round(random(1,3))
switch(rand){
case 1: obstacle.addImage(rockimg)
obstacle.scale=0.5
}
obstacle.velocityX=-(5+2*kills/10);
obstacle_array.push(obstacle)
}
}
function spawnZombie(){
if(frameCount%150===0){
var zombie=createSprite(1300,random(100,400))
zombie.addImage(zombieimg)
zombie.velocityX=-(6+1.5*kills/8)
zombie.scale=0.1
zombie_array.push(zombie)
zombie.add(zombie)
}
}

