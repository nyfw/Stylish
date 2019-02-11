const _ = require('lodash');
const perfectionist = require('perfectionist');
const namer = require('color-namer');
const sass = require('node-sass');

let colorObj = {};
let scssResult = '';
let mainCharset = '';

const flattenCSS = css => {
  return css
    .replace(/^\s*\/\/.*/gm, '')
    .replace(/\/\*.*\*\//g, '')
    .replace(/(?:\r\n|\r|\n)/g, '');
};

const trimCSSHead = head => {
  const trimmedHead = head.trim();
  let result = trimmedHead;

  if (trimmedHead.substr(0, 6) !== '@media') {
    result = trimmedHead
      .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/g, '')
      .replace(/"/g, '\\"')
      .replace(/([^\s\(])(\.)([^\s])/g, '$1{&$2$3')
      .replace(/(\s*::\s*)(?=([^\(]*\([^\(\)]*\))*[^\)]*$)/g, '{&:')
      .replace(/([^&])\s*:\s*(?=([^\(]*\([^\(\)]*\))*[^\)]*$)/g, '$1{&:')
      .replace(/(\s*>\s*)/g, '{>')
      .replace(/(\s*\+\s*)/g, '{+')
      .replace(/\s(?=([^"]*"[^"]*")*[^"]*$)/g, '{')
      .replace(/(\s*{\s*)/g, '":{"');
  }

  return `"${result}"`;
};

const trimCSSBody = css => {
  const cssArr = css
    .replace(/(\s*;(?![a-zA-Z\d]+)\s*)(?=([^\(]*\([^\(\)]*\))*[^\)]*$)/g, '~')
    .split('~');
  let result = '';
  cssArr.forEach(style => {
    if (style.length > 1) {
      const styleColor = style.match(/[^0-9A-Za-z]+(#[0-9A-Fa-f]{3,6})/);
      let finalStyle = style;

      if (styleColor != null) {
        const color = styleColor[1];
        const colorName = namer(color).html[0].name + color.replace('#', '_');
        colorObj[`$${colorName}`] = `${color}`;
        finalStyle = style.replace(
          /([^0-9A-Za-z]+)(#[0-9A-Fa-f]{3,6})/,
          `$1$${colorName}`
        );
      }

      result += `"${finalStyle
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/(\s*;\s*)(?=([^\(]*\([^\(\)]*\))*[^\)]*$)/g, '","')
        .replace(/(\s*:\s*)/, '":"')
        .trim()}",`;
    }
  });

  return result.substr(0, result.length - 1);
};

const convertToArray = css => {
  let idx = 0;
  let result = '';
  const cssArray = [];

  for (let i = 0; i <= css.length; i += 1) {
    const char = css[i];
    result += char;
    if (char === '{') {
      idx += 1;
    } else if (char === '}') {
      idx -= 1;
      if (idx === 0) {
        cssArray.push(result);
        result = '';
      }
    }
  }

  return cssArray;
};

const cssConvertToObject = arr => {
  const result = {};

  arr.forEach(value => {
    const start = value.match(/(.*?){/)[1];
    const end = value.match(/{(.*)}/)[1];

    const trimmedStart = start.trim();
    let runningTrim;
    if (trimmedStart.substr(0, 1) === '@') {
      runningTrim = [trimmedStart];
    } else {
      runningTrim = trimmedStart.split(',');
    }

    runningTrim.forEach(ele => {
      if (start.length > 0) {
        let trimmedHead = trimCSSHead(ele);
        let trimmedBody = '';

        if (trimmedHead.substr(0, 2) === '"@') {
          trimmedHead = `"${ele}"`;
          trimmedBody = JSON.stringify(cssConvertToObject(convertToArray(end)));
          trimmedBody = trimmedBody.substr(1, trimmedBody.length - 2);
        } else {
          trimmedBody = trimCSSBody(end);
        }

        const startBracket = (trimmedHead.match(/{/g) || []).length;

        const combined = `${trimmedHead}:{${trimmedBody}${'}'.repeat(
          startBracket + 1
        )}`;

        const combinedParsed = JSON.parse(`{${combined}}`);
        merge(result, combinedParsed);
      }
    });
  });

  return result;
};

const contains = obj => {
  let containsObj = false;
  const keys = Object.keys(obj);

  keys.forEach(key => {
    if (typeof obj[key] === 'object') containsObj = true;
  });

  return containsObj;
};

const objToCSS = obj => {
  const keys = Object.keys(obj);

  if (!contains(obj)) {
    keys.sort();
  }

  keys.forEach(key => {
    if (typeof obj[key] === 'object') {
      scssResult += `${key}{`;
      objToCSS(obj[key]);
      scssResult += '}';
    } else {
      scssResult += `${key}:${obj[key]};`;
    }
  });
};

const objToKeyValueCss = obj => {
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);

    if (keys.length > 0) {
      keys.sort();

      let stringOutput = '';

      keys.forEach(key => {
        stringOutput += `${key}:${obj[key]};`;
      });

      return stringOutput;
    }
  }
  return '';
};

const convertCssToObject = css => {
  let result;
  try {
    result = sass
      .renderSync({
        data: css
      })
      .css.toString();
  } catch (error) {
    console.log('invalid CSS');
  }

  let flatCSS = flattenCSS(result);
  const regEx = /^@charset\s\"([^\"]+)\";/;
  const matches = regEx.exec(flatCSS);
  if (Array.isArray(matches) && matches[1]) {
    mainCharset = matches[1];
    flatCSS = flatCSS.replace(regEx, '');
  }

  const cssArray = convertToArray(flatCSS);

  try {
    return cssConvertToObject(cssArray);
  } catch (error) {
    console.log('Error converting');
  }

  return true;
};

const convertCssToScss = css => {
  const cssObject = convertCssToObject(css);
  objToCSS(cssObject);
  const charset = mainCharset ? `@charset "${mainCharset}";\n` : '';

  const colorVars = objToKeyValueCss(colorObj);
  const result = charset + colorVars + scssResult;
  const final = perfectionist.process(result, {
    indentSize: 2,
    colorShorthand: false
  });

  return final.css;
};

module.exports = {
  convertCssToScss
};
