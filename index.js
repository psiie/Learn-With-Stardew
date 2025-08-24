const { loadLanguageSets } = require('./lib/common');

/* ConcernedApe uses Magic-Strings to deliniate specific things in text, such as newline */
function cleanLine(textLine) {
  let cleanedLine = textLine;
  cleanedLine = cleanedLine.replace(/#\$e#/g, '\n'); // Merge subsequent interactions as one dialogue
  // cleanedLine = cleanedLine.replace(/\$b/g, '\n'); // break
  cleanedLine = cleanedLine.replace(/\$\w/g, ''); // break
  cleanedLine = cleanedLine.replace(/[#%*||^@]/g, ''); // aggressive lazy cleanup

  return cleanedLine;
}

function main() {
  const abigail = loadLanguageSets('Abigail');
  for (let key in abigail.en.content) {
    const cardFront = cleanLine(abigail.de.content[key]); // target language
    const cardBack = cleanLine(abigail.en.content[key]); // native loadLanguage

    // console.log('\n', key)
    console.log(
      `\n\nKey: ${key}\n`,
      cardFront,
      '\n',
      cardBack,
    )
  }
}

main();

// console.log(cleanLine("I can't trust a person who doesn't like animals...#$e#Oh, don't worry! I know you're an animal lover!$h"));