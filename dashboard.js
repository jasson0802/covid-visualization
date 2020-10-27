let arbolActivos = {};
let treemapActivos = {};
let arbolRadial = {};

const insertarArbol = (objeto, arbol) => {
  if (arbol[objeto.provincia]) {
    if (arbol[objeto.provincia][objeto.canton]) {
      if (arbol[objeto.provincia][objeto.canton][objeto.distrito]) {
        arbol[objeto.provincia][objeto.canton][objeto.distrito] = parseInt(objeto["20/10/2020"]);
      }
      else {
        arbol[objeto.provincia][objeto.canton][objeto.distrito] = {
        };
        arbol[objeto.provincia][objeto.canton][objeto.distrito]["valor"] = parseInt(objeto["20/10/2020"]);
      }
    }
    else {
      arbol[objeto.provincia][objeto.canton] = {
      }
      arbol[objeto.provincia][objeto.canton][objeto.distrito] = {
      };
      arbol[objeto.provincia][objeto.canton][objeto.distrito]["valor"] = parseInt(objeto["20/10/2020"]);
    }
  }
  else {
    arbol[objeto.provincia] = {
    };
    arbol[objeto.provincia][objeto.canton] = {
    }
    arbol[objeto.provincia][objeto.canton][objeto.distrito] = {
    };
    arbol[objeto.provincia][objeto.canton][objeto.distrito]["valor"] = parseInt(objeto["20/10/2020"]);
  };

  return arbol;
}

const actualizarPesos = (arbol) => {
  var total = 0;
  for (var provincia of Object.keys(arbol)) {
    var pesoProvincia = 0;
    for (var canton of Object.keys(arbol[provincia])) {
      var pesoCanton = 0;
      for (var distrito of Object.keys(arbol[provincia][canton])) {
        if (arbol[provincia][canton][distrito].valor) {
          pesoCanton = pesoCanton + arbol[provincia][canton][distrito].valor;
        }
      }
      arbol[provincia][canton]["valor"] = pesoCanton;
      pesoProvincia = pesoProvincia + pesoCanton;

    }
    arbol[provincia]["valor"] = pesoProvincia;
    total = total + pesoProvincia;

  }
  arbol["valor"] = total;

}

const crearTreeVis = (arbol) => {
  var tree = { "children": [] };
  for (var provincia of Object.keys(arbol)) {
    var provinciaActual = { "name": provincia, "size": arbol[provincia].valor, "children": [] };
    for (var canton of Object.keys(arbol[provincia])) {
      var cantonActual = { "name": canton, "size": arbol[provincia][canton].valor, "children": [] };
      for (var distrito of Object.keys(arbol[provincia][canton])) {
        if (distrito != "valor") {
          var distritoActual = { "name": distrito, "size": arbol[provincia][canton][distrito].valor, "children": [] };
          cantonActual.children.push(distritoActual);
        }
      }
      if (canton != "valor") {
        provinciaActual.children.push(cantonActual)
      }
    }
    if (provincia != "valor") {
      tree.children.push(provinciaActual);
    }
  }

  return tree;
}

const crearArbolRadial = (arbol) => {
  var tree = { 
    id: "Costa Rica",
    acumulado: 0,
    r: 0,
    a: 0,
    x: 0,
    y: 0,
    children: []
  };

  for (var provincia of Object.keys(arbol)) {
    var provinciaActual = {
      id: provincia,
      acumulado: arbol[provincia].valor,
      r: 0,
      a: 0,
      x: 0,
      y: 0,
      children: []
    };

    for (var canton of Object.keys(arbol[provincia])) {
      var cantonActual = {
        id: canton,
        acumulado: arbol[provincia][canton].valor,
        r: 0,
        a: 0,
        x: 0,
        y: 0,
        children: []
      };
      for (var distrito of Object.keys(arbol[provincia][canton])) {
        if (distrito != "valor") {
          var distritoActual = {
            id: distrito,
            acumulado: arbol[provincia][canton][distrito].valor,
            r: 0,
            a: 0,
            x: 0,
            y: 0,
            children: []
          };
          cantonActual.children.push(distritoActual);
        }
      }
      if (canton != "valor") {
        provinciaActual.children.push(cantonActual)
      }
    }
    if (provincia != "valor") {
      tree.children.push(provinciaActual);
    }
  }

  return tree;
}

const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;

  var fileInput = fileList[0];

  Papa.parse(fileInput, {
    complete: function (results) {
      let datosCsv = results.data;
      let headers = datosCsv[0];
      let objetosJson = [];
      let arbol = {};

      for (var registro of datosCsv.slice(1)) {
        var objeto = {};

        for (var propiedad of headers) {
          objeto[propiedad] = registro[headers.indexOf(propiedad)];
        }

        insertarArbol(objeto, arbol);
        actualizarPesos(arbol);
        //objetosJson.push(objeto);
      }
      //console.log("ESTOS SON LOS OBJETOS EN JSON ", objetosJson);
      arbolActivos = arbol;
      treemapActivos = crearTreeVis(arbol);
      arbolRadial = crearArbolRadial(arbol);
      console.log("ESTE ES EL ARBOL ", arbolRadial);
    }
  });
});
