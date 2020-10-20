let movers = [];

// Líquido
let liquid;
let isRadial = false;

function dibujarRadial (){
  var estadoTreeMapCheckBox=document.getElementById("checkboxTreeMap").checked;
  if(estadoTreeMapCheckBox){ // Si esta marcado el tipo de grafico treemap entonces desmarcar
    document.getElementById("checkboxTreeMap").checked=0;
  }else{

  }
  
}

function dibujarTreeMap (){
  var estadoRadialTreeCheckBox=document.getElementById("checkboxRadial").checked;
   if(estadoRadialTreeCheckBox){// Si esta marcado el tipo de grafico radial entonces desmarcar
    document.getElementById("checkboxRadial").checked=0;
  }else{
    
  }
}

function casosPositivos(){
  var estadoActivosCheckBox=document.getElementById("checkboxActivos").checked;
  var estadoFallecidosCheckBox=document.getElementById("checkboxFallecidos").checked;
   // Si esta marcado el tipo de grafico treemap entonces desmarcar
    document.getElementById("checkboxActivos").checked=0;
    document.getElementById("checkboxFallecidos").checked=0;
    console.log(estadoActivosCheckBox);
 

  
}

function casosActivos(){
  var estadoPositivosCheckBox=document.getElementById("checkboxPositivos").checked;
  var estadoFallecidosCheckBox=document.getElementById("checkboxFallecidos").checked;
   // Si esta marcado el tipo de grafico treemap entonces desmarcar
    document.getElementById("checkboxPositivos").checked=0;
    document.getElementById("checkboxFallecidos").checked=0;
    console.log(estadoPositivosCheckBox);

  
}

function casosFallecidos(){
  var estadoActivosCheckBox=document.getElementById("checkboxActivos").checked;
  var estadoPositivosCheckBox=document.getElementById("checkboxPositivos").checked;
  // Si esta marcado el tipo de grafico treemap entonces desmarcar
    document.getElementById("checkboxActivos").checked=0;
    document.getElementById("checkboxPositivos").checked=0;
  console.log(estadoActivosCheckBox);

  
}

function draw() {
  
}

function mousePressed() {
  setup();
  var estadoTreeMapCheckBox=document.getElementById("checkboxTreeMap").checked;
  if(estadoTreeMapCheckBox){
    
  }else{
 
  }
  
}
// START SECCION DEL TREEMAP
let randomHue; //color matching... the key to everything!
let totalValue = 0; //the total values of all elements together, just to write % on square.
let numbers;
let nbItems;

function setup() {
  colorMode(HSL, 100); //it's just nicer this way... you know...
  createCanvas(600, 600);
  //noLoop();
  smooth();
  numbers = [0.1, 0.1, 0.2, 0.2, 0.3, 0.1]
  nbItems = numbers.length
  
  calculate();
}
///   Start the recursion
function calculate() {
  totalValue = 0;
  
  for (let i = 0; i <= numbers.length - 1; i++) {
    
    print(totalValue + " + " + numbers[i] + " = ...");
    totalValue += numbers[i]; //There's a problem here, the total is never accurate...
    print("numbers = \n" + numbers);
    
  }

  //basic param for the sake of this prototype ...
  let blockW = width - 20;
  let blockH = height - 20;
  let refX = 10;
  let refY = 10;

  makeBlock(refX, refY, blockW, blockH, numbers); //x,y,w,h
}


