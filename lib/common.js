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

function fileExists(filename) {
  try {
    return fs.existsSync(path.resolve(__dirname, '../img/', filename));
  } catch {
    return false;
  }
}

function copyFileIfNotExists(sourcePath, destDir) {
  try {
    const fileName = path.basename(sourcePath);
    const destPath = path.join(destDir, fileName);
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(sourcePath, destPath);
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

module.exports = {
    loadLanguageSets,
    fileExists,
    copyFileIfNotExists,
}