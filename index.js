const path = require ("path");//Contiene métodos para trabajar con rutas
const fs = require ("fs");//Nos permite acceder al sistema de archivos, viene incorporado en node
let file = process.argv[2];//Toma lo que se le da desde consola
const axios = require ('axios');//librería para hacer solicitudes HTTP

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

fs.readFile(file, "utf-8", (err,file) => {
  if (err){
    console.log(err);
  }else{
    console.log(file.match(expReg));
  }
});


/*const validateHref = (links) => {
  return new Promise((resolve, reject) => {
    let validated = [];
    links.forEach(link => {
      validated.push(
        fetch(link.href)
        .then(response => {
          return {
            ...link,
            status: response.status
          }
        })
        .catch((error) => {
            return {
              ...link,
              status: `Fail 404, ${error.message}`
            }
        })
      )
    })
    resolve(Promise.all(validated)); //equivale a los resultados de todas las promesas
  })
}*/

//Validar Links
/*const validate = (links) => {
  const arrValidate = [];
  const arrLinks = expReg(links);
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
*/
