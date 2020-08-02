/*module.exports = () => {
  // ...
};
console.log('Hola')


const {
  valid,
  extractLinks,//necesito una función que extraiga los links,
  validate,
} = require ('./readDirectory.js');

const mdLinks = (route, options) => {
  const newPromise = new Promise ((resolve, reject) =>{
    let extLinks = [];
    if (valid(route) === false) {
      reject(new Error('Invalid path'));
    } else {
      if (options.validate === true) {
        extLinks = validate(route);
        resolve(extLinks);
      }
        extLinks = extractLinks(route);
     resolve(extLinks);
    }
  });
  return newPromise;
};

module.exports = mdLinks;
*/
