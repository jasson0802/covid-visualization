
const checkboxRadial = document.getElementById('checkboxRadial');
const checkboxTreeMap = document.getElementById('checkboxTreeMap');

let colorFondo = 155;
var treevis, info;
var treecostarica = {
      "id": "Costa Rica",
      "r" : 0,
      "a" : 0,
      "x" : 0,
      "y" : 0,
      "children":[
        {
          "id":"San Jose",
          "r" : 0,
          "a" : 0,
          "x" : 0,
          "y" : 0
        },
        {
          "id":"Cartago",
          "r" : 0,
          "a" : 0,
          "x" : 0,
          "y" : 0
        },
        {
          "id":"Limon",
          "r" : 0,
          "a" : 0,
          "x" : 0,
          "y" : 0
        },
        {
          "id":"Puntarenas",
          "r" : 0,
          "a" : 0,
          "x" : 0,
          "y" : 0,
        },
        {
          "id":"Guanacaste",
          "r" : 0,
          "a" : 0,
          "x" : 0,
          "y" : 0
        },
        {
          "id":"Alajuela",
          "r" : 0,
          "a" : 0,
          "x" : 0,
          "y" : 0
        }, 
        {
          "id":"Heredia",
          "r" : 0,
          "a" : 0,
          "x" : 0,
          "y" : 0
        } 
      ]  
    };
//console.log(treecostarica);
//var v = treecostarica;
//console.log(v);

checkboxRadial.addEventListener('change', (event) => {
    if (event.target.checked) {
      checkboxTreeMap.checked = 0;
      setup();
    } else {
        //checkboxTreeMap.checked = 0;
    }
});

checkboxTreeMap.addEventListener('change', (event) => {
    if (event.target.checked) {
        checkboxRadial.checked = 0;
        setup();
    } else {
      
    }
});

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
function setup() {
    var w = 1200;
    var h = 1200;
     _mouseAction = false;
    createCanvas(w, h);
    info = createDiv("");
    info.id("info");
    info.position(800,250);

    info = createDiv("");
    info.id("cant");
    info.position(960,250);

    background(255);
    treevis = createTreemap(
    treemapActivos, {
      children: "children",
      label: "name",
      value: "size"
    });

    treevis.setInset(3);
    treevis.onSelected(function(v, name, x, y, w, h, level, maxLevel, numChildren) {
    select("#info").html(name);
    select("#cant").html(v.size);
    });
}


function dibujarRadial(treecostarica){
    colorFondo = 255;
    firstWalk(arbolRadial,0,0,2*Math.PI, 200);
    secondWalk(arbolRadial,600,600);
    drawLinks(arbolRadial);
    
}

/* firstWalk representan: el nodo a procesar,
el nuevo radio del círculo, el ángulo inicial y final del sector
anular; y el incremento del radio
v = nodo a procesar
r= nuevo radio
b= angulo inicial
e=final del sector
t=incremmento del radio
*/
//var v = treecostarica;
    //console.log(v.children.length);
function firstWalk(v,r,b,e,t){
  v.r = r;
  v.a = (b+e)/2;
    if(v.children!=undefined){
      var s  = (e-b)/v.children.length;
      var a  = b;
      
      for (var hijos of v.children){
        var u = hijos;
        //console.log(u);
        firstWalk(u,r+t,a,a+s,t);
        a = a + s;
      }
    }
}

function secondWalk(v,dx,dy){
  v.x = v.r * cos(v.a) + dx;
  v.y = v.r * sin(v.a) + dy;
  if(v.children!=undefined){
    for (var hijos of v.children){
      var u = hijos;
      secondWalk(u,dx,dy);    
    }
  }
}
 
function drawLinks(node){
  if(node.children!=undefined){
    //console.log(treecostarica);
    circle(node.x,node.y,10);
    for (var hijos of node.children){
      var child = hijos;
      line(node.x,node.y,child.x,child.y);
      circle(child.x,child.y,10);
      drawLinks(child);  
    }
  }
}


function draw() {
    background(colorFondo, 204, 0);

    if(checkboxRadial.checked){
    dibujarRadial(treecostarica);

    }

    if(checkboxTreeMap.checked){
        treevis.draw();
    }
}

function mousePressed() {
    if (mouseButton == RIGHT) {
      treevis.up();
    } else {
      treevis.select(mouseX, mouseY);
    }
  }