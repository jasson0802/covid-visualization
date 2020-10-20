const fileSelector = document.getElementById('file-selector');
fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;

  var fileInput = fileList[0];

  Papa.parse(fileInput, {
    complete: function(results) {
      let datosCsv = results.data;
      let headers = datosCsv[0];
      let objetosJson = [];

      for(var registro of datosCsv.slice(1)){
        var objeto = {};
        
        for(var propiedad of headers){
          objeto[propiedad] = registro[headers.indexOf(propiedad)]; 
        }
        objetosJson.push(objeto);
      }

      console.log("ESTOS SON LOS OBJETOS EN JSON ", objetosJson);
    }
  });
});
