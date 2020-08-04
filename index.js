const path = require ('path');//Contiene métodos para trabajar con rutas
const fs = require ('fs');//Nos permite acceder al sistema de archivos, viene incorporado en node
let file = process.argv[2];//Toma lo que se le da desde consola
//const axios = require ('axios');//librería para hacer solicitudes HTTP
const fetch = require ('fetch');//librería para hacer solicitudes HTTP
const fetchUrl = fetch.fetchUrl;
const jsdom = require('jsdom');//Transforma el DOM en html
const { JSDOM } = jsdom;
const showdown = require('showdown');//Transforma el MD en html
const colors = require('colors');//Librería para poner colores a la respuestas en consola

/* const options = (file) => {
  console.log("veamos", file)
  let validate = false;
  let stats = false;
validate = file.includes("--validate");
stats = file.includes("--stats");
console.log('probando', validate)
} */

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

if (path.extname(file) === '.md') {
   getMd(file)

    .then((fileData) => {
      console.log(fileData);
    })
    .catch((error) => {
      console.error(error)
    })
} else {
    console.log('Introduce una ruta que contenga un archivo con extención .md')
}

//Función que lee los links de la ruta espeficificada
const expReg = /(((https?:\/\/)|(http?:\/\/)|(www\.))[^\s\n]+)(?=\))/g;

let arrLinks = [];//hice una variable para poder retornarla

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
   }
   return arrLinks;//que nos retorne la variable para poder llamarla en la siguiente función
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

