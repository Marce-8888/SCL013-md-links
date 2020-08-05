//const path = require ('path');//Contiene métodos para trabajar con rutas
const fs = require ('fs');//Nos permite acceder al sistema de archivos, viene incorporado en node
let file = process.argv[2];//Toma lo que se le da desde consola
//const axios = require ('axios');//librería para hacer solicitudes HTTP
const fetch1 = require ('node-fetch');//librería para hacer solicitudes HTTP
const fetch = require("fetch");
const fetchUrl = fetch.fetchUrl;
//const jsdom = require('jsdom');//Transforma el DOM en html
//const { JSDOM } = jsdom;
//const showdown = require('showdown');//Transforma el MD en html
const colors = require('colors');//Librería para poner colores a la respuestas en consola

//let index = process.argv;

/*const index = (fileIndex) => {
  console.log("veamos", fileIndex)
  let validate = false;
  let stats = false;
    validate = fileIndex.includes("--validate");
    stats = fileIndex.includes("--stats");*/


//Función que lee el archivo
const getMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, file) => {
      if (err) {
        return reject(err)
      } else {
        resolve(file)
      }
    })
  })
}

/*if (path.extname(file) === '.md') {
   getMd(file)

    .then((fileData) => {
      console.log(fileData);
    })
    .catch((error) => {
      console.error(error)
    })
} else {
    console.log('Introduce una ruta que contenga un archivo con extención .md')
}*/

//Función para hacer la estadistica
const urlStats = (links) => {
  let ok = 0;
  let broken = 0;
  for (let i = 0; i < links.length; i++) {
    fetch1(links[i])
      .then((response) => {
        if (response.status === 200) ok++;
        return response;
      })
      .then((response) => {
        if (response.status !== 200) broken++;
        return response;
      })
      .then(() => {
        if (ok + broken === links.length)
          console.log(
            ` ✔ Total : ${links.length}\n ✔ Unique : ${ok}\n ✖ Broken : ${broken}`
          );
      });
  }
};

//Función que lee los links de la ruta espeficificada
//const expReg = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g;
const expReg = /https?:\/\/(?!.*:\/\/)\S+(?=\))/g;

fs.readFile(file, 'utf-8', (err,file) => {
  if (err){
    console.log(err);
  }else{
     let links = file.match(expReg);
      console.log(file.match(expReg));
        links.forEach(element => {
          getStatus(element)
           .then (res =>{
             console.log('El link', element, 'es', res);
            })
           .catch (err => {
             console.log(err);
           })
        })
   urlStats(links);//que nos retorne la estadistica
  }
});

//Función que obtiene la URL validandola en 200 y 404
const getStatus = (url) => {
  return new Promise ((resolve, reject) => {
    fetchUrl(url, (error, meta) => {
      if (error) {
        reject (error)
      } else {
        resolve (meta.status);
      }
    })
  });
};

/* // Convertir Markdown a HTML;s
 const text = file.toString();
 const converter = new showdown.Converter();
 const html = converter.makeHtml(text);

 // Pasa el ReadMe a HTML;
 const myHtml = html;
//console.log(myHtml);
 const getStatus = (url) => {
   return new Promise((resolve, reject) => {
     fetchUrl(url, (error, meta) => {
       if (error) {
         reject(error);
       } else {
         resolve(meta.status);
         // console.log(meta)
       }
     });
   });
 };

 // Truncar texto
 const truncateText = (text) => {
   if (text.length > 50) {
     const textFifty = text.slice(0, 50);
     return textFifty;
   } else {
     return text;
   }
 };

 // Leer el file HTML y sacar text, link y file;
 const pathTwo = `${file}${path.sep}${file}`;
 const dom = new JSDOM(myHtml);
 const test = dom.window.document.querySelectorAll('a');
 let addTotal = 0;
 test.forEach((element) => {
   if (element.href.includes('http')) {
     addTotal = 1 + addTotal;
     const link = element.href;
     const textContent = element.textContent;
     const caracter50 = truncateText(textContent);

     if(condition === "--validate"){
     getStatus(link)
       .then((res) => {
         console.log('----------'.blue);
         console.log('text:'.blue, caracter50);
         console.log('href:'.blue, link);
         console.log('file:'.blue, pathTwo);
         console.log('OK ✔'.green, res);
       })
       .catch(() => {
         console.log("este es mi", addBroken)
         console.log('----------'.red);
         console.log('text:'.red, caracter50);
         console.log('href:'.red, link);
         console.log('file:'.red, pathTwo);
         console.log('error X'.red, err.code, 'error');
       });
     };
   }
 });

 if(condition === "--stats"){
   console.log('suma total', addTotal);
 } else (condition === "--validate --stats")
 console.log('Cantidad Link', addTotal);

//console.log('esta es la ruta del archivo', file),

if (validate === true  && stats === false) {
console.log('esta validando');
const valor = "--validate"
getMd(valor);
} else if (stats === true && validate === false) {
console.log('estadistica');
const estadistica = "--stats"
getMd(estadistica);
}else if(validate === true && stats === true){
console.log("funciona??")
const ambos = "--validate --stats"
getMd(ambos)
}else {
console.log('Para ver validación incorpore --validate');
console.log('Para ver estadistica incorpore --stats');
}
}
;

module.exports = {
  index,
};
*/
