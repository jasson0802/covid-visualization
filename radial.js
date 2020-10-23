
const checkboxRadial = document.getElementById('checkboxRadial');
const checkboxTreeMap = document.getElementById('checkboxTreeMap');

let colorFondo = 155;
var treevis, info;

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

function dibujarRadial(){
    colorFondo = 255;

    let posX = 100;

    for(var provincia of  Object.keys(arbolActivos)){
        if(arbolActivos[provincia].valor){
            let colorFondo = arbolActivos[provincia].valor/100;
            circle(posX, 100, 100);
            text(provincia, posX-15, 100);
            posX = posX + 100;
        }
    }
}

function setup() {
    var w = 800;
    var h = 600;
     _mouseAction = false;
    createCanvas(w, h);
    info = createDiv("");
    info.id("info");
    info.position(10, h + 10);

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
    });
}
  
function draw() {
    background(colorFondo, 204, 0);

    if(checkboxRadial.checked){
        dibujarRadial();
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