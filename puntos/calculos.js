
var x = 600
var y = 500
var r = 75 
function setup(){

    createCanvas(x, y);
    background(230);
}

function draw(){
    let c = color(0, 0, 0);
    fill(c);
    circle(x/2, y/2, 10);
    circle((x/2)+r, y/2, 10);
}
