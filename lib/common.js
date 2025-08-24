const fs = require('fs');
const path = require('path');


function loadLanguageSets(filenameBase) {
  const en = fs.readFileSync(path.resolve(__dirname, '../unpacked/', `${filenameBase}.json`), 'utf-8')
  const de = fs.readFileSync(path.resolve(__dirname, '../unpacked/', `${filenameBase}.de-DE.json`), 'utf-8')

  return {
    en: JSON.parse(en),
    de: JSON.parse(de),
  };
}

module.exports = {
    loadLanguageSets,
}