///   MAKE BLOCK
function makeBlock(refX, refY, blockW, blockH, numbers) {
  // We sort the received array.
  ///////////////////////////////////////////////////////////////
  numbers = reverse(sort(numbers)); // we sort the array from biggest to smallest value.
  //First we need to asses the optimal number of item to be used for block A
  // How do we do that?

  let nbItemsInABlock = getPerfectSplitNumber(numbers, blockW, blockH); //return the numbers of elements that should be taken for A block.

  let valueA = 0; //the biggest value
  let valueB = 0; //value B will correspond to the sum of all remmaining objects in array
  let numbersA = []; //in the loop, we'll populate these two out of our main array.
  let numbersB = [];
  
  for (let i = 0; i < numbers.length; i++) {
    if (i < nbItemsInABlock) { //item has to be placed in A array...
      numbersA = append(numbersA, numbers[i]);
      //numbersA[i] = numbers[i]; //we populate our new array of values, we'll send it recursivly...
      valueA += numbers[i];
    } else {
      numbersB = append(numbersB, numbers[i]);
      //numbersB[i-nbItemsInABlock] = numbers[i]; //we populate our new array of values, we'll send it recursivly...
      valueB += numbers[i];
    }
  }
  let ratio = float(valueA) / float(valueB + valueA);

  print("ratio = " + ratio);
  print("A val = " + valueA);
  print("B val = " + valueB);
  //now we split the block in two according to the right ratio...

  /////////////// WE SET THE X, Y, WIDTH, AND HEIGHT VALUES FOR BOTH RECTANGLES.

  let xA, yA, heightA, widthA, xB, yB, heightB, widthB;
  if (blockW > blockH) { //si plus large que haut...
    //we split vertically; so height will stay the same...

    xA = refX;
    yA = refY; // we draw the square in top right corner, so same value.
    heightA = blockH;
    widthA = floor(blockW * ratio);

    xB = refX + widthA;
    yB = refY;
    heightB = blockH;
    widthB = blockW - widthA; //the remaining portion of the width...

  } else { //tall rectangle, we split horizontally.
    xA = refX;
    yA = refY; // we draw the square in top right corner, so same value.
    heightA = floor(blockH * ratio);
    widthA = blockW;

    xB = refX;
    yB = refY + heightA;
    heightB = blockH - heightA;
    widthB = blockW; //the remaining portion of the width...

  }

  /////////////// END OF Block maths.

  // if the ratio of the A block is too small (elongated rectangle)
  // we take an extra value for the A sqare, don't draw it, then send the 2 element 
  // it represents to this function (treat it recusvily as if it was a B block).
  // We dont care about the ratio of B block because they are divided after...

  //drawRect(xA, yA, widthA, heightA, valueA); //(x, y, width, height)
  //int pcntA = floor(valueA / float(valueA + valueB)*100);
  //int pcntB = floor(valueB / float(valueA + valueB)*100);
  print("numbers.length = " + numbers.length);
  print("numbersA.length = " + numbersA.length);
  print("numbersB.length = " + numbersB.length);
  //We add the block A to the display List
  // for now, we just draw the thing, let's convert to OOP later...


  if (numbersA.length >= 2) { //this mean there is still stuff in this arary...
    makeBlock(xA, yA, widthA, heightA, numbersA);
  } else {
    //if it's done, we add the B to display list, and that's it for recussivity, we return to main level... 
    // the main function will then deal with all the data...
    drawRect(xA, yA, widthA, heightA, valueA);
  }

  if (numbersB.length >= 2) { //this mean there is still stuff in this arary...
    makeBlock(xB, yB, widthB, heightB, numbersB);
  } else {
    //if it's done, we add the B to display list, and that's it for recussivity, we return to main level... 
    // the main function will then deal with all the data...
    drawRect(xB, yB, widthB, heightB, valueB);
  }

  //If it represent more than one value, we send the block B to be split again (recursivly)

}


///   FIND GOOD SPLIT NUMBER - advantagous block aspect ratio.
function getPerfectSplitNumber(numbers, blockW, blockH) {
  // This is where well'll need to calculate the possibilities
  // We'll need to calculate the average ratios of created blocks.
  // For now we just try with TWO for the sake of the new functionn...

  //Let's just split in either one or two to start...

  // print("blockW = "+blockW);
  //print("blockH = "+blockH);

  let valueA = numbers[0]; //our biggest value
  let valueB = 0; //value B will correspond to the sum of all remmaining objects in array
  for (let i = 1; i < numbers.length; i++) {
    valueB += numbers[i];
  }

  let ratio = float(valueA) / float(valueB + valueA);

  let heightA, widthA;
  if (blockW >= blockH) {
    heightA = blockH;
    widthA = floor(blockW * ratio);
  } else {
    heightA = floor(blockH * ratio);
    widthA = blockW;
  }

  let ratioWH = float(widthA) / float(heightA);
  let ratioHW = float(heightA) / float(widthA);
  let diff;

  if (widthA >= heightA) { // Larger rect //ratio = largeur sur hauteur,
    //we should spit vertically...
    diff = 1 - ratioHW;
  } else { //taller rectangle ratio
    diff = 1 - ratioWH;
  }

  if ((diff > 0.5) && (numbers.length >= 3)) { //this is a bit elongated (bigger than 2:1 ratio)
    print("======================--> 22222");
    return 2; //TEMPORARY !!!!
  } else { //it's a quite good ratio! we don't touch it OR, it's the last one, sorry, no choice.   
    print("======================--> 11111");
    return 1;
  }

  //diff is the difference (between 0...1) to the square ratio.
  // 0 mean we have a square (don't touch, it's beautifull!)
  // 0.9 mean we have a very long rectangle.

  /* Previous ghetto mehod
  
  if(numbers.length >= 3){//if there are 3 elements or more in our array, we try fragmenting A for better RAtios.
    return 2;//the two is really hardcoded, we should calculate average ratios of all blocks...
  }else{
    return 1;
  } */

}


function drawRect(x1, y1, w1, h1, value) {
  let hStart = 50 - 0.1;
  let hEnd = 50 + 0.1;
  let h = random(hStart, hEnd);
  let s = random(7, 100);
  let b = random(90, 70);
  fill(h, s, b);
  rect(x1, y1, w1, h1); //we draw a rectangle    
  fill(1);
  //  text(str(value), x1+6, y1+20);  (we don't care about the actual value now that we have the pcnt...)
  let myPcntStr;
  let myPcnt = int(round((value / totalValue) * 100));
  print([totalValue, value, myPcnt])
  let myPcntDecimal = int(round((value / totalValue) * 1000));
  myPcntDecimal = myPcntDecimal / 10;

  if (myPcntDecimal > 10) { //bigger than 10%, we round it up.
    myPcntStr = str(myPcnt) + "%";
  } else {
    myPcntStr = str(myPcntDecimal) + "%";
  }
  text(myPcntStr, x1 + (w1 / 2) - 10, y1 + (h1 / 2) + 5);

  print("++++ totalValue = " + totalValue);
}

//END SECCION TREEMAP