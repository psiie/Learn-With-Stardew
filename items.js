const { loadLanguageSets, fileExists } = require('./lib/common');

function pascalToTitleCase(str) {
  return str
    .replace(/_/g, ' ').trim() // clean up underscores
    .replace(/([A-Z])/g, ' $1').trim() // pascal to title
    .replace(/\s{2,}/g, ' ').trim() // reduce multiple spaces to one
}

function generateCollection() {
  const objects = loadLanguageSets('Objects');
  const collection = {};

  for (let key in objects.en.content) {
    // console.log(key)

    // If entry follows the pattern of a Name/Description pair, then process it as such
    if (/_Name$/.test(key)) {
      /* We dont know what the image name is thats on disk, so we calculate potential
      names. Such as dev name, human name. Hopefully one exact-matches. */
      const baseKey = key.replace(/_Name$/, '');
      const descriptionKey = baseKey + '_Description';
      const devName = pascalToTitleCase(key.replace(/_Name$/, ''));

      const nameEN = objects.en.content[key];
      const nameDE = objects.de.content[key]

      if (nameEN?.toLowerCase() === nameDE?.toLowerCase()) continue;

      collection[baseKey] = {
        name: {
          dev: devName,
          en: nameEN,
          de: nameDE,
        },
        description: {
          en: objects.en.content[descriptionKey]?.trim(),
          de: objects.de.content[descriptionKey]?.trim(),
        }
      }
    }
  }


  return collection;
}

function findFile(namesArr) {
  for (let name of namesArr) {
    const filename = `${name}.png`;
    const exists = fileExists(filename);
    if (exists) return filename;
  }

  return null;
}

function main() {
  const collection = generateCollection();

  for (let key in collection) {
    const item = collection[key];

    const imgFilePath = findFile([
      item.name.dev,
      item.name.dev.replace(/\s/g, '_'),
      item.name.en,
      item.name.en.replace(/\s/g, '_'),
    ]);

    item.img = imgFilePath;

    if (imgFilePath) {
      console.log('------------', item);
    }
  }
    
  
}

main();
