canvas = document.getElementById('iControvercy');
context = canvas.getContext('2d');
/*
var binary = new Array();
binary.push('0');
binary.push('1');
binary.push('10');
binary.push('11');
binary.push('100');
binary.push('101');
binary.push('110');
binary.push('111');
binary.push('1000');
binary.push('1001');
binary.push('empty');*/

var binscr = new Array();
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/0.png');//0
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/1.png'); //1
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/10.png');//10
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/11.png');//11
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/100.png');//100
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/101.png');//101
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/110.png');//110
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/111.png');//111
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/1000.png');//1000
binscr.push('https://raw.githubusercontent.com/HiddenFat/iControversy/master/Number%20Tiles/1001.png');//1001

var Number0 = new Image();
Number0.src = binscr[0];
var Number1 = new Image();
Number1.src = binscr[1];
var Number10 = new Image();
Number10.src = binscr[2];
var Number11 = new Image();
Number11.src = binscr[3];
var Number100 = new Image();
Number100.src = binscr[4];
var Number101 = new Image();
Number101.src = binscr[5];
var Number110 = new Image();
Number110.src = binscr[6];
var Number111 = new Image();
Number111.src = binscr[7];
var Number1000 = new Image();
Number1000.src = binscr[8];
var Number1001 = new Image();
Number1001.src = binscr[9];

var board = new Array(3);
for (var x = 0; x < 3; x++){
  board[x] = new Array(3);
}
var white = 5;
var first = true;
var blocksize = 110;
var len = white * (board.length+1) + blocksize * board.length;
var score = 0;
var gameover = false;
var keyup = false;
var keydown = false;
var keyleft = false;
var keyright = false;

function restart(){
  board = new Array(3);
  for (var x = 0; x < 3; x++)
    {
    board[x] = new Array(3);
    }
  for(var j = 0; j< board.length; j++){
  for(var i = 0; i <board[j].length; i++){
      board[j][i] = 0;
    }
  }

  score = 0;
  gameover=false;
  spawn();
}// end function

function spawn(){
var emptyX = new Array();
var emptyY = new Array();
for(var j = 0; j< board.length; j++){
  for(var i = 0; i <board[j].length; i++){
    if(board[j][i] == 0){
        emptyX.push(i);
        emptyY.push(j)
      }
    }
  }
  var pos = Math.floor((Math.random()*emptyX.length)+1);
  var x = emptyX[pos];
  var y = emptyY[pos];
 var randnum = Math.floor((Math.random() * 10) + 1);
  if(randnum < 9){
  board[y][x] = 2;
  }
  else{
  board[y][x] = 4;
  }
}// end function

window.addEventListener("keypress", keyinput, true);

function keyinput (e){
  if (!gameover){
    var key = e.keyCode;
    var y = 0;
    var x = 0;
    if(key == 38){
        y= -1;
    }
    else{
      if(key == 40){
        y = 1;
      }
      else{
        y=0;
      }
    }
    if(key == 37){
        x= -1;
    }
    else{
      if(key == 39){
        x = 1;
      }
      else{
        x=0;
      }
    }
  var array = gameplay(y,x,true);
  if(array != null){
    board = array;
    spawn();
  }

  }//if game over
}//end function


function drawgrid (){
context.fillStyle = 'white';
context.fillRect(0, 0, 400, 400);
for(var j = 0; j< board.length; j++){
  for(var i = 0; i <board[j].length; i++){
    context.fillStyle = 'black';
    var x = white+(white+blocksize)*i;
    var y = white+(white+blocksize)*j
    context.fillRect(x,y,blocksize,blocksize);
    var check = Math.log2(board[j][i]);
    if(board[j][i]>0 ){
      context.fillStyle = 'red';
      context.fillText(check,0,0)
      if(check == 1){
      context.drawImage(Number0,x,y,blocksize,blocksize);
      }
      if(check == 2){
      context.drawImage(Number1,x,y,blocksize,blocksize);
      }
      if(check == 3){
      context.drawImage(Number10,x,y,blocksize,blocksize);
      }
      if(check == 4){
      context.drawImage(Number11,x,y,blocksize,blocksize);
      }
      if(check == 5){
      context.drawImage(Number100,x,y,blocksize,blocksize);
      }
      if(check == 6){
      context.drawImage(Number101,x,y,blocksize,blocksize);
      }
      if(check == 7){
      context.drawImage(Number110,x,y,blocksize,blocksize);
      }
      if(check == 8){
      context.drawImage(Number111,x,y,blocksize,blocksize);
      }
      if(check == 9){
      context.drawImage(Number1000,x,y,blocksize,blocksize);
      }
      if(check == 10){
      context.drawImage(Number1001,x,y,blocksize,blocksize);
      }
    } 
  }
}
if(gameover){
  //gameover screen
/*if(mousepressed ){
  restart();
} */
}
}//end function

function gameplay( ydir , xdir, updatescore){
var board2 = new Array(3);
for (var x = 0; x < 3; x++){
  board2[x] = new Array(3);
}
for(var j = 0; j<3; j++){
  for(var i = 0; i<3; i++){
    board2[j][i] = board[j][i]; //copy board to board2
  }
} //copy board
var moved = false;
if(xdir != 0 || ydir != 0){
  var d = 0;
  if(xdir != 0){
    d = xdir;
  }
  else {
    d = ydir;
  }
for(var prep = 0; prep < board.length; prep++){
  for (var tang = place ; tang != (d > 0 ? -1 : board.length) ; tang -=d){
    var y = 0;
    var x = 0;
    if(xdir != 0){
      y = prep;
    }
    else{
      y = tang;
    }
    if(xdir != 0){
      x = tang;
    }
    else{
      x = prep;
    }
    var targetx = x;
    var targety = y;
    if(board2[y][x] == 0 ){
      continue;
    }
    for(var i=(xdir != 0 ? x : y)+d ; i != (d > 0 ? board.length : -1); i+=d ){
      var r =0;
      var c = 0;
      if(xdir != 0){
        r = y;
      }
      else{
        r = i;
      }
      if(xdir != 0 ){
        c = i;
      }
      else {
        c = x;
      }
      if(board2[r][c] != 0 && board2[r][c] != board[y][x]){
        break;
      }
      else{
        if(xdir != 0){
          targetx = i;
        }
        else{
          targety = i;
        }
      }
    } // x and y are now the block position, targetx and targety are where the block is sliding into
    if((xdir != 0 && targetx == x) || (ydir !=0 && targety == y)){
      continue;
    }
    else{
      if(board2[targety][targetx] = board[y][x]){
        board2[targety][targetx] *=2;
        if (updatescore){
          score += board2[targety][targetx];
        }
        moved = true;
      }
      else{
        if((xdir != 0 && targetx !=x) || (ydir != 0 && targety!= y)){
          board2[targety][targetx] = board2[y][x];
          moved = true;
        }
      }
      if(moved){
        board2[y][x] = 0;
      }
    }
  }
}
}
if(moved){
  return board2;
}
else{
  return null;
}
}// end function


//////////////////////////////////////
function update(){

}

function draw(){
  if(first){
  restart();
  first = false;
  }
  drawgrid();
}

function gameloop(){
  update();
  draw();
}

setInterval(gameloop,30);
