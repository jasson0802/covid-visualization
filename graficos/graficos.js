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
