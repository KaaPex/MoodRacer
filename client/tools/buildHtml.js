/**
 * Created on 10.10.16.
 * buildHtml.js of client project
 */
import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('src/index.html', 'UTF-8', (err, markup) => {
  if (err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'UTF-8', (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });

});
