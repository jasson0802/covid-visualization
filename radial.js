
const checkboxRadial = document.getElementById('checkboxRadial');
const checkboxTreeMap = document.getElementById('checkboxTreeMap');

let colorFondo = 155;
let red = 0;
let green = 0;
let blue = 0;

let coordenadasObj = [];

var treevis, info;

var treecostarica = {
  "id": "Costa Rica",
  "r": 0,
  "a": 0,
  "x": 0,
  "y": 0,
  "children": [
    {
      "id": "San Jose",
      "r": 0,
      "a": 0,
      "x": 0,
      "y": 0
    },
    {
      "id": "Cartago",
      "r": 0,
      "a": 0,
      "x": 0,
      "y": 0
    },
    {
      "id": "Limon",
      "r": 0,
      "a": 0,
      "x": 0,
      "y": 0
    },
    {
      "id": "Puntarenas",
      "r": 0,
      "a": 0,
      "x": 0,
      "y": 0,
    },
    {
      "id": "Guanacaste",
      "r": 0,
      "a": 0,
      "x": 0,
      "y": 0
    },
    {
      "id": "Alajuela",
      "r": 0,
      "a": 0,
      "x": 0,
      "y": 0
    },
    {
      "id": "Heredia",
      "r": 0,
      "a": 0,
      "x": 0,
      "y": 0
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

function casosPositivos() {
  var estadoActivosCheckBox = document.getElementById("checkboxActivos").checked;
  var estadoFallecidosCheckBox = document.getElementById("checkboxFallecidos").checked;
  // Si esta marcado el tipo de grafico treemap entonces desmarcar
  document.getElementById("checkboxActivos").checked = 0;
  document.getElementById("checkboxFallecidos").checked = 0;
  console.log(estadoActivosCheckBox);
}

function casosActivos() {
  var estadoPositivosCheckBox = document.getElementById("checkboxPositivos").checked;
  var estadoFallecidosCheckBox = document.getElementById("checkboxFallecidos").checked;
  // Si esta marcado el tipo de grafico treemap entonces desmarcar
  document.getElementById("checkboxPositivos").checked = 0;
  document.getElementById("checkboxFallecidos").checked = 0;
  console.log(estadoPositivosCheckBox);
}

function casosFallecidos() {
  var estadoActivosCheckBox = document.getElementById("checkboxActivos").checked;
  var estadoPositivosCheckBox = document.getElementById("checkboxPositivos").checked;
  // Si esta marcado el tipo de grafico treemap entonces desmarcar
  document.getElementById("checkboxActivos").checked = 0;
  document.getElementById("checkboxPositivos").checked = 0;
  console.log(estadoActivosCheckBox);
}
function setup() {

  var w = 1000;
  var h = 1000;

  _mouseAction = false;
  createCanvas(w, h);
  info = createDiv("");
  info.id("info");
  info.position(800, 250);

  info = createDiv("");
  info.id("cant");
  info.position(960, 250);

  background(255);
  treevis = createTreemap(
    treemapActivos, {
    children: "children",
    label: "name",
    value: "size"
  });

  treevis.setInset(3);
  treevis.onSelected(function (v, name, x, y, w, h, level, maxLevel, numChildren) {
    select("#info").html(name);
    select("#cant").html(v.size);
  });
}


function dibujarRadial(treecostarica) {
  //colorFondo = 255;

  red = 255;
  green = 255;
  blue = 255;

  firstWalk(arbolRadial, 0, 0, 2 * Math.PI, 150);
  secondWalk(arbolRadial, 500, 500);
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
function firstWalk(v, r, b, e, t) {
  var s;
  v.r = r;
  v.a = (b + e) / 2;

  s = (e - b) / v.leaves;

  var a = b;
    for (var hijos of v.children) {
      var u = hijos;

      if (u.leaves != 0) {
        firstWalk(u, r + t, a, a + s * u.leaves, t);
      }
      else{
        firstWalk(u, r + t, a, a + s, t);
      }
      a = a + s * u.leaves;
  }
}

function secondWalk(v, dx, dy) {
  v.x = v.r * cos(v.a) + dx;
  v.y = v.r * sin(v.a) + dy;

  for (var hijos of v.children) {
    var u = hijos;
    secondWalk(u, dx, dy);
  }
}

function drawLinks(node) {
  if (node.children != undefined) {
    //console.log(treecostarica);
    circle(node.x, node.y, 10);
    for (var hijos of node.children) {
      var child = hijos;
      line(node.x, node.y, child.x, child.y);

      if(1 <= child.acumulado && child.acumulado <= 20){
        fill(0, 255, 0);
      }

      if(20 < child.acumulado && child.acumulado <= 100){
        fill(250, 255, 0);
      }

      if(100 < child.acumulado){
        fill(255, 0, 0);
      }
      coordenadasObj.push({x: child.x, y: child.y, id: child.id, acumulado: child.acumulado});

      circle(child.x, child.y, 10);
      drawLinks(child);
    }
  }
}

function revisarCoordenadas(x, y){
  var coordX = Math.round(x);
  var coordY = Math.round(y);

  var dato = coordenadasObj.find(function (coordenadas) {
    return ((coordX-2 <= Math.round(coordenadas.x) && Math.round(coordenadas.x) <= coordX+2)  && 
    (coordY-2 <= Math.round(coordenadas.y) && Math.round(coordenadas.y) <= coordY+2));
  }
 );

  return dato;
}

function draw() {
  background(red, green, blue);

  if (checkboxRadial.checked) {
    dibujarRadial(treecostarica);
    
    //Revisar posicion del mouse y buscar dato en esas coordenadas
    var datosAMostrar = revisarCoordenadas(mouseX, mouseY);

    if (datosAMostrar && datosAMostrar.id){
      //Si encontro dato dibujar rectangulo y texto

      rect(50, 50, 70, 70);
      fill(0, 0, 0);
      text(datosAMostrar.id, 50, 50);
      text("Casos: " + datosAMostrar.acumulado, 50, 65);
    }
  }

  if (checkboxTreeMap.checked) {
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