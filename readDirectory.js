/*const fs = require ('fs');//nos poermite acceder al sistema de archivos, viene incorporado en node
const path = require ('path');//contiene métodos para trabajar con rutas
const axios = require ('axios');//librería para hacer solicitudes HTTP
const { isAbsolute } = require('path');
const marked = require ('marked');//analiza el MD sin almacenar en caché, bloqueos largos,
//const route = __dirname;// variable global que hace referencia en donde estamos, tambien podemos reemplazar por process.argv[2]

/*fs.readdir(route, (err, files) => {//llamo al file sistem, lee el directorio que señala la ruta captura todos los archivos e itera uno por uno y escribe el nombre
  files.forEach(file => {
    console.log('files', file);
  });
});*/

/*fs.readFile('hola.md', 'utf-8', (err,data) => {
  if (err) {
    console.log(err)
  } else {
    const lines = data.split(/\r?\n/);
    lines.forEach(line => {
      console.log('texto', line)
    })
  }
  })
  console.log('probanding');*/

//Validar Ruta método 1
//const valid = (route) => fs.existsSync(route);
/*// Validar Ruta método 2
  fs.readFile(filename, 'utf8', (err,data) => {
    //err sustituye a la variable de función de devolución de llamada fs.exists
    if (!err){
        console.log(data)
    }else{
        //maneja la inexistencia del archivo
        console.log('Archivo no existe!');
    }
});
*/
/*//Validar Ruta método 3
const valid = (route) => fs.statSync(route);
/*Validar Ruta método 4
//fs.readFile(filename, 'utf8', (err,data) => {
fs.readFile() => {
  if(fs.existsSync("./archivo")){
    console.log("El archivo EXISTE!");
  }else{
     console.log("El archivo NO EXISTE!");
  }
};
*/
//Verificar si la ruta es absoluta
/*const absolute = (route) => path.isAbsolute(route);

//Convertir la ruta a absoluta
const getAbsolute = (route) => (isAbsolutePath(route) ? route : path.resolve(route));

//Verifica si es un archivo
const isFile = (route) => fs.statSync(route).isFile();

//Leer el archivo
const readFiles = (file) => {
fs.readFile(file, 'utf-8', (err,file) => {
  if (err) {
    console.log(err)
  } else {
    const lines = file.split(/\r?\n/);
    lines.forEach(line => {
      console.log('texto', line)
    })
  }
  })
};

//Extraer Links
//función que extrae los links
const getMd = (route) => {
  let arrFiles = [];
  const newRoute = getAbsolute(route);
  // caso base
  if (isFile(newRoute) === true) {
   // if (fileExt(route) === '.md') {
      arrFiles.push(newRoute);
   // }
  } else {
    readFiles(route).forEach((file) => {
      const completeRoute = path.join(route, file);
      const allFiles = getMd(completeRoute);
      arrFiles = arrFiles.concat(allFiles);
    });
  }
  return arrFiles;
};


const extractLinks = (route) => {
  const arrLinks = [];
  getMd(route).forEach((file) => {
    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {
      const newObj = {
        href,
        text,
        file,
      };
      arrLinks.push(newObj);
    };
    marked(readFiles(file), { renderer });
  });
  return arrLinks;
};
 //función que entra al archivo
const folder = (route) => {
  return new Promise((resolve, reject) => {
    fs.readdir(route, (err, files) => {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  });
}


/* Funcion que busca el .md
const getMd = () => {
  folder(path.resolve()).then(archivos => {
    console.log(archivos);
    archivos.forEach((file) => {
      if (path.extname(file) === '.md') {
        readSaveLinks(file)
      }
    })
  })
}
getMd();
*/


//Validar Links
/*const validate = (route) => {
  const arrValidate = [];
  //const arrLinks = funcion que extrae links(route);
    arrLinks.forEach((element) => {
      arrValidate.push(axios.get(element.href)
      .then((res) => {
        const newObj = {
          ...element,
          status: res.status,
          statusText: res.statusText,
        };
        return newObj;
      })
      .catch(() => ({
        ...element,
        status: 400,
        statusText: 'FAIL',
      }))
      );
    });
    return Promise.all(arrValidate);
};

  module.exports = {
    valid,
    absolute,
    getAbsolute,
    isAbsolute,
    isFile,
    folder,
    readFiles,
    getMd,
    extractLinks,
    validate,
  };
*/
