let num_row = 10;
let num_col = 10;
let gridSize = 40;
let grid = [];
let filled = [];
let gridLoc_x;
let gridLoc_y;
let currentCell;
let selectC;
let selectR;
let randomC;
let randomR;
let userC;
let userR;
let randomP;
let randomTimes;
// speech library 
let speech;
let speechRec;
let continuous = true;
let interimResults = true;
let said = [];
let kwords = [];
let otherWords = [];
let xPos = 200;
let yPos = 200;
let words = [];
let mode = 0; // keep track of states 
let excerpts; // excerpt txt file 
let leading = 30;

function preload(){
  show = loadStrings("words.txt");
  excerpts = loadStrings("policies.txt");
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  // draw grid location 
  for(let r = 0; r < num_row; r++){
    row = [];
    for(let c = 0; c < num_col; c++){
      cell = {
          x: 830+gridSize*c,
          y: height/4+gridSize*r,
	        visible: false
        }
        row.push(cell);
      }
        grid.push(row);
    }
  userC = floor(random(0,num_col));
  userR = floor(random(0,num_row));
  
  // speech recognition here 
 
  // push all the keywords in an array
  for(var i = 0; i < show.length;i++){
    kwords.push(show[i]);
  }
  speechRec = new p5.SpeechRec(); 
  speechRec.onResult = showResult; 
  speechRec.start(continuous, interimResults); 
}

function draw(){
  background(255);
  // background('#FFD700');
  fill(0);
  textStyle(NORMAL);

  // switch state here 
  switch(mode){
    case 0:
      initial();
      break;
    case 1:
      drawGrid();
      for (let i = 0; i < words.length; i++) {
        // retrieve each keyword
        const word = words[i]; 
        word.display();
      }
      break;
    case 2:
      case_us();
      break;
    case 3:
      case_singapore();
      break;
    case 4:
      case_sweden();
      break;
    case 5:
      case_china();
      break;
    case 6:
      case_tunisia();
      break;
  }

}

function initial(){
  textStyle(ITALIC);
  textAlign(LEFT);
  textSize(65);
  fill(0);
  text("Welcome. First-year.", width/1.9,height/2);
}

function case_us(){
  textSize(25);
  textAlign(LEFT);
  textStyle(BOLD);
  fill( 93, 90, 80 );
  text(excerpts[0],width/7,height/3+leading*0);
  text(excerpts[1],width/7,height/3+leading*1);
  for(var i = 2; i < 8; i ++){
    textStyle(NORMAL);
    text(excerpts[i],width/7,height/3+leading*i);
  }
}

function case_singapore(){
  textSize(25);
  textAlign(LEFT);
  textStyle(BOLD);
  fill( 93, 90, 80 );
  text(excerpts[8],width/7,height/3+leading*0);
  text(excerpts[9],width/7,height/3+leading*1);

  for(var i = 10; i < 13; i ++){
    textStyle(NORMAL);
    text(excerpts[i],width/7,height/3+leading*(i-8));
  }
}

function case_sweden(){
  textSize(25);  
  textAlign(LEFT);
  textStyle(BOLD);
  fill( 93, 90, 80 );
  text(excerpts[13],width/7,height/3+leading*0);
  text(excerpts[14],width/7,height/3+leading*1);
  text(excerpts[15],width/7,height/3+leading*2);

  for(var i = 16; i < 24; i ++){
    textStyle(NORMAL);
    text(excerpts[i],width/7,height/3+leading*(i-13));
  }
}

function case_china(){
  textSize(25);  
  textAlign(LEFT);
  textStyle(BOLD);
  fill( 93, 90, 80 );
  text(excerpts[24],width/7,height/3+leading*0);
  text(excerpts[25],width/7,height/3+leading*1);

  for(var i = 26; i < 32; i ++){
    textStyle(NORMAL);
    text(excerpts[i],width/7,height/3+leading*(i-24));
  }
}

function case_tunisia(){
  textSize(25);  
  textAlign(LEFT);
  textStyle(BOLD);
  fill( 93, 90, 80 );
  text(excerpts[32],width/7,height/3+leading*0);
  text(excerpts[33],width/7,height/3+leading*1);
  
  for(var i = 34; i < 44; i ++){
    textStyle(NORMAL);
    text(excerpts[i],width/7,height/3+leading*(i-32));
  }
}

function showResult(){
  said = speechRec.resultString.split(" ");
  displayWords();
}

function displayWords(){
  for(let i = 0; i < said.length;i++){
    if (said[i] == "United"){
      mode = 2;
    } else if(said[i] == "Singapore"){
      mode = 3;
    } else if (said[i] == "Sweden"){
      mode = 4;
    } else if (said[i] == "China"){
      mode = 5;
    } else if (said[i] == "Tunisia"){
      mode = 6;
    } 
    else if (said[i] == "seat"){
      mode = 1;
    } 

  if(mode == 1){
    if(kwords.includes(said[i])){
      // get current word
      const wordStr = said[i];
      // get current word width
      const wordStrWidth = textWidth(wordStr);
      const word = new Word(wordStr, xPos, yPos);
      words.push(word);
      xPos = xPos + wordStrWidth + textWidth(' ')
      const nextWordStrWidth = textWidth(said[i+1]) || 0;
      if (xPos > width/3 - nextWordStrWidth) {
        yPos += 25; // line height  
        xPos = 200; // reset x position
      }
      if (yPos > 600){
        yPos = 200;
      }
      clicked();
      if(words.length > 50){
        words.splice(0,100)
      }
    }
  }
  }
}

function drawGrid(){
  for(let r = 0; r < num_row; r++){
   for(let c = 0; c < num_col; c++){
    // user cell 
     fill(255, 95, 31);
     noStroke();
     currentCell = grid[userR][userC];
     ellipseMode(CENTER);
     ellipse(currentCell.x, currentCell.y, gridSize-8, gridSize-8);

     fill(0);
     // draw grid by x[column] and y[row]
     currentCell = grid[r][c];
     rect(currentCell.x, currentCell.y, gridSize, gridSize-5);
     if(currentCell.visible){
       fill(255);
       rect(currentCell.x,currentCell.y, gridSize-4, gridSize-4);
     }
   }
 } 
}

function clicked(){
  // click ++;
  randomP = floor(random(1,2));
  randomTimes = floor(random(1,3));
  
   for(let i = 0; i < randomP*randomTimes; i++){
    randomC = floor(random(0,num_col));
    randomR = floor(random(0,num_row));

    fill(0,30);
    textSize(15);
    cell = grid[randomR][randomC];
    cell.visible = true;
    
    // put the selected cell in the array
    filledCell = {
      x: randomR,
      y: randomC,
      selected: true
    }

    for(let i = 0; i < filled.length; i++){
      if(randomR == filledCell.x && randomR == filledCell.y){
        randomC = floor(random(0,num_col));
        randomR = floor(random(0,num_row));
      }else if(randomR == userR && randomR == userC){
      randomC = floor(random(0,num_col));
      randomR = floor(random(0,num_row));
    }
      else{
        filled.push(cell);
      }
    }
  }
}

class Word {
  constructor(word, x, y) {
      this.word = word
      this.x = x
      this.y = y
      this.size = 27;
  }
  display() {
      fill(122, 108, 97);
      noStroke();
      textStyle(BOLD);
      textSize(this.size);
      text(this.word, this.x, this.y)
  }
}
