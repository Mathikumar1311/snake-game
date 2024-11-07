const gameBoard = document.getElementById('gamebord');
const context = gameBoard.getContext('2d'); 
const scroetext=document.getElementById('scoreval')

const WIDTH=gameBoard.width;
const HEIGHT=gameBoard.height;
const UNIT=25;

let foodx;
let foody;
let xvel=25;
let yvel=0;
let score=0;
let active=true;
let started=false;
// let newTimeout=200;

// snake design 4 box
let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
];

window.addEventListener('keydown',keypress)

startGame();

function startGame() {

    context.fillStyle = '#212121';
    context.fillRect(0,0,WIDTH,HEIGHT);
    creatfood();
    displayfood();
    drawsnake();
    // movesnake(); 
    
}

function clearboard(){
    context.fillStyle='#212121'
    context.fillRect(0,0,WIDTH,HEIGHT);
}

//food random display in screen
function creatfood(){
    foodx=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foody=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;
}
function displayfood(){
    context.fillStyle='yellow'
    context.fillRect(foodx,foody,UNIT,UNIT)
}
//snake color and design 
function drawsnake(){
    context.fillStyle='lightgreen';
    context.strokeStyle='#212121'
    snake.forEach((snakepart)=> {
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT)
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT)
    })

}
//snake eat food and grow
function movesnake(){
    const head={x:snake[0].x+xvel,y:snake[0].y+yvel}
    snake.unshift(head)
    if(snake[0].x==foodx && snake[0].y==foody){
        score+=1;
        scroetext.textContent=score;
        creatfood();
    }
    else
        snake.pop()
}
//snake speed and movement tracking and game over shown
function nexttick(){
    if(active){
        const speedMultiplier = 5; 
        newTimeout = 200 - speedMultiplier;

    setTimeout(()=>{
        clearboard();
        displayfood();
        movesnake();
        drawsnake();
        checkgameover();
        nexttick();
    }, newTimeout);
    }
    else{
        clearboard();
        context.font="bold 40px serif";
        context.fillStyle="white"
        context.textAlign="center"
        context.fillText("Game Over Idiot...",WIDTH/2,HEIGHT/2)
    }
}
//controlers design
function keypress(event){
    if(!started){
        started=true;
        nexttick(); 
    }
    active=true;
    const  LEFT=37
    const UP=38
    const RIGHT=39
    const DOWN=40

    switch(true){
        case(event.keyCode==LEFT && xvel!=UNIT):
            xvel=-UNIT;
            yvel=0;
            break;
        case(event.keyCode==RIGHT && xvel!=-UNIT):
            xvel=UNIT;
            yvel=0;
            break;
        case(event.keyCode==UP && yvel!=UNIT):
            xvel=0;
            yvel=-UNIT;
            break;
        case(event.keyCode==DOWN && yvel!=-UNIT):
            xvel=0;
            yvel=UNIT;
            break;
    }
}

function checkgameover(){
    switch(true){
        case(snake[0].x<0):
        case(snake[0].x>=WIDTH):    
        case(snake[0].y<0):
        case(snake[0].y>=HEIGHT):
            active=false;
            break;

    }
